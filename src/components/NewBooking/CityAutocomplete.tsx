import * as React from 'react';
import { ChangeEvent } from 'react';
// import * as PropTypes from 'prop-types'
import Downshift from 'downshift';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import { withStyles, WithStyles, StyleRules } from 'material-ui/styles';
import { Theme } from 'material-ui/styles/createMuiTheme';
// import { FormLabel, FormControlLabel, FormControl } from 'material-ui/Form'
// import Input, { InputLabel } from 'material-ui/Input'
// import { EventHandler } from 'react'

type SuggestionItem = {
  label: string
  value: string
};

type inputProperties = {
  suggestion: SuggestionItem
  index: number,
  theme?: Theme,
  // itemProps: getItemProps({ item: suggestion.label }),
  // highlightedIndex?: number,
  selectedItem: number,
  className?: string,
  autoFocus?: boolean,
  value?: string,
  ref?: string,
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void,
};

function renderInput(options: { inputProps: inputProperties; label?: string }) {
  const { label, inputProps } = options;
  const { className, autoFocus, value, ref, onChange } = inputProps;

  return (
    <TextField
      fullWidth
      label={label}
      autoFocus={autoFocus}
      value={value}
      inputRef={ref}
      className={className}
      onChange={onChange}
      InputProps={{
        classes: {
          // input: classes.input,
        },
      //  ...other,
      }}
    />
  );
}

function renderSuggestion(params: inputProperties) {
  // const { suggestion, index, itemProps, theme, highlightedIndex, selectedItem } = params
  // const isHighlighted = highlightedIndex === index
  // const isSelected = selectedItem === suggestion.label

  return (
    <MenuItem
      // {...itemProps}
      // key={suggestion.label}
      // selected={isHighlighted}
      component="div"
      /* style={{
        fontWeight: isSelected
          ? theme.typography.fontWeightMedium
          : theme.typography.fontWeightRegular,
      }} */
    >
      xxxx
    </MenuItem>
  );
}

function getSuggestions(options: {
  suggestions: Array<SuggestionItem>
  inputValue: string
}) {
  const { suggestions, inputValue } = options;
  let count = 0;
  const maxVisibleCount = 10;

  return suggestions.filter((suggestion: SuggestionItem) => {
    const isMatching = suggestion.label
      .toLowerCase()
      .includes(inputValue.toLowerCase().trim());
    const isSuggestionVisible = (!inputValue || isMatching) && count < maxVisibleCount;

    if (isSuggestionVisible) {
      count += 1;
    }

    return isSuggestionVisible;
  });
}

interface RenderSuggestionsContainerParams {
  
  children: React.ReactNode;
  className: string;
}

function renderSuggestionsContainer(options: RenderSuggestionsContainerParams) {
  const { className, children } = options;

  return (
    <Paper className={className} square>
      {children}
    </Paper>
  );
}

const stylesheet: StyleRules = {
  container: {
    zIndex: 10,
    position: 'relative',
  },
  textField: {},
  suggestions: {
    position: 'absolute',
    width: '100%',
  },
};

type Props = WithStyles<keyof typeof stylesheet> & {
  suggestionList: Array<SuggestionItem>
  onChange: Function
  defaultValue: string // 기본값
  label?: string // InputLabel
  placeholder?: string
};

type State = {
  inputValue: string
  defaultHighlightedIndex: number
};

/**
 * material Input 자동완성
 */
class MaterialInputAutocomplete extends React.Component<Props, State> {
  static defaultProps = {};

  constructor(props: Props) {
    super(props);

    this.state = {
      inputValue: '',
      defaultHighlightedIndex: -1,
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setDefaultValue(nextProps.suggestionList, nextProps.defaultValue);
  }

  componentDidUpdate(prevProps: Props, prevState: State) {}

  /**
   * 기본으로 들어갈 inputValue와 하이라이팅될 index를 설정한다.
   */
  setDefaultValue = (list: Array<SuggestionItem>, defaultValue: string) => {
    const matchingItems = list.filter(item => item.value === defaultValue);
    if (matchingItems.length) {
      this.setState({
        inputValue: matchingItems[0].label,
        defaultHighlightedIndex: list.findIndex(v => v.value === defaultValue),
      });
    }
  }

  handleOnSelect = (suggestion: string)  => {
    const selected = this.props.suggestionList.find(v => v.label === suggestion);
    if (selected) {
      this.props.onChange(selected.value);
    }
  }

  _valueOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('_valueOnChange');
    this.setState({inputValue: e.target.value});
  }

  render() {
    const { classes, theme } = this.props;
    console.log(this.state);
    return (
      <Downshift
        defaultHighlightedIndex={this.state.defaultHighlightedIndex}
        onSelect={this.handleOnSelect}
        render={({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue,
          selectedItem,
          highlightedIndex,
        }) => (
          <div className={classes.container}>
            {renderInput({
              label: this.props.label,
              inputProps: getInputProps({
                className: classes.textField,
                placeholder: this.props.placeholder,
                id: 'integration-downshift',
                value: this.state.inputValue,
                onChange: this._valueOnChange
                // (e: ChangeEvent<HTMLInputElement>) => this.setState({ inputValue: e.target.value }),
              }),
            })}

            {isOpen
              ? renderSuggestionsContainer({
                  className: classes.suggestions,
                  children: getSuggestions({
                    suggestions: this.props.suggestionList,
                    inputValue: '',
                  }).map((suggestion: SuggestionItem, index: number) =>
                    renderSuggestion({
                      suggestion,
                      index,
                      theme,
                      // itemProps: getItemProps({ item: suggestion.label }),
                      // highlightedIndex,
                      selectedItem,
                    })
                  ),
                })
              : null}
          </div>
        )}
      />
    );
  }
}

export default withStyles(stylesheet, { withTheme: true })(MaterialInputAutocomplete);