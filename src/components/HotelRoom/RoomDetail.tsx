import * as React from 'react';

import { Theme } from 'material-ui/styles/createMuiTheme';
import { withStyles, WithStyles, StyleRulesCallback } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import { roomDetail, valueAdd } from '../types';
import { ToFinance } from '../functions';

interface Props {
  room: roomDetail;
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
    margin: 0,
    padding: 0,
  },
  roomPaper: {
    padding: 8,
    backgroundColor: theme.palette.background.paper,
    margin: 8,
  }
});

type PropsWithStyles = Props & WithStyles<ClassNames>;

class Room extends React.Component<PropsWithStyles, {}> {
  constructor(props: PropsWithStyles) {
    super(props);
  }

  render() {
    let {room, classes} = this.props;
    
    return(
      <Paper className={classes.roomPaper}>
        <Grid container>
          <Grid item md={9} xs={12} style={{padding: 16}}>
            <ul>
              {room.valueAdds.map((va: valueAdd) => <li key={va.id}>{va.description}</li>)}
            </ul>
            <span style={{fontSize: '0.8em'}}>
            {room.cancellationPolicyDesc}
            </span>
          </Grid>
          
          <Grid item md={3} xs={12} style={{textAlign: 'right', padding: 16}}>
            <Typography type="title" color="secondary">
              {ToFinance(room.chargeableRate.currency, room.chargeableRate.total, 'en-US')}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles)(Room);