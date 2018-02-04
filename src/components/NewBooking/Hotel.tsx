import * as React from 'react';
import * as moment from 'moment';

import HotelOccupancyDialog from './HotelOccupancyDialog';

import { Theme } from 'material-ui/styles/createMuiTheme';
import { withStyles, WithStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Hidden from 'material-ui/Hidden';
import { DatePicker } from 'material-ui-pickers';
import { FormControl, FormHelperText } from 'material-ui/Form';

const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 12,
    padding: 16,
  },
  paper: {
    padding: 16,
    color: theme.palette.text.secondary,
  },
  textField: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

interface Props {
}

type room = {
  adult: number,
  childAges?: number[],
};

type PropsWithStyles = Props & WithStyles<'root' | 'paper' | 'textField' | 'button'>;

class NewBookingHotel extends React.Component<PropsWithStyles, 
  {rooms: room[], checkIn: Date, checkOut: Date, 
    searchClicked: boolean, cityHotel: string,
    openHotelOccupancy: boolean}> {
  constructor(props: PropsWithStyles) {
    super(props);
    this.state = {
      cityHotel: '',
      rooms: [{adult: 2}],
      checkIn: moment().add(2, 'd').toDate(),
      checkOut: moment().add(3, 'd').toDate(),
      searchClicked: false,
      openHotelOccupancy: false,
    };
  }

  _totalAdult = () => {
    let total: number = 0;
    this.state.rooms.map((rm: room) => total += rm.adult);
    return total;
  }

  _totalChildren = () => {
    let total: number = 0;
    this.state.rooms.map((rm: room) => total += rm.childAges && rm.childAges.length || 0);
    return total;
  }

  _occupancyText = () => {
    let text = this.state.rooms.length + ' room' + (this.state.rooms.length > 1 ? 's' : '');
    text += ', ' + this._totalAdult() + ' adult' + (this._totalAdult() > 1 ? 's' : '');
    text += ', ' + this._totalChildren() + ' child' + (this._totalChildren() > 1 ? 'ren' : '');
    return text;
  }

  _checkInChange = (e: Date) => {
    if (this.state.checkIn !== e) {
      this.setState({checkIn: e});
    }

    if (e >= this.state.checkOut) {
      this.setState({checkOut: moment(e).add(1, 'd').toDate() });
    }
  }

  _checkOutChange = (e: Date) => {
    if (this.state.checkOut !== e) {
      this.setState({checkOut: e});
    }

    if (e <= this.state.checkIn) {
      this.setState({checkIn: moment(e).add(-1, 'd').toDate() });
    }
  }

  _searchClick = () => {
    if (!this.state.searchClicked) {
      this.setState({searchClicked: true});
    }
  }

  _occupancyClose = () => {
    this.setState({openHotelOccupancy: false});
  }

  _occupancyFocus = () => {
    this.setState({openHotelOccupancy: true});
  }
  
  public render() {
    let {classes} = this.props;
    let {searchClicked, cityHotel} = this.state;
    return (
      <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={12} md={6}>
           
          <FormControl 
            error={searchClicked && !cityHotel.length} 
            fullWidth 
            aria-describedby="name-error-text"
          >
            <TextField
              id="cityHotel"
              label="City / Hotel"
              type="search"
              margin="normal"
              value={cityHotel}
              error={searchClicked && !cityHotel.length}
              fullWidth
            />
            <FormHelperText id="name-error-text">
              {(searchClicked && !cityHotel.length ? '* Required' : '')}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DatePicker
            id="checkIn"
            label="Check In"
            margin="normal"
            format={'dddd, MMMM Do'}
            value={this.state.checkIn}
            onChange={this._checkInChange}
            autoOk
            animateYearScrolling
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DatePicker
            id="checkOut"
            label="Check Out"
            margin="normal"
            format={'dddd, MMMM Do'}
            value={this.state.checkOut}
            onChange={this._checkOutChange}
            autoOk
            animateYearScrolling
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="occupancy"
            label="Room Occupancy"
            margin="normal"
            fullWidth
            value={this._occupancyText()}
            onClick={this._occupancyFocus}
          />
          <HotelOccupancyDialog  
            open={this.state.openHotelOccupancy}
            onClose={this._occupancyClose}
            value={this.state.rooms}
          />
        </Grid>
        <Hidden xsUp>
          <Grid item xs={12} md={6}>
            <TextField
              id="nationality"
              label="Guest Nationality"
              margin="normal"
              fullWidth
            />
          </Grid>
        </Hidden>
        <Grid item xs={12}>
          <Button  
            id="nationality" 
            fullWidth 
            raised 
            color="primary"
            onClick={this._searchClick}
          >
            S e a r c h
          </Button>
        </Grid>

      </Grid>
    </div>);
  }
}

export default withStyles(styles)(NewBookingHotel);
