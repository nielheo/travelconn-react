import * as React from 'react';

import { withStyles, WithStyles } from 'material-ui/styles';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { ChangeEvent } from 'react';

import Grid from 'material-ui/Grid';
import { room } from '../type';

const styles = () => ({
  root: {
    flexGrow: 1,
    marginTop: 16,
    width: 480,
  },
  
});

interface Props {
  roomId: number;
  room: room;
  onRoomUpdate: Function;
}

type PropsWithStyles = Props & WithStyles<'root'>;

class NewBookRoom extends React.Component<PropsWithStyles, {
  adult: number, children: number, child1: number, child2: number}> {

  constructor(props: PropsWithStyles) {
    super(props);
    this.state = {
      adult: this.props.room.adult || 2,
      children: this.props.room.childAges && this.props.room.childAges.length || 0,
      child1: 6,
      child2: 2,
    };
  }

  _updateRoom = () => {
    let childAges: number[] = [];
    if (this.state.children > 0) { childAges.push(this.state.child1); }
    if (this.state.children > 1) { childAges.push(this.state.child2); }

    let updatedRoom: room = {
      adult: this.state.adult,
      childAges: childAges
    };

    this.props.onRoomUpdate(this.props.roomId, updatedRoom);
  }

  _adultChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newAdult = parseInt(e.target.value, 10);
    console.log('_adultChange');
    console.log(newAdult);
    console.log(this.state.adult);
    if (this.state.adult !== newAdult) {
      this.setState({adult: newAdult}, () => this._updateRoom());
    }
  }

  _childrenChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newChildren = parseInt(e.target.value, 10);
    if (this.state.children !== newChildren) {
      this.setState({children: newChildren}, () => this._updateRoom());
    }
  }

  _child1Change = (e: ChangeEvent<HTMLInputElement>) => {
    let newChild1 = parseInt(e.target.value, 10);
    if (this.state.child1 !== newChild1) {
      this.setState({child1: newChild1}, () => this._updateRoom());
    }
  }

  _child2Change = (e: ChangeEvent<HTMLInputElement>) => {
    let newChild2 = parseInt(e.target.value, 10);
    if (this.state.child2 !== newChild2) {
      this.setState({child2: newChild2}, () => this._updateRoom());
    }
  }

  render() {
    const { classes } = this.props;
    return(
      <Grid container spacing={8} className={classes.root}>
        <Grid item xs={12} >{'Room ' + this.props.roomId}</Grid>
        <Grid item xs={3}>
          <FormControl style={{minWidth: 90}}>
            <InputLabel>No of Adult</InputLabel>
            <Select
              value={this.state.adult}
              inputProps={{
                name: 'rooms',
                id: 'rooms',
              }}
              onChange={this._adultChange}
              fullWidth
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl style={{minWidth: 110}}>
            <InputLabel>No of Children</InputLabel>
            <Select
              value={this.state.children}
              inputProps={{
                name: 'rooms',
                id: 'rooms',
              }}
              onChange={this._childrenChange}
              fullWidth
            >
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        { this.state.children > 0 && 
          <Grid item xs={3} >
            <FormControl style={{minWidth: 100}}>
              <InputLabel>Child 1 - Age</InputLabel>
              <Select
                value={this.state.child1}
                onChange={this._child1Change}
                fullWidth
              >
                <MenuItem value={0}>{'0 - 1'}</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={11}>11</MenuItem>
                <MenuItem value={12}>12</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        }
        { this.state.children > 1 && 
          <Grid item xs={3} >
            <FormControl style={{minWidth: 100}}>
              <InputLabel>Child 2 - Age</InputLabel>
              <Select
                value={this.state.child2}
                onChange={this._child2Change}
                fullWidth
              >
                <MenuItem value={0}>{'0 - 1'}</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={11}>11</MenuItem>
                <MenuItem value={12}>12</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        }
      </Grid>
    );
  }
}

export default withStyles(styles)(NewBookRoom);