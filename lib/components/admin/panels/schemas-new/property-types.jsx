import React from 'react';
import {Component} from 'relax-framework';
import {schemaTypes} from '../../../../data-types';
import cx from 'classnames';

export default class PropertyTypes extends Component {
  onClick (type) {
    this.props.onChange(type);
  }

  renderType (type, index) {
    return (
      <div className={cx('type', this.props.value === type && 'active')} onClick={this.onClick.bind(this, type)} key={index}>{type}</div>
    );
  }

  renderColumn (data, index) {
    return (
      <div className='column' key={index}>
        <div className='label'>{data.label}</div>
        {data.types.map(this.renderType, this)}
      </div>
    );
  }

  render () {
    return (
      <div className='property-types'>
        {schemaTypes.map(this.renderColumn, this)}
      </div>
    );
  }
}

PropertyTypes.propTypes = {
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired
};
