import Combobox from 'components/input-options/combobox';
import Component from 'components/component';
import bind from 'decorators/bind';
import getElement from 'helpers/page-builder/get-element';
import getSchemaLinkActions from 'helpers/page-builder/schema-link-actions';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import styles from './property-link.less';

@connect(
  (state, props) => ({
    linkedElement: getElement({
      state: state.pageBuilder,
      id: props.link.elementId,
      context: props.context
    })
  })
)
export default class PropertyLink extends Component {
  static propTypes = {
    prefix: PropTypes.string.isRequired,
    link: PropTypes.object.isRequired,
    property: PropTypes.object.isRequired,
    context: PropTypes.object.isRequired,
    linkedElement: PropTypes.object.isRequired,
    changeLinkAction: PropTypes.func.isRequired,
    removeLink: PropTypes.func.isRequired,
    overLink: PropTypes.func.isRequired,
    outLink: PropTypes.func.isRequired,
    goal: PropTypes.string.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  getInitState () {
    const {property, linkedElement, goal} = this.props;

    return getSchemaLinkActions(
      linkedElement,
      property,
      goal
    );
  }

  @bind
  onActionChange (value) {
    const {changeLinkAction, link} = this.props;
    changeLinkAction({
      linkElementId: link.elementId,
      index: link.index,
      value
    });
  }

  @bind
  onRemove () {
    const {removeLink, link} = this.props;
    removeLink({
      linkElementId: link.elementId,
      index: link.index
    });
  }

  @bind
  onMouseOver () {
    const {overLink, link} = this.props;
    overLink(link);
  }

  @bind
  onMouseOut () {
    const {outLink, link} = this.props;
    outLink(link);
  }

  render () {
    const {link, linkedElement} = this.props;
    const {values, labels} = this.state;

    return (
      <div
        className={styles.root}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
      >
        <div className={styles.info}>
          <span>
            {linkedElement && (linkedElement.label || linkedElement.tag)}
          </span>
          <span className={styles.remove} onClick={this.onRemove}>
            <i className='nc-icon-mini ui-1_simple-remove' />
            <span>Remove</span>
          </span>
        </div>
        <Combobox
          values={values}
          labels={labels}
          value={link.action}
          onChange={this.onActionChange}
        />
      </div>
    );
  }
}
