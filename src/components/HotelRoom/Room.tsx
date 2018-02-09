import * as React from 'react';

import { Theme } from 'material-ui/styles/createMuiTheme';
import { withStyles, WithStyles, StyleRulesCallback } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import { roomDetail } from '../types';
import RoomDetail from './RoomDetail';

interface Props {
  rooms: roomDetail[];
  roomCode: string;
}

type ClassNames =
  | 'root'
  | 'roomPaper';

const styles: StyleRulesCallback<ClassNames> = (theme: Theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    margin: 0,
    padding: 0,
    marginBottom: 24,
  },
  roomPaper: {
    padding: 0,
  }
});

type PropsWithStyles = Props & WithStyles<ClassNames>;

class Room extends React.Component<PropsWithStyles, {}> {
  constructor(props: PropsWithStyles) {
    super(props);
  }

  render() {
    let {rooms, roomCode, classes} = this.props;
    let selectedRooms = rooms.filter((rm: roomDetail) => rm.roomCode === roomCode);

    return(
      <Paper className={classes.roomPaper}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Typography type="subheading" gutterBottom style={{padding: 16}}>
              <b>{selectedRooms[0].rateDesc}</b>
            </Typography>
          </Grid>
          <Grid item xs={12} style={{margin: 0}}>
            <div style={{backgroundColor: '#f0f0f0', padding: 8}}>
              <Grid container>
                <Grid item md={2} xs={12} >
                  <img src={selectedRooms[0].roomImages[0].url} width={'100%'} />
                  <span style={{fontSize: '0.8em'}}>Room Details</span>
                </Grid>
                <Grid item md={10} xs={12} >
                  {selectedRooms.map((rd: roomDetail) => <RoomDetail room={rd} key={rd.rateCode} />)}
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles)(Room);