import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import getSchemaLinkActions from '../../../../helpers/schema-link-actions';
import Combobox from '../../../data-types/combobox';

export default class Link extends Component {
  static propTypes = {
    link: PropTypes.object.isRequired,
    linkedElement: PropTypes.object.isRequired,
    pageBuilder: PropTypes.object.isRequired,
    property: PropTypes.object.isRequired
  }

  getInitialState () {
    const {linkedElement, pageBuilder, property} = this.props;
    return getSchemaLinkActions(pageBuilder, linkedElement, property);
  }

  onActionChange (value) {

  }

  render () {
    return (
      <div className='property-link'>
        <div className='link-info'>
          <span>{this.props.linkedElement.label || this.props.linkedElement.tag}</span>
          <span className='remove-link'>
            <i className='material-icons'>close</i>
            <span>Remove</span>
          </span>
        </div>
        <Combobox
          values={this.state.values}
          labels={this.state.labels}
          value={this.props.link.action}
          onChange={::this.onActionChange}
        />
      </div>
    );
  }
}
