import * as React from 'react';
import * as moment from 'moment';
import * as queryString from 'query-string';

import { MouseEvent } from 'react';

import { RouteComponentProps } from 'react-router';
import { Theme } from 'material-ui/styles/createMuiTheme';
import { withStyles, WithStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import  { TablePagination } from 'material-ui/Table';

import { room, hotelResult, hotel } from '../types';

interface Props {
}

type PropsWithStyles = Props & RouteComponentProps<{
  country: string
  city: string
}> & WithStyles<'root' | 'paper' | 'control' | 'card' | 'media' | 'cardAction'>;

const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    width: '100%',
    marginTop: 16,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  media: {
    height: 160,
  },
  cardAction: {
    right: 0,
    width: '100%',
  }
});

class HotelsAvail extends React.Component<PropsWithStyles, {
  country: string,
  city: string,
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

  _rawMarkup = (content: string) => {
    return { __html: content };
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

  handleChangePage = (e: MouseEvent<HTMLButtonElement>, newPage: number) => { 
    if (this.state.page !== newPage) {
      this.setState({page: newPage});
    }
  }
  handleChangeRowsPerPage = () => { };

  componentDidMount() {
    let query = queryString.parse(this.props.location.search);
    let url = `https://travelconnapi.azurewebsites.net/api/hotels/` 
      + `${this.state.country}/${this.state.city}`
      + `?checkin=${moment(this.state.checkIn).format('DD-MMM-YYYY')}`
      + `&checkout=${moment(this.state.checkOut).format('DD-MMM-YYYY')}`
      + `&rooms=${query.rooms}`;

    this._sendRequest(url).then(r => {
      if (r) {
          this.setState({ result: r });
          // if (r.cacheKey) {
          //     this._getMore()
          //  }
      }
    });
  }

  public render() {
    let {result} = this.state;
    let {classes} = this.props;
    return (
    <div>
      <Typography type="display1" gutterBottom>
        Hotel Result {this.props.match.params.city}, {this.props.match.params.country}
      </Typography>
      { this.state.result 
        ? <section><Grid container className={classes.root} spacing={16}>
          {result!.hotels.slice(this.state.page * this.state.itemPerPage, 
                                ((this.state.page + 1) * this.state.itemPerPage))
          .map((htl: hotel) => 
          <Grid item md={3} sm={6} xs={12} key={htl.id}>
            <Card className={classes.card} >
              <CardMedia
                className={classes.media}
                image={htl.thumbnail}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography type="headline" component="h2" color="primary">
                  {htl.name}
                </Typography>
                <Typography component="p">
                  <span dangerouslySetInnerHTML={this._rawMarkup(htl.shortDesc)} />
                </Typography>
              </CardContent>
              <CardActions className={classes.cardAction}>
                <Button size="small" color="secondary">
                  Book
                </Button>
              </CardActions>
            </Card>
          </Grid>
        )}
        </Grid>
        <TablePagination
          colSpan={12}
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
        />
        </section>
        : <label>Search your hotels</label>

      }
    </div>);
  }
}

export default withStyles(styles)(HotelsAvail);
