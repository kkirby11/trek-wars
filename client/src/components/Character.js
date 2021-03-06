import axios from 'axios';
import React, { Component } from 'react';
import { List, Button, Input } from 'semantic-ui-react';

class Character extends Component {
  state = { editing: false, name: this.props.character.name };

  toggleEdit = () => {
    if(this.editing)
      this.setState({ name: this.props.character.name});
      this.setState({ editing: !this.state.editing });
  }

  editCharacter = () => {
    let id = this.props.character.id
    axios.put(`/api/characters/${id}`, { character: { name: this.state.name } })
      .then( res => {
        this.setState({name: res.data.name})
        this.toggleEdit();
      })
      .catch( res => {
        console.log(res)
      });
  }

  deleteCharacter = () => {
    let id = this.props.character.id
    axios.delete(`/api/characters/${id}/`, { character: { name: this.state.name} })
    .then( res => {
      this.toggleEdit();
      //do it the wrong way first
      this.props.resetCharacters(id)
    })
    .catch( res => {
      console.log('no')
    })
  }

  cancelEdit = () => {
    this.setState({editing: false, name: this.props.character.name})
  }

  handleChange = (e) => {
    this.setState({ name: e.target.value});
  }

  render() {
    if(this.state.editing)
      return(
        <List.Item>
          <Input type='text' defaultValue={this.state.name} onChange={this.handleChange} />
          <Button onClick={ this.cancelEdit }>Cancel</Button>
          <Button primary onClick={ this.editCharacter }>Save</Button>
          <Button color="red" onClick={ this.deleteCharacter }>Delete</Button>
        </List.Item>
      );
    else
      return(
        <List.Item onClick={ this.toggleEdit }>
          {this.state.name}
        </List.Item>
      );
  }
}

export default Character;
