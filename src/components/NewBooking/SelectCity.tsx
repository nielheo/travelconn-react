import * as React from 'react';

import Select, { ArrowRendererProps, OptionValues } from 'react-select';
// , { ArrowRendererProps } from 'react-select';
import Typography from 'material-ui/Typography';
// import ClearIcon from 'material-ui-icons/Clear';
import ArrowDropDownIcon from 'material-ui-icons/ArrowDropDown';
import ArrowDropUpIcon from 'material-ui-icons/ArrowDropUp';
import { MenuItem } from 'material-ui/Menu';

// import { autoCompleteCity } from '../types';

const cities = [
  {city: 'bali', country: 'indonesia', display: 'Bali, Indonesia'},
  {city: 'singapore', country: 'singapore', display: 'Singapore, Singapore'},
  {city: 'bangkok', country: 'thailand', display: 'Bangkok, Thailand'},
].map(city => ({
  value: city.city,
  label: city.display,
}));

class Option extends React.Component<OptionValues, {}> {
  render() {
    console.log(this.props);
    console.log(this.state);
    
    return (
      <MenuItem
        component="div"
      >
        {this.props.children}
      </MenuItem>
    );
  }
}

class SelectCity extends React.Component<{}, {}> {
  render() {
    return(
      <Select
        optionComponent={Option}
        options={cities}
        noResultsText={<Typography>{'No results found'}</Typography>}
        // clearRenderer={() => <ClearIcon />}
        arrowRenderer={(props: ArrowRendererProps) => {return props.isOpen 
          ? <ArrowDropDownIcon/> : <ArrowDropUpIcon/>; }}
      />
    );
  }
}

export default SelectCity;