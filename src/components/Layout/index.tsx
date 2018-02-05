import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

import LeftMenu from './LeftMenu';

import { WithStyles, withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Menu, { MenuItem } from 'material-ui/Menu';
import Drawer from 'material-ui/Drawer';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';

import { isHideMenu } from '../functions';

export interface LayoutProps {
    children?: React.ReactNode;
}

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  body: {
    flexGrow: 1,
    margin: 6,
  },
  menu: {
    textAlign: 'left',
    padding: 0,
    margin: 0,
  },
  content: {
    padding: 16,
    margin: 0,
    textAlign: 'left',
  },
};

type PropsWithStyles = LayoutProps 
  & WithStyles<'root' | 'flex' | 'menuButton' | 'body' | 'menu' | 'content' > 
  & RouteComponentProps<LayoutProps>;

class Layout extends React.Component<PropsWithStyles, 
  {auth: boolean, 
    anchorEl: EventTarget & HTMLElement | undefined,
    left: boolean
  }> {
  constructor(props: PropsWithStyles) {
    super(props);
    this.state = {
      auth: true,
      anchorEl: undefined,
      left: false,
    };
  }

  handleChange = (event: Function, checked: boolean) => {
    this.setState({ auth: checked });
  }

  handleMenu = (event: MouseEvent<HTMLElement>) => {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose = () => {
    this.setState({ anchorEl: undefined });
  }

  _toggleDrawer = (open: boolean) => () => {
    this.setState({
      left: open,
    });
  }

  _isHideMenu = () => {
    return isHideMenu(this.props.location.pathname);
  }

  public render() {
    const {classes} = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <section>
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Hidden mdUp={!this._isHideMenu()}>
            <IconButton 
              className={classes.menuButton} 
              color="inherit" 
              aria-label="Menu" 
              onClick={this._toggleDrawer(true)}
            >
                <MenuIcon/>
            </IconButton>
            <Drawer open={this.state.left} onClose={this._toggleDrawer(false)}>
              <div
                tabIndex={0}
                role="button"
                onClick={this._toggleDrawer(false)}
                onKeyDown={this._toggleDrawer(false)}
              >
                <LeftMenu />
              </div>
            </Drawer>
          </Hidden>
          <Typography type="title" color="inherit" className={classes.flex}>
            TravelConn
          </Typography>
          {auth && (
          <div>
            <IconButton
              aria-owns={open ? 'menu-appbar' : undefined}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"
              
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={this.handleClose}
            >
              <MenuItem onClick={this.handleClose}>Profile</MenuItem>
              <MenuItem onClick={this.handleClose}>My account</MenuItem>
            </Menu>
          </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
    <div className={classes.body}>
      <Grid container={true}>
        <Hidden smDown={!this._isHideMenu()} xlDown={this._isHideMenu()}>
          <Grid item md={2} >
            <Paper className={classes.menu}><LeftMenu /></Paper>
          </Grid> 
        </Hidden>
        <Grid item xs={12} md={this._isHideMenu() ? 12 : 10} >
          <Paper className={classes.content} elevation={0}>{this.props.children}</Paper>
        </Grid>  
      </Grid>
    </div></section>);
  } 
}

const layoutWithStyles = withStyles(styles)(Layout);

export default withRouter(layoutWithStyles);
import { MouseEvent } from 'react';
