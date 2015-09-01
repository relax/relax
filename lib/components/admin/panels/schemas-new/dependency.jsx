import React from 'react';
import {Component} from 'relax-framework';
import forEach from 'lodash.foreach';

import Combobox from '../../../combobox';
import Input from '../../../input';

export default class Dependency extends Component {
  onChange (key, value) {
    this.props.onChange(this.props.id, key, value);
  }

  onRemove () {
    this.props.onRemove(this.props.id);
  }

  render () {
    let propertiesLabels = [];
    let propertiesValues = [];

    forEach(this.context.properties, property => {
      if (this.context.selected.id !== property.id) {
        propertiesLabels.push(property.title);
        propertiesValues.push(property.id);
      }
    });

    return (
      <div className='dependency'>
        <span>Property</span>
        <div className='option'>
          <Combobox
            labels={propertiesLabels}
            values={propertiesValues}
            onChange={this.onChange.bind(this, 'id')}
            value={this.props.dependency.id}
          />
        </div>
        <span>must be</span>
        <div className='option'>
          <Input type='text' value={this.props.dependency.value} onChange={this.onChange.bind(this, 'value')} />
        </div>
        <div className='remove-dependency' onClick={this.onRemove.bind(this)}>
          <i className='material-icons'>delete</i>
        </div>
      </div>
    );
  }
}

Dependency.propTypes = {
  dependency: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onRemove: React.PropTypes.func.isRequired
};

Dependency.contextTypes = {
  selected: React.PropTypes.object.isRequired,
  properties: React.PropTypes.array.isRequired
};
