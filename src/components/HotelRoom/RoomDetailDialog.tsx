import * as React from 'react';

import { Theme } from 'material-ui/styles/createMuiTheme';
import { withStyles, WithStyles, StyleRulesCallback } from 'material-ui/styles';

interface Props {
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

class RoomDetailDialog extends React.Component<PropsWithStyles, {}> {
  constructor(props: PropsWithStyles) {
    super(props);
  }

}

export default withStyles(styles)(RoomDetailDialog);