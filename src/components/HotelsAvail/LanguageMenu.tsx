import * as React from 'react';
import { MouseEvent } from 'react';

import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import Grid from 'material-ui/Grid';
import { Theme } from 'material-ui/styles/createMuiTheme';
import { withStyles, WithStyles } from 'material-ui/styles';
import { languages, language } from '../types';

export interface Props {
  countryCode: string;
  onChange: Function;
} 

const styles = (theme: Theme) => ({
  root: {
    width: '100%',
    maxWidth: 570,
    backgroundColor: theme.palette.background.paper,
  },
  img: {
    border: '1px solid #CCCCCC',
    marginRight: 10,
  }
});

type PropsWithStyles = Props & WithStyles<'root' | 'img'>;

class LanguageMenu extends React.Component<PropsWithStyles, {
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
    return(
      <div>
        <IconButton 
          color="inherit" 
          aria-label="Menu" 
          aria-owns="language-menu"
          onClick={this._handleClick}
        >
          <img 
            src={`/flags/${this.props.countryCode}.png`} 
            height={20} 
            className={classes.img}
          />
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
            languages.map((lang: language) => 
              <Grid item xs={12} sm={6} md={4} key={lang.code} style={{border: 0}} >
                <MenuItem 
                  style={{paddingTop: 8, paddingBottom: 8}} 
                  selected={lang.code.toLocaleLowerCase() === this.props.countryCode.toLocaleLowerCase()}
                  onClick={(e: MouseEvent<HTMLElement>) => this._handleMenuItemClick(e, lang.code)}
                >
                  <img 
                    src={`/flags/${lang.code}.png`} 
                    className={classes.img} 
                    width={24} 
                  /><span style={{fontSize: '0.8em'}}> {lang.text}</span>
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

export default withStyles(styles)(LanguageMenu);