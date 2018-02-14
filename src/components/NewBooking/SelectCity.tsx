import * as React from 'react';

import { Async, OnChangeHandler, OptionValues } from 'react-select';
// , { ArrowRendererProps } from 'react-select';
import Typography from 'material-ui/Typography';
import Input, { InputLabel } from 'material-ui/Input';
import ClearIcon from 'material-ui-icons/Clear';
import ArrowDropDownIcon from 'material-ui-icons/ArrowDropDown';
import ArrowDropUpIcon from 'material-ui-icons/ArrowDropUp';
import { MenuItem } from 'material-ui/Menu';
import { Theme } from 'material-ui/styles/createMuiTheme';
import { withStyles, WithStyles } from 'material-ui/styles';
import { ChangeEvent, MouseEvent } from 'react';
import { rootUrl, autoCompleteCity } from '../types';
// import { autoCompleteCity } from '../types';

let cities = [
  {city: 'bali', country: 'indonesia', display: 'Bali, Indonesia'},
  {city: 'singapore', country: 'singapore', display: 'Singapore, Singapore'},
  {city: 'bangkok', country: 'thailand', display: 'Bangkok, Thailand'},
].map(city => ({
  value: `${city.city}|${city.country}`,
  label: city.display,
}));

class Option extends React.Component<OptionValues, {}> {
  handleClick = (event: MouseEvent<HTMLElement>) => {
    let { onSelect, option } = Object(this.props);
    onSelect(option, event);
  }
    
  render() {
    let { children, isFocused, isSelected, onFocus } = Object(this.props);
    return (
      <MenuItem
        onFocus={onFocus}
        selected={isFocused}
        onClick={this.handleClick}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {children}
      </MenuItem>
    );
  }
}

interface ArrowRendererProps {
  isOpen: boolean;
  onMouseDown: React.MouseEventHandler<HTMLElement>;
}

const ITEM_HEIGHT = 48;

interface Props {
  defaultValue: string;
  classes?: WithStyles<'root' | '@global'>;
}

type PropsWithStyles = Props & WithStyles<'root' | '@global'>;

const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1,
    height: 200,
    width: 200,
  },
  // We had to use a lot of global selectors in order to style react-select.
  // We are waiting on https://github.com/JedWatson/react-select/issues/1679
  // to provide a better implementation.
  // Also, we had to reset the default style injected by the library.
  '@global': {
    '.Select-control': {
      display: 'flex',
      alignItems: 'center',
      border: 0,
      height: 'auto',
      background: 'transparent',
      '&:hover': {
        boxShadow: 'none',
      },
      
    },
    '.Select-multi-value-wrapper': {
      flexGrow: 1,
      display: 'flex',
      flexWrap: 'wrap',
    },
    '.Select--multi .Select-input': {
      margin: 0,
    },
    '.Select.has-value.is-clearable.Select--single > .Select-control .Select-value': {
      padding: 0,
    },
    '.Select-noresults': {
      padding: theme.spacing.unit * 2,
    },
    '.Select-input': {
      display: 'inline-flex !important',
      padding: 0,
      height: 'auto',
    },
    '.Select-input input': {
      background: 'transparent',
      border: 0,
      padding: 0,
      cursor: 'default',
      display: 'inline-block',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      margin: 0,
      outline: 0,
    },
    '.Select-placeholder, .Select--single .Select-value': {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(16),
      padding: 0,
    },
    '.Select-placeholder': {
      opacity: 0.42,
      color: theme.palette.common.black,
    },
    '.Select-menu-outer': {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[2],
      position: 'absolute',
      left: 0,
      top: `calc(100% + ${theme.spacing.unit}px)`,
      width: '100%',
      zIndex: 2,
      maxHeight: ITEM_HEIGHT * 4.5,
    },
    '.Select.is-focused:not(.is-open) > .Select-control': {
      boxShadow: 'none',
    },
    '.Select-menu': {
      maxHeight: ITEM_HEIGHT * 4.5,
      overflowY: 'auto',
    },
    '.Select-menu div': {
      boxSizing: 'content-box',
    },
    '.Select-arrow-zone, .Select-clear-zone': {
      color: theme.palette.action.active,
      cursor: 'pointer',
      height: 21,
      width: 21,
      zIndex: 1,
    },
    // Only for screen readers. We can't use display none.
    '.Select-aria-only': {
      position: 'absolute',
      overflow: 'hidden',
      clip: 'rect(0 0 0 0)',
      height: 1,
      width: 1,
      margin: -1,
    },
    '.Select': {
      width: '100%',
    }
  },
});

interface InputProps {
  value?: OptionValues;
  onChange: OnChangeHandler;
  placeholder: string;
  // instanceId: string;
  id: string;
  name: string;
  // simpleValue: boolean;
  // options: any;
  // label: string;
  // classes?: WithStyles<'root' | '@global'>;
}

type InputPropsWithStyles = InputProps & WithStyles<'root' | '@global'>;

const getOptions = (query: string, callback: Function) => {
  return fetch(`${rootUrl}/api/cityautocomplete?query=${query}`)
    .then((response) => {
      return response.json();
    }).then((json) => {
      if (query.length > 1) {
        cities = json.map((opt: autoCompleteCity) => { 
          return { value: `${opt.city}|${opt.country}`, label: opt.display }; });
      } 
      return { options: cities, complete: true };
    });
  // setTimeout(callback(null, { options: cities, complete: true }), 500); 
};

function SelectWrapped (props: InputPropsWithStyles) {
  const { value } = props;
  console.log(value);
  console.log(cities);
  return(
    <Async
      // value={'bali'}
      onChange={props.onChange}
      optionComponent={Option}
      options={cities}
      noResultsText={<Typography>{'No results found'}</Typography>}
      clearRenderer={() => <ClearIcon />}
      placeholder={props.placeholder}
      arrowRenderer={(arrowprops: ArrowRendererProps) => {return arrowprops.isOpen 
        ? <ArrowDropDownIcon/> : <ArrowDropUpIcon/>; }}
      value={value}
      style={{width: '100%'}}
      loadOptions={getOptions}
      // loadingPlaceholder={'loading ...'}
      autoload={false}
      isLoading={false}
      onBlurResetsInput={false}
      // valueComponent={Option}
      // minimumInput={2}
      
    />
  );
}

let SelectWrappedWithStyles = withStyles(styles)(SelectWrapped);

class SelectCity extends React.Component<PropsWithStyles, {
  value: string
}> {
  constructor(props: PropsWithStyles) {
    super(props);
    this.state = {
      value: this.props.defaultValue
    };
  }

  _onChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('_onChange');
    console.log(e);
    let option = Object(e);
    if (option.value !== this.state.value) {
      this.setState({value: option.value});
    }
  }

  render() {
    // const {classes} = this.props;
    return(
      <div>
        <InputLabel htmlFor="city" shrink={true}>
          City / Hotel Name
        </InputLabel>
        <Input
          style={{height: 33}}
          id="city"
          fullWidth
          inputComponent={SelectWrappedWithStyles}
          inputProps={{
            // classes,
            value: this.state.value,
            onChange: this._onChange,
            placeholder: '',
            // instanceId: 'react-select-single',
            id: 'city-select',
            name: 'city-select',
            // simpleValue: true,
            // options: suggestions,
          }}
        />
      </div>
    );
  }
}

export default withStyles(styles)(SelectCity);