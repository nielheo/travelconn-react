import * as React from 'react';

import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { ChangeEvent } from 'react';
import { room } from '../types';
import Room from './Room';

interface Props {
  rooms: room[];
  open: boolean;
  onClose: Function;
}

export default class HotelOccupancy extends React.Component<Props, 
{rooms: room[], 
  roomNo: number}> {
  constructor(props: Props) {
    super(props);
    this.state = {
      rooms: this.props.rooms.slice(0),
      roomNo: this.props.rooms.slice(0).length || 1,
    };
  }
  
  handleCancel = () => {
    this.props.onClose(this.props.rooms);
  }

  handleOk = () => {
    this.props.onClose(this.state.rooms.slice(0, this.state.roomNo));
  }

  _roomChanged = (e: ChangeEvent<HTMLInputElement>) => {
    let newRoomNo = parseInt(e.target.value, 10);
    if (this.state.roomNo !== newRoomNo) {
      this.setState({roomNo: newRoomNo});

      // check if rooms array size less then room no
      if (this.state.rooms.length < newRoomNo) {
        let rooms = this.state.rooms.slice(0);
        for (let i = this.state.rooms.length; i < newRoomNo; i++) {
          rooms.push({ adult: 2});
        }
        this.setState({rooms: rooms});
      }
    }
  }

  _updateRoom = (index: number, updatedRoom: room) => {
    if (this.state.roomNo >= index) {
      let rooms = this.state.rooms.slice(0, index - 1);
      rooms.push(updatedRoom);
      for (let i = index; i < this.state.roomNo; i++) {
        rooms.push(this.state.rooms[i]);
      }

      this.setState({rooms: rooms});
    }
  }

  render() {
    let roomIndex = 1;
    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="md"
        aria-labelledby="confirmation-dialog-title"
        open={this.props.open}
      >
        <DialogTitle id="confirmation-dialog-title">Room Occupancy</DialogTitle>
        <DialogContent>
          <FormControl style={{minWidth: 160}}>
            <InputLabel htmlFor="age-simple">Number of Rooms</InputLabel>
            <Select
              value={this.state.roomNo}
              inputProps={{
                name: 'rooms',
                id: 'rooms',
              }}
              onChange={this._roomChanged}
            >
              <MenuItem value={1}>1 room</MenuItem>
              <MenuItem value={2}>2 rooms</MenuItem>
              <MenuItem value={3}>3 rooms</MenuItem>
              <MenuItem value={4}>4 rooms</MenuItem>
              <MenuItem value={5}>5 rooms</MenuItem>
              <MenuItem value={6}>6 rooms</MenuItem>
              <MenuItem value={7}>7 rooms</MenuItem>
              <MenuItem value={8}>8 rooms</MenuItem>
              <MenuItem value={9}>9 rooms</MenuItem>
            </Select>
          </FormControl>
          { 
            this.state.rooms.slice(0, this.state.roomNo).map((curRoom: room) => 
              <Room roomId={roomIndex++} room={curRoom} key={roomIndex} onRoomUpdate={this._updateRoom} />  
            )
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="default">
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