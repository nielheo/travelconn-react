import * as React from 'react';
import { MouseEvent } from 'react';

import { Theme } from 'material-ui/styles/createMuiTheme';
import { withStyles, WithStyles, StyleRulesCallback } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Popover, { PopoverReference } from 'material-ui/Popover';

import { roomDetail, valueAdd } from '../types';
import { ToFinance } from '../functions';

interface Props {
  room: roomDetail;
}

type ClassNames =
  | 'root'
  | 'roomPaper'
  | 'cancelPopover'
  | 'popover'
  | 'paper';

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
  },
  cancelPopover: {
    fontSize: '0.8em', 
    marginLeft: 16, 
    flexNone: true,
  },
  popover: {
    pointerEvents: 'none',
    maxWidth: 800,
  },
  paper: {
    padding: theme.spacing.unit,
  },
});

type PropsWithStyles = Props & WithStyles<ClassNames>;

class Room extends React.Component<PropsWithStyles, {
  anchorEl?: HTMLElement,
  anchorReference?: PopoverReference,
}> {
  constructor(props: PropsWithStyles) {
    super(props);
    this.state = {
      anchorEl: undefined,
      anchorReference: 'anchorEl',
    };
  }

  _openCancellationPopover = (event: MouseEvent<HTMLElement>) => {
    if (this.state.anchorEl === undefined) {
      let target = event.target;
      if (target instanceof HTMLElement) {
        this.setState({ anchorEl: target });
      }
    }
  }

  _closeCancellationPopover = () => {
    console.log('_closeCancellationPopover');
    if (this.state.anchorEl !== undefined) {
      this.setState({ anchorEl: undefined });
    }
  }

  render() {
    let {room, classes} = this.props;
    let {anchorEl, anchorReference} = this.state;
    const open = !!anchorEl;
    return(
      <Paper className={classes.roomPaper}>
        <Grid container>
          <Grid item md={9} xs={12} style={{padding: 16}}>
            { room.valueAdds &&
            <ul>
              {room.valueAdds.map((va: valueAdd) => <li key={va.id}>{va.description}</li>)}
            </ul>
            }
            <span
              className={classes.cancelPopover}
              onMouseOver={this._openCancellationPopover}
              onMouseLeave={this._closeCancellationPopover}
            >
              <b>{room.isNonRefundable ? 'Non Refundable' : 'Refundable'}</b>
            </span>
            <Popover
              className={classes.popover}
              classes={{
                paper: classes.paper,
              }}
              open={open}
              anchorEl={anchorEl}
              anchorReference={anchorReference}
              onClose={this._closeCancellationPopover}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <Typography>{room.cancellationPolicyDesc}</Typography>
            </Popover>
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