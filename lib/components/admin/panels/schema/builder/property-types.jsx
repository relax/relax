import cx from 'classnames';
import React from 'react';
import {Component} from 'relax-framework';

import {schemaTypesOrdered} from '../../../../../data-types';

export default class PropertyTypes extends Component {
  static propTypes = {
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
  }

  getInitialState () {
    return {
      expanded: false
    };
  }

  onClick (type) {
    this.props.onChange(type);
  }

  toggleMore () {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  render () {
    return (
      <div className='property-types'>
        {schemaTypesOrdered.common.map(this.renderType, this)}
        {this.renderExpanded()}
      </div>
    );
  }

  renderExpanded () {
    let result;
    if (this.state.expanded) {
      result = (
        <div className='advanced-types'>
          <div className='toggle-more' key='toggle-more' onClick={this.toggleMore.bind(this)}>
            <span>Hide advanced options</span>
            <i className='material-icons'>expand_more</i>
          </div>
          {schemaTypesOrdered.more.map(this.renderType, this)}
        </div>
      );
    } else {
      result = (
        <div className='toggle-more' onClick={this.toggleMore.bind(this)}>
          <span>Show advanced options</span>
          <i className='material-icons'>expand_less</i>
        </div>
      );
    }
    return result;
  }

  renderType (type, index) {
    return (
      <div className={cx('type', this.props.value === type && 'active')} onClick={this.onClick.bind(this, type)} key={type}>{type}</div>
    );
  }
}
