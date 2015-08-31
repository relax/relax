import {Component} from 'relax-framework';
import React from 'react';
import Input from '../input';

import stylesActions from '../../client/actions/style';

export default class Edit extends Component {
  getInitialState () {
    return {
      editing: this.props.editing
    };
  }

  submit (event) {
    event.preventDefault();

    if (this.state.editing._id) {
      stylesActions
        .update(this.state.editing)
        .then(() => this.props.onClose());
    } else {
      stylesActions
        .add(this.state.editing)
        .then(() => this.props.onClose());
    }
  }

  cancel (event) {
    event.preventDefault();
    this.props.onClose();
  }

  onValueChange (id, value) {
    this.state.editing.options[id] = value;
    this.setState({
      editing: this.state.editing
    });
    this.props.onChange(this.state.editing);
  }

  onTitleChange (value) {
    this.state.editing.title = value;
    this.setState({
      editing: this.state.editing
    });
  }

  render () {
    return (
      <div className='style-options-group'>
        <div className='option'>
          <div className='label'>Style Title</div>
          <Input onChange={this.onTitleChange.bind(this)} value={this.state.editing.title} />
        </div>
        <this.props.OptionsList options={this.props.options} values={this.state.editing.options} onChange={this.onValueChange.bind(this)} />
        <a href='#' className='button button-primary' onClick={this.submit.bind(this)}>
          {this.state.editing._id ? 'Change' : 'Submit'}
        </a>
        <a href='#' className='button button-grey' onClick={this.cancel.bind(this)}>Cancel</a>
      </div>
    );
  }
}

Edit.propTypes = {
  OptionsList: React.PropTypes.any.isRequired,
  options: React.PropTypes.array.isRequired,
  onClose: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  editing: React.PropTypes.object.isRequired
};
