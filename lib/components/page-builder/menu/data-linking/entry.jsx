import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

export default class Entry extends Component {
  static fragments = {
    schema: {
      _id: 1,
      title: 1
    }
  }

  static propTypes = {
    schema: PropTypes.object.isRequired,
    changeSchema: PropTypes.func.isRequired
  }

  onClick () {
    this.props.changeSchema(this.props.schema._id);
  }

  render () {
    return (
      <div className='schema-item' onClick={::this.onClick}>
        {this.props.schema.title}
      </div>
    );
  }
}
