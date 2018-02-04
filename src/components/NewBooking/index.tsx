import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { MouseEvent } from 'react';

import { withStyles, WithStyles } from 'material-ui/styles';
import { Theme } from 'material-ui/styles/createMuiTheme';
import SwipeableViews from 'react-swipeable-views';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import Hotel from 'material-ui-icons/Hotel';
import Flight from 'material-ui-icons/Flight';
import LocalFlorist from 'material-ui-icons/LocalFlorist';
import LocalTaxi from 'material-ui-icons/LocalTaxi';

import NewHotel from './Hotel';

const styles = (theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
});

type PropsWithStyles = RouteComponentProps<{
  theme: Theme
}> & WithStyles<'root'>;

class NewBooking extends React.Component<PropsWithStyles, {value: number}> {
  constructor(props: PropsWithStyles) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  handleChange = (event: MouseEvent<HTMLElement>, value: number) => {
    this.setState({ value });
  }

  handleChangeIndex = (index: number) => {
    this.setState({ value: index });
  }

  _redirect = (url: string) => {
    this.props.history.push(url);
  }

  public render() {
    let { classes } = this.props;
    return (
    <div className={classes.root}>
      <Typography type="display1" gutterBottom>
        Create New Booking
      </Typography>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
            scrollable 
            scrollButtons="off"
          >
            <Tab label="Hotel" icon={<Hotel />} />
            <Tab label="Flight" icon={<Flight />} />
            <Tab label="Tour" icon={<LocalFlorist />} />
            <Tab label="Transfer" icon={<LocalTaxi />} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <Typography component="div" dir={'ltr'} style={{ padding: 8 }}>
            <NewHotel redirect={this._redirect} />
          </Typography>
          <Typography component="div" dir={'ltr'} style={{ padding: 8 * 3 }}>
          ------- Flight ------
          </Typography>
          <Typography component="div" dir={'ltr'} style={{ padding: 8 * 3 }}>
          ------- Tour ------
          </Typography>
          <Typography component="div" dir={'ltr'} style={{ padding: 8 * 3 }}>
          ------- Transfer ------
          </Typography>
        </SwipeableViews>
    </div>);
  }
}

export default withStyles(styles, { withTheme: true })(NewBooking);
