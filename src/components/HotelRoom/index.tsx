import * as React from 'react';
import * as moment from 'moment';
import * as queryString from 'query-string';

import { RouteComponentProps } from 'react-router';
import { Theme } from 'material-ui/styles/createMuiTheme';
import { withStyles, WithStyles, StyleRulesCallback } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';

import withWidth, { WithWidthProps } from 'material-ui/utils/withWidth';
import { compose } from 'recompose';

import { room, hotelRoomResult, roomDetail, rootUrl } from '../types';
import Section from './Section';
import Room from './Room';

interface Props {
}

type ClassNames =
  | 'root'
  | 'gridListWrapper'
  | 'gridList'
  | 'title'
  | 'titleBar'
  | 'section'
  | 'borderlessSection'
  | 'sectionHeader'
  | 'roomPaper';

const styles: StyleRulesCallback<ClassNames> = (theme: Theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    margin: 'auto',
    padding: 0,
    marginBottom: 24,
    maxWidth: 1160,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    margin: 0,
    padding: 0,
  },
  gridListWrapper: {
    margin: 0,
    padding: 0,
  },
  title: {
    color: theme.palette.primary,
  },
  titleBar: {
  //  background:
  //    'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  section: {
    borderBottom: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: '#CCC',
    width: '100%',
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  borderlessSection: {
    width: '100%',
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  sectionHeader: {
    width: '100%',
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: 8,
    marginRight: 8,
  },
  roomPaper: {
    padding: 16,
  }
});

type PropsWithStyles = Props & RouteComponentProps<{
  country: string
  city: string
  id: string
  locale: string
  curr: string
}> & WithStyles<ClassNames> & WithWidthProps;

class HotelRoom extends React.Component<PropsWithStyles, {
  country: string,
  city: string,
  locale: string,
  curr: string,
  id: string,
  checkIn: Date,
  checkOut: Date,
  rooms: room[],
  result?: hotelRoomResult,
  page: number,
  itemPerPage: number,
}> {
  constructor(props: PropsWithStyles) {
    super(props);
    let query = queryString.parse(props.location.search);
    this.state = {
      country: this.props.match.params.country,
      city: this.props.match.params.city,
      id: this.props.match.params.id,
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

  componentDidMount() {
    let query = queryString.parse(this.props.location.search);
    let url = `${rootUrl}/api/hotels/` 
      + `${this.state.country}/${this.state.city}/${this.state.id}/rooms`
      + `?checkin=${moment(this.state.checkIn).format('DD-MMM-YYYY')}`
      + `&checkout=${moment(this.state.checkOut).format('DD-MMM-YYYY')}`
      + `&rooms=${query.rooms}&locale=${this.state.locale}&currency=${this.state.curr}`;

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
    let {classes, width} = this.props;
    let imgIndex = 0;
    
    let imgCols = width === 'xs' ? 1 : 3.5;
    if (width === 'sm') {imgCols = 2; }

    let roomCodes: string[] = [];
    if (result) {
      result.rooms.map((rm: roomDetail) => {
        if (roomCodes.indexOf(rm.roomCode) < 0) {
          roomCodes.push(rm.roomCode);
        }
      });
    }

    if (!result ) {
      return ( 
      <Typography variant="title" gutterBottom>
        Loading your hotel rooms
      </Typography>
      );
    }

    return (
    <div className={classes.root}>
      { result && 
      <div className={classes.root}>
        <Grid container className={classes.gridListWrapper}>
          <GridList cellHeight={200} className={classes.gridList} cols={imgCols}>
            {result.hotelDetail.hotelImages.map(tile => (
              <GridListTile 
                key={imgIndex++} 
                cols={1} 
              >
                <img src={tile.highResUrl} alt={tile.caption} />
                <GridListTileBar
                  title={tile.caption}
                  classes={{
                    root: classes.titleBar,
                    title: classes.title,
                  }}
                  
                />
              </GridListTile>
            ))}
          </GridList>
        </Grid>
        <Grid container className={classes.sectionHeader} spacing={0}>
          <Grid item xs={12}>
            <Typography variant="headline" color="primary" gutterBottom>
              <b>{result.hotelDetail.name}</b>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subheading" color="primary" gutterBottom>
              {`${result.hotelDetail.address}, ${result.hotelDetail.city}, ${result.hotelDetail.country}`}
            </Typography>
          </Grid>
        </Grid>
        <Grid container className={classes.borderlessSection} spacing={16} >
          { roomCodes.map((rc: string) => 
                <Grid item xs={12} key={rc}>
                  <Room roomCode={rc} rooms={result!.rooms} />
                </Grid>
              )
          }
        </Grid>
        {result.hotelDetail.checkInInstructions && 
          <Section header={'Check-In Instruction'} > 
            <span dangerouslySetInnerHTML={this._rawMarkup(result.hotelDetail.checkInInstructions)} />
          </Section>}
        {result.hotelDetail.propertyDescription && 
          <Section header={'Property Description'} > 
            <span dangerouslySetInnerHTML={this._rawMarkup(result.hotelDetail.propertyDescription)} />
          </Section>}
        {result.hotelDetail.roomInformation && 
          <Section header={'Room Information'} > 
            <span dangerouslySetInnerHTML={this._rawMarkup(result.hotelDetail.roomInformation)} />
          </Section>}
        {result.hotelDetail.areaInformation && 
          <Section header={'Area Information'} > 
            <span dangerouslySetInnerHTML={this._rawMarkup(result.hotelDetail.areaInformation)} />
          </Section>}
      </div>}
    </div>);
  }
}

export default compose(withStyles(styles), withWidth())(HotelRoom);
