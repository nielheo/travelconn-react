import * as React from 'react';

import { MouseEvent } from 'react';

import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import { Theme } from 'material-ui/styles/createMuiTheme';
import { withStyles, WithStyles } from 'material-ui/styles';
import { currencies, currency } from '../types';

export interface Props {
  curr: string;
  onChange: Function;
} 

const styles = (theme: Theme) => ({
  root: {
    width: '100%',
    maxWidth: 570,
    backgroundColor: theme.palette.background.paper,
  },
  currMenu: {
    marginRight: 10,
    width: 22,
  }
});

type PropsWithStyles = Props & WithStyles<'root' | 'currMenu'>;

class CurrencyMenu extends React.Component<PropsWithStyles, {
  anchorEl: EventTarget & HTMLElement | undefined,
}> {
  constructor(props: PropsWithStyles) {
    super(props);
    this.state = {anchorEl: undefined};
  }

  _handleClose = () => {
    this.setState({ anchorEl: undefined });
  }

  _handleClick = (event: MouseEvent<HTMLElement>) => {
    this.setState({ anchorEl: event.currentTarget });
  }

  _handleMenuItemClick = (event: MouseEvent<HTMLElement>, code: string) => {
    this.setState({ anchorEl: undefined }, () => this.props.onChange(code));
  }

  render() {
    let { anchorEl } = this.state;
    let { classes } = this.props;
    let selectedCurr = currencies.find((curr: currency) => 
                        curr.code === this.props.curr.toLocaleLowerCase());
    let currSymbol = selectedCurr && selectedCurr.symbol;
    
    return(
      <div>
        <IconButton 
          color="inherit" 
          aria-label="Menu" 
          aria-owns="currency-menu"
          onClick={this._handleClick}
        >
          <Typography variant="title" gutterBottom color="secondary">
            {currSymbol}
          </Typography>
        </IconButton>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this._handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          
        >
          <Grid container spacing={0} className={classes.root} >
          {
            currencies.map((curr: currency) => 
              <Grid item xs={12} sm={6} md={4} key={curr.code} style={{border: 0}} >
                <MenuItem 
                  style={{paddingTop: 8, paddingBottom: 8}} 
                  selected={curr.code.toLocaleLowerCase() === this.props.curr.toLocaleLowerCase()}
                  onClick={(e: MouseEvent<HTMLElement>) => this._handleMenuItemClick(e, curr.code)}
                >
                  <Typography gutterBottom color="secondary" className={classes.currMenu}>
                    {curr.symbol}
                  </Typography>
                  <span style={{fontSize: '0.8em'}}> {curr.text}</span>
                </MenuItem>
              </Grid>
            )
          }
          </Grid>
        </Menu>
      </div>
    );
  }
}

export default withStyles(styles)(CurrencyMenu);