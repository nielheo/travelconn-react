import * as React from 'react';
import * as moment from 'moment';
import * as queryString from 'query-string';
import * as Scroll from 'react-scroll';

import { MouseEvent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Theme } from 'material-ui/styles/createMuiTheme';
import { withStyles, WithStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Table, { TableRow, TableFooter, TablePagination } from 'material-ui/Table';

import { room, hotelResult, hotel, languages, language } from '../types';

import HotelCard from './HotelCard';
import EmptyHotelCard from './EmptyHotelCard';
import LanguageMenu from './LanguageMenu';
import CurrencyMenu from './CurrencyMenu';

interface Props {
}

type PropsWithStyles = Props & RouteComponentProps<{
  country: string
  city: string
  locale: string
  curr: string
}> & WithStyles<'root' | 'gridRoot' | 'pagingBottom'>;

const styles = (theme: Theme) => ({
  root: {
    width: '100%',
    padding: 0,
    margin: 0,
  },
  gridRoot: {
    padding: 0,
    margin: 0,
    width: '100%',
  },
  pagingBottom: {
    marginTop: 16,
  },
});

class HotelsAvail extends React.Component<PropsWithStyles, {
  country: string,
  city: string,
  locale: string,
  curr: string,
  checkIn: Date,
  checkOut: Date,
  rooms: room[],
  result?: hotelResult,
  page: number,
  itemPerPage: number,
}> {
  constructor(props: PropsWithStyles) {
    super(props);
    let query = queryString.parse(props.location.search);
    this.state = {
      country: this.props.match.params.country,
      city: this.props.match.params.city,
      checkIn: moment(query.cin, 'YYYYMMDD').toDate(),
      checkOut: moment(query.cout, 'YYYYMMDD').toDate(),
      rooms: this._text2Rooms(query.rooms),
      locale: this.props.match.params.locale || 'en-us',
      curr: query.curr || 'usd',
      result: undefined,
      page: 0,
      itemPerPage: 24,
    };
  }
  
  _text2Rooms = (value: string) => {
    let rooms: room[] = value.split('|').map((rm: string) => {
                let occ = rm.split(',');
                let ages = [];
                for (let i = 1; i < occ.length; i++) {
                  ages.push(parseInt(occ[i], 10));
                }

                let item: room = { adult: parseInt(occ[0], 10), childAges: ages };
                
                return item;
              });

    return rooms;
  }

  _loadHotel = () => {
    let query = queryString.parse(this.props.location.search);
    let url = `https://travelconnapi.azurewebsites.net/api/hotels/` 
      + `${this.state.country}/${this.state.city}`
      + `?checkin=${moment(this.state.checkIn).format('DD-MMM-YYYY')}`
      + `&checkout=${moment(this.state.checkOut).format('DD-MMM-YYYY')}`
      + `&rooms=${query.rooms}&locale=${this.state.locale}&currency=${this.state.curr}`
      + `&numberofresult=200`;

    this._sendRequest(url).then(r => {
      if (r) {
        this.setState({ result: r }, () => {if (r.cacheKey) {
          this._getMore();
        }});
      }
    });
  }

  _constructMoreRequest = () => {
    let req = 'https://travelconnapi.azurewebsites.net/api/hotels/more'
        + '?locale=' + this.state.locale
        + '&currency=' + this.state.curr
        + '&cacheKey=' + this.state.result!.cacheKey
        + '&cacheLocation=' + this.state.result!.cacheLocation
        + '&requestKey=' + this.state.result!.requestKey;
    return req;
  }

  _getMore = () => {
      this._sendRequest(this._constructMoreRequest()).then(rs => {
          var result = this.state.result!;

          if (rs.hotels && result) {
            rs.hotels.map((htl: hotel) => {
                result.hotels.push(htl);
            });

            result.cacheKey = rs.cacheKey;
            result.cacheLocation = rs.cacheLocation;
            result.requestKey = rs.requestKey;

            this.setState({ result: result });

            if (this.state.result!.cacheKey) { this._getMore(); }
          }
      });
  }

  _sendRequest = (url: string) => {
    return fetch(url, {
        method: 'get',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip',
            'Access-Control-Allow-Origin': '*',
        }
    }).then(res => {
        if (res) {
            return res.json();
        } else {
          return '';
        }
        }).catch(err => {
            console.log(err);
        });
  }

  _scrollTop = () => {
    let scroll = Scroll.animateScroll;
    scroll.scrollToTop({
      duration: 1200,
      delay: 300,
      smooth: true
    });
  }

  _onCurrChange = (curr: string) => {
    if (curr !== this.state.curr) {
      let query = queryString.parse(this.props.location.search);
      let url = `/${this.state.locale}/hotels/${this.state.country}/${this.state.city}/avail`
        + `?cin=${moment(this.state.checkIn).format('YYYYMMDD')}`
        + `&cout=${moment(this.state.checkOut).format('YYYYMMDD')}`
        + `&rooms=${query.rooms}&curr=${curr}`;
      this.props.history.push(url);
    }
  }

  _onLanguageChange = (countryCode: string) => {
    let lang = 
      languages.find((lan: language) => lan.code === countryCode.toUpperCase());
    
    let nextLocale: string = lang && lang.locale || 'en-US';
    
    if (nextLocale.toLowerCase() !== this.state.locale.toLowerCase()) {
      let query = queryString.parse(this.props.location.search);
      let url = `/${nextLocale}/hotels/${this.state.country}/${this.state.city}/avail`
        + `?cin=${moment(this.state.checkIn).format('YYYYMMDD')}`
        + `&cout=${moment(this.state.checkOut).format('YYYYMMDD')}`
        + `&rooms=${query.rooms}&curr=${this.state.curr}`;

      this.props.history.push(url);
    }
  }

  handleChangePage = (e: MouseEvent<HTMLButtonElement>, newPage: number) => { 
    if (this.state.page !== newPage) {
      this.setState({page: newPage}, () => this._scrollTop());
    }
  }
  handleChangeRowsPerPage = () => { };

  componentDidMount() {
    this._loadHotel();
  }

  componentWillReceiveProps() {
    this.setState({result: undefined}, () => {
      let query = queryString.parse(this.props.location.search);
      this.setState({ curr: query.curr || 'usd',
                      locale: this.props.match.params.locale || 'en-us'
                    }, 
                    () => this._loadHotel());
    });
  }

  public render() {
    let {result} = this.state;
    let {classes} = this.props;
    let query = queryString.parse(this.props.location.search);
    let emptyList: string[] = [];
    for (let i = 0; i < 12; i++) {
      emptyList.push(i.toString());
    }
    return (
    <div className={classes.root}>
      <div>
        <Grid container spacing={0} style={{width: '100%'}}>
          <Grid item style={{flex: 1}}>
            <Typography type="display1" gutterBottom>
              {result && result.hotels && 
                result.hotels.length.toLocaleString('en-us') || 0} hotels in {this.props.match.params.city}
              , {this.props.match.params.country}
            </Typography>
          </Grid>
          <Grid item>
            <LanguageMenu countryCode={this.state.locale.split('-')[1]} onChange={this._onLanguageChange} />
          </Grid>
          <Grid item style={{marginRight: 10, marginTop: 4}}>
            <CurrencyMenu curr={this.state.curr} onChange={this._onCurrChange} />
          </Grid>
        </Grid>
      </div>
      { this.state.result 
        ? (this.state.result.hotels ? <div>
          <Grid container className={classes.gridRoot} spacing={16}  >
            { result!.hotels.slice( this.state.page * this.state.itemPerPage, 
                                    ((this.state.page + 1) * this.state.itemPerPage))
                  .map((htl: hotel) => {
                    let link = `/${this.state.locale}/hotels/${this.state.country}/${this.state.city}/${htl.id}/rooms`
                        + `?cin=${query.cin}&cout=${query.cout}&rooms=${query.rooms}&curr=${this.state.curr}`;
                    return <HotelCard link={link} hotelDetail={htl} locale={this.state.locale} key={htl.id} />;
                  })
            }
          </Grid>
        <Table>
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={1}
                count={result!.hotels.length}
                rowsPerPage={this.state.itemPerPage}
                page={this.state.page}
                backIconButtonProps={{
                  'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                  'aria-label': 'Next Page',
                }}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                className={classes.pagingBottom}
                labelRowsPerPage={''}
                rowsPerPageOptions={[]}
              />
            </TableRow>
          </TableFooter>
        </Table>
        </div> : <label>no available hotel found</label>)
        : <div>
            <label>Search your hotels</label>
            {<Grid container className={classes.gridRoot} spacing={16}  >
              {emptyList.map((i: string) => <EmptyHotelCard key={i} />)}
            </Grid>}
          </div>
      }
    </div>);
  }
}

export default withRouter(withStyles(styles)(HotelsAvail));
