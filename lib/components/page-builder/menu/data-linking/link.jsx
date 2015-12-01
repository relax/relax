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
    linkIndex: PropTypes.number.isRequired,
    prefix: PropTypes.string.isRequired
  }

  getInitState () {
    const {linkedElement, pageBuilder, property} = this.props;
    return getSchemaLinkActions(pageBuilder, linkedElement, property);
  }

  onActionChange (value) {
    const {pageBuilder, pageBuilderActions, property, linkIndex, prefix} = this.props;
    const {linkingDataElementId} = pageBuilder;
    const {elementChangeSchemaLinkAction} = pageBuilderActions;
    elementChangeSchemaLinkAction(linkingDataElementId, prefix + property.id, this.props.linkIndex, value);
  }

  onRemove () {
    const {pageBuilder, pageBuilderActions, property, linkIndex, prefix} = this.props;
    const {linkingDataElementId} = pageBuilder;
    const {elementRemoveSchemaLink} = pageBuilderActions;
    elementRemoveSchemaLink(linkingDataElementId, prefix + property.id, this.props.linkIndex);
  }

  onMouseOver () {
    this.props.pageBuilderActions.overElement(this.props.link.elementId);
  }

  onMouseOut () {
    this.props.pageBuilderActions.outElement(this.props.link.elementId);
  }

  render () {
    return (
      <div className='property-link' onMouseOver={::this.onMouseOver} onMouseOut={::this.onMouseOut}>
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
