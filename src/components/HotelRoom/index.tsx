import * as React from 'react';
import * as moment from 'moment';
import * as queryString from 'query-string';
import { compose } from 'recompose';

import { RouteComponentProps } from 'react-router';
import { Theme } from 'material-ui/styles/createMuiTheme';
import { withStyles, WithStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import withWidth from 'material-ui/utils/withWidth';

import { room, hotelRoomResult } from '../types';

interface Props {
}

type PropsWithStyles = Props & RouteComponentProps<{
  country: string
  city: string
  id: string
}> & WithStyles<'root' | 'paper' | 'control' | 'card' | 'media' | 'cardAction' | 'pagingBottom'
  | 'pagingTop' | 'noLink' >;

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
    height: 200,
  },
  cardAction: {
    width: '100%',
  },
  pagingBottom: {
    marginTop: 16,
  },
  pagingTop: {
    marginBottom: 16,
  },
  noLink: {
    textDecoration: 'none'
  }
});

class HotelsAvail extends React.Component<PropsWithStyles, {
  country: string,
  city: string,
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
    let url = `https://travelconnapi.azurewebsites.net/api/hotels/` 
      + `${this.state.country}/${this.state.city}/${this.state.id}/rooms`
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
    if (!result ) {
      return ( 
      <Typography type="title" gutterBottom>
        Loading your hotel rooms
      </Typography>
      );
    }

    return (
    <div>
      { result && <Typography type="display1" gutterBottom>
        {result.hotelDetail.name}
      </Typography>
      }
    </div>);
  }
}

export default compose(withStyles(styles), withWidth())(HotelsAvail);
