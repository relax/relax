import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import Entry from './entry';
import Input from '../../../../../data-types/input';

export default class Builder extends Component {
  static propTypes = {
    dnd: PropTypes.object.isRequired,
    dndActions: PropTypes.object.isRequired
  }

  getInitState () {
    return {
      label: '',
      link: ''
    };
  }

  onChange (key, value) {
    this.setState({
      [key]: value
    });
  }

  render () {
    const customEntry = {
      type: 'link',
      link: {
        label: this.state.label,
        url: this.state.link
      }
    };

    return (
      <div className='custom'>
        <div className='option'>
          <div className='label'>Label</div>
          <Input value={this.state.label} onChange={this.onChange.bind(this, 'label')} />
        </div>
        <div className='option'>
          <div className='label'>Link</div>
          <Input value={this.state.link} onChange={this.onChange.bind(this, 'link')} />
        </div>
        <Entry entry={customEntry} dnd={this.props.dnd} dndActions={this.props.dndActions} />
      </div>
    );
  }
}
