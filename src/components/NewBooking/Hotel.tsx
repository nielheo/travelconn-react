import * as React from 'react';

import { Theme } from 'material-ui/styles/createMuiTheme';
import { withStyles, WithStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import { DatePicker } from 'material-ui-pickers';

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
});

interface Props {
}

type room = {
  adult: number,
  childAges?: number[],
};

type PropsWithStyles = Props & WithStyles<'root' | 'paper' | 'textField'>;

class NewBookingHotel extends React.Component<PropsWithStyles, 
  {rooms: room[], checkIn: Date, checkOut: Date}> {
  constructor(props: PropsWithStyles) {
    super(props);
    this.state = {
      rooms: [{adult: 2}],
      checkIn: new Date(),
      checkOut: new Date(),
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

  _checkInChange = () => {

  }

  _checkOutChange = () => {

  }
  
  public render() {
    let {classes} = this.props;
    return (
      <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={12} md={6}>
            <TextField
              id="cityHotel"
              label="City / Hotel"
              type="search"
              margin="normal"
              fullWidth
            />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DatePicker
            id="checkIn"
            label="Check In"
            margin="normal"
            value={this.state.checkIn}
            onChange={this._checkInChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DatePicker
            id="checkOut"
            label="Check Out"
            margin="normal"
            value={this.state.checkIn}
            onChange={this._checkInChange}
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
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="nationality"
            label="Guest Nationality"
            margin="normal"
            fullWidth
          />
        </Grid>
      </Grid>
    </div>);
  }
}

export default withStyles(styles)(NewBookingHotel);
