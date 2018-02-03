import * as React from 'react';
import { WithStyles, withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

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
};

type PropsWithStyles = LayoutProps & WithStyles<'root' | 'flex' | 'menuButton'>;

class Layout extends React.Component<PropsWithStyles, {}> {
  public render() {
    console.log('Layout');
    console.log(this.props);
    const {classes} = this.props;
    return (
      <section>
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography type="title" color="inherit" className={classes.flex}>
            Title
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-3">
            Otak otak
        </div>
        <div className="col-sm-9">
          {this.props.children}
        </div>
      </div>
    </div></section>);
  } 
}

export default withStyles(styles)(Layout);
