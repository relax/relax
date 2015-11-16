import cx from 'classnames';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import getSchemaLinkActions from '../../../../helpers/schema-link-actions';
import Link from './link';
import LinkLine from '../../../link-line';

export default class Property extends Component {
  static propTypes = {
    property: PropTypes.object.isRequired,
    addOverlay: PropTypes.func.isRequired,
    closeOverlay: PropTypes.func.isRequired,
    links: PropTypes.array.isRequired,
    pageBuilder: PropTypes.object.isRequired,
    pageBuilderActions: PropTypes.object.isRequired,
    prefix: PropTypes.string.isRequired
  }

  onMouseDown (event) {
    if (event.button === 0) {
      event.preventDefault();
      event.stopPropagation();
      this.props.addOverlay('linking-line', (
        <LinkLine
          anchor={this.refs.anchor}
          mouseX={event.pageX}
          mouseY={event.pageY}
          onMouseUp={::this.onMouseUp}
        />
    ), false);
    }
  }

  onMouseUp () {
    const {closeOverlay, pageBuilder, pageBuilderActions, property, prefix} = this.props;
    const {linkingDataElementId, overedId, data} = pageBuilder;
    const {elementAddSchemaLink} = pageBuilderActions;
    closeOverlay('linking-line');

    if (overedId && data[overedId]) {
      const actions = getSchemaLinkActions(pageBuilder, data[overedId], property);
      elementAddSchemaLink(linkingDataElementId, prefix + property.id, overedId, actions.values[0]);
    }
  }

  render () {
    const hasLinks = this.props.links.length > 0;
    return (
      <div className='property'>
        <div className='property-info'>
          <span className={cx('status', hasLinks && 'linked')} onMouseDown={::this.onMouseDown} ref='anchor'></span>
          <span className='title'>{this.props.property.title || this.props.property.id}</span>
          <span className='type'>{this.props.property.type}</span>
        </div>
        {this.renderLinks()}
      </div>
    );
  }

  renderLinks () {
    if (this.props.links.length > 0) {
      return (
        <div className='property-links'>
          {this.props.links.map(this.renderLink, this)}
        </div>
      );
    }
  }

  renderLink (link, key) {
    const linkedElement = this.props.pageBuilder.data[link.elementId];
    if (linkedElement) {
      return (
        <Link
          key={link.id}
          prefix={this.props.prefix}
          linkIndex={key}
          link={link}
          linkedElement={linkedElement}
          property={this.props.property}
          pageBuilder={this.props.pageBuilder}
          pageBuilderActions={this.props.pageBuilderActions}
        />
      );
    }
  }
}
