import * as React from 'react';

import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';

type room = {
  adult: number,
  childAges?: number[],
};

interface Props {
  value: room[];
  open: boolean;
  onClose: Function;
}

export default class ConfirmationDialog extends React.Component<Props, {value: room[]}> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: this.props.value,
    };
  }
  
  componentWillMount() {
    this.setState({ value: this.props.value });
  }

  handleCancel = () => {
    this.props.onClose(this.props.value);
  }

  handleOk = () => {
    this.props.onClose(this.state.value);
  }

  render() {
    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        aria-labelledby="confirmation-dialog-title"
        open={this.props.open}
      >
        <DialogTitle id="confirmation-dialog-title">Room Occupancy</DialogTitle>
        <DialogContent>
          <FormControl style={{minWidth: 160}}>
            <InputLabel htmlFor="age-simple">Number of Rooms</InputLabel>
            <Select
              value={this.state.value.length}
              inputProps={{
                name: 'rooms',
                id: 'rooms',
              }}
            >
              <MenuItem value={1}>1 room</MenuItem>
              <MenuItem value={2}>2 rooms</MenuItem>
              <MenuItem value={3}>3 rooms</MenuItem>
              <MenuItem value={4}>4 rooms</MenuItem>
              <MenuItem value={5}>5 rooms</MenuItem>
              <MenuItem value={6}>6 rooms</MenuItem>
              <MenuItem value={7}>7 rooms</MenuItem>
              <MenuItem value={8}>8 rooms</MenuItem>
            </Select>
          </FormControl>
          <label>Room 1</label>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleOk} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}