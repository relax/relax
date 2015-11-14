import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import getSchemaLinkActions from '../../../../helpers/schema-link-actions';
import Combobox from '../../../data-types/combobox';

export default class Link extends Component {
  static propTypes = {
    link: PropTypes.object.isRequired,
    linkedElement: PropTypes.object.isRequired,
    pageBuilder: PropTypes.object.isRequired,
    pageBuilderActions: PropTypes.object.isRequired,
    property: PropTypes.object.isRequired,
    linkIndex: PropTypes.number.isRequired
  }

  getInitialState () {
    const {linkedElement, pageBuilder, property} = this.props;
    return getSchemaLinkActions(pageBuilder, linkedElement, property);
  }

  onActionChange (value) {

  }

  onRemove () {
    const {pageBuilder, pageBuilderActions, property, linkIndex} = this.props;
    const {linkingDataElementId} = pageBuilder;
    const {elementRemoveSchemaLink} = pageBuilderActions;
    elementRemoveSchemaLink(linkingDataElementId, property.id, this.props.linkIndex);
  }

  render () {
    return (
      <div className='property-link'>
        <div className='link-info'>
          <span>{this.props.linkedElement.label || this.props.linkedElement.tag}</span>
          <span className='remove-link' onClick={::this.onRemove}>
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
