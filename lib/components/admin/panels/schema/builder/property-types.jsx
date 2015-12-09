import cx from 'classnames';
import React from 'react';
import {Component} from 'relax-framework';

import {schemaTypesOrdered} from '../../../../../data-types';

export default class PropertyTypes extends Component {
  static propTypes = {
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
  }

  onClick (type) {
    this.props.onChange(type);
  }

  render () {
    return (
      <div className='property-types'>
        {schemaTypesOrdered.map(this.renderType, this)}
      </div>
    );
  }

  renderType (type, index) {
    return (
      <div className={cx('type', this.props.value === type && 'active')} onClick={this.onClick.bind(this, type)} key={type}>{type}</div>
    );
  }
}
