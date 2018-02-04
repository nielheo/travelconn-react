import * as React from 'react';

import LeftMenu from './LeftMenu';

import { WithStyles, withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Menu, { MenuItem } from 'material-ui/Menu';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';

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

type PropsWithStyles = LayoutProps & WithStyles<'root' | 'flex' | 'menuButton' | 'body' | 'menu' | 'content' >;

class Layout extends React.Component<PropsWithStyles, 
  {auth: boolean, 
    anchorEl: EventTarget & HTMLElement | undefined}> {
  constructor(props: PropsWithStyles) {
    super(props);
    this.state = {
      auth: true,
      anchorEl: undefined,
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

  public render() {
    const {classes} = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <section>
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Hidden mdUp={true}>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
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
        <Hidden smDown={true}>
          <Grid item md={2} >
            <Paper className={classes.menu}><LeftMenu /></Paper>
          </Grid> 
        </Hidden>
        <Grid item xs={12} md={10} >
          <Paper className={classes.content} elevation={0}>{this.props.children}</Paper>
        </Grid>  
      </Grid>
    </div></section>);
  } 
}

export default withStyles(styles)(Layout);
import { MouseEvent } from 'react';
