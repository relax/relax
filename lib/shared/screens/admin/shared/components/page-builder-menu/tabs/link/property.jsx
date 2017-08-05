import Component from 'components/component';
import bind from 'decorators/bind';
import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import LinkLine from './link-line';
import PropertyLink from './property-link';
import styles from './property.less';

export default class LinkingDataProperty extends Component {
  static propTypes = {
    property: PropTypes.object.isRequired,
    links: PropTypes.array.isRequired,
    prefix: PropTypes.string.isRequired,
    addSchemaLink: PropTypes.func.isRequired,
    changeLinkAction: PropTypes.func.isRequired,
    removeLink: PropTypes.func.isRequired,
    overLink: PropTypes.func.isRequired,
    outLink: PropTypes.func.isRequired,
    context: PropTypes.object.isRequired,
    goal: PropTypes.string.isRequired
  };

  getInitState () {
    return {
      linking: false
    };
  }

  @bind
  onMouseDown (event) {
    if (event.button === 0) {
      event.preventDefault();
      event.stopPropagation();

      this.linkingData = {
        mouseX: event.pageX,
        mouseY: event.pageY
      };

      this.setState({
        linking: true
      });
    }
  }

  @bind
  onMouseUp () {
    const {addSchemaLink, prefix, property} = this.props;

    addSchemaLink({
      property,
      prefix
    });

    this.setState({
      linking: false
    });
  }

  render () {
    const {links, property} = this.props;

    return (
      <div className={styles.root}>
        <div className={styles.property}>
          <span
            className={cx(styles.status, links.length && styles.linked)}
            onMouseDown={this.onMouseDown}
            ref='anchor'
          />
          <span className={styles.title}>
            {property.title || property.label || property.id}
          </span>
          <span className={styles.type}>
            {property.type}
          </span>
        </div>
        {this.renderLinks()}
        {this.renderLinking()}
      </div>
    );
  }

  renderLinks () {
    const {links} = this.props;

    if (links.length) {
      return (
        <div className={styles.links}>
          {links.map(this.renderLink, this)}
        </div>
      );
    }
  }

  renderLink (link, key) {
    const {
      prefix,
      property,
      changeLinkAction,
      removeLink,
      overLink,
      outLink,
      context,
      goal
    } = this.props;

    return (
      <PropertyLink
        key={key}
        prefix={prefix}
        link={link}
        property={property}
        changeLinkAction={changeLinkAction}
        removeLink={removeLink}
        overLink={overLink}
        outLink={outLink}
        context={context}
        goal={goal}
      />
    );
  }

  renderLinking () {
    const {linking} = this.state;

    if (linking) {
      return (
        <LinkLine
          anchor={this.refs.anchor}
          onMouseUp={this.onMouseUp}
          {...this.linkingData}
        />
      );
    }
  }
}
