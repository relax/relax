import React from 'react';
import {Component} from 'relax-framework';
import cx from 'classnames';
import clone from 'lodash.clone';

import Dependency from './dependency';

export default class Dependencies extends Component {
  onAdd () {
    let cloned = clone(this.props.dependencies);

    cloned.push({
      id: '',
      value: ''
    });

    this.props.onChange(cloned);
  }

  onDependencyRemove (id) {
    let cloned = clone(this.props.dependencies);
    cloned.splice(id, 1);
    this.props.onChange(cloned);
  }

  onDependencyChange (id, key, value) {
    let cloned = clone(this.props.dependencies);
    cloned[id][key] = value;
    this.props.onChange(cloned);
  }

  renderDependency (dependency, index) {
    return (
      <Dependency
        dependency={dependency}
        onRemove={this.onDependencyRemove.bind(this)}
        onChange={this.onDependencyChange.bind(this)}
        id={index}
        key={index}
      />
    );
  }

  render () {
    return (
      <div className='dependencies'>
        <div className='dependencies-list'>
          {this.props.dependencies.map(this.renderDependency, this)}
        </div>
        <div className='add-dependency' onClick={this.onAdd.bind(this)}>
          <i className='material-icons'>add</i>
          <span>Add dependency</span>
        </div>
      </div>
    );
  }
}

Dependencies.propTypes = {
  dependencies: React.PropTypes.array.isRequired,
  onChange: React.PropTypes.func.isRequired
};
