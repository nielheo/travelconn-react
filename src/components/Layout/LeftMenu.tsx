import * as React from 'react';

import { Link } from 'react-router-dom';

import { withStyles, WithStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { Theme } from 'material-ui/styles/createMuiTheme';
import Collapse from 'material-ui/transitions/Collapse';
import InboxIcon from 'material-ui-icons/MoveToInbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import SendIcon from 'material-ui-icons/Send';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import StarBorder from 'material-ui-icons/StarBorder';
import Assessment from 'material-ui-icons/Assessment';
import Add from 'material-ui-icons/Add';
import Folder from 'material-ui-icons/Folder';
import Divider from 'material-ui/Divider';

const styles = (theme: Theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    padding: 0,
    margin: 0,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

interface Props {
}

class LeftMenu extends React.Component<Props & WithStyles<'root' | 'nested'>, {}> {
  state = { open: true };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  }
  
  public render() {
    let {classes} = this.props;
    return (
      <div className={classes.root}>
        <List
          component="nav"
        >
          <ListItem button component={Link} {... {to: '/'}}>
            <ListItemIcon>
              <Assessment />
            </ListItemIcon>
            <ListItemText inset primary="Dashboard" />
          </ListItem>
          <Divider/>
          <ListItem button component={Link} {... {to: '/newbooking'}}>
            <ListItemIcon>
              <Add />
            </ListItemIcon>
            <ListItemText inset primary="New Booking" />
          </ListItem>
          <ListItem button component={Link} {... {to: '/bookinglist'}}>
            <ListItemIcon>
              <Folder />
            </ListItemIcon>
            <ListItemText inset primary="Booking List" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText inset primary="Drafts" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText inset primary="Drafts" />
          </ListItem>
          <ListItem button onClick={this.handleClick}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText inset primary="Inbox" />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText inset primary="Starred" />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </div>);
  }
}

export default withStyles(styles)(LeftMenu);
