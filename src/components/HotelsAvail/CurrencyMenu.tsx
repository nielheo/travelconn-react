import * as React from 'react';

import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import { currencySymbols } from '../types';

class CurrencyMenu extends React.Component<{
  curr: string,
  onChange: Function,
}, {}> {

  _currChange = () => {
    if (this.props.curr.toUpperCase() === 'IDR') {
      this.props.onChange('USD');
    } else {
      this.props.onChange('IDR');
    }
  }

  render() {
    return(
      <IconButton 
        color="inherit" 
        aria-label="Menu" 
      >
        <Typography type="title" gutterBottom color="secondary" onClick={this._currChange}>
          {currencySymbols[this.props.curr.toLocaleLowerCase()]}
        </Typography>
      </IconButton>
    );
  }
}

export default CurrencyMenu;