import bind from 'decorators/bind';
import getSchemaLinkActions from 'helpers/schema-link-actions';
import Combobox from 'components/input-options/combobox';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import styles from './property-link.less';

@connect(
  (state, props) => ({
    linkingDataElement: state.pageBuilder.data[props.linkingDataElementId],
    linkedElement: state.pageBuilder.data[props.link.elementId]
  })
)
export default class PropertyLink extends Component {
  static propTypes = {
    prefix: PropTypes.string.isRequired,
    linkIndex: PropTypes.number.isRequired,
    link: PropTypes.object.isRequired,
    property: PropTypes.object.isRequired,
    pageBuilderActions: PropTypes.object.isRequired,
    linkingDataElement: PropTypes.object.isRequired,
    linkedElement: PropTypes.object.isRequired,
    linkingDataElementId: PropTypes.string.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  getInitState () {
    const {store} = this.context;
    const {property, linkedElement} = this.props;
    const pageBuilder = store.getState().pageBuilder;

    return getSchemaLinkActions(
      pageBuilder,
      linkedElement,
      property
    );
  }

  @bind
  onActionChange (value) {
    const {pageBuilderActions, linkingDataElementId, prefix, property, linkIndex} = this.props;
    pageBuilderActions.elementChangeSchemaLinkAction(
      linkingDataElementId,
      prefix + property.id,
      linkIndex,
      value
    );
  }

  @bind
  onRemove () {
    const {pageBuilderActions, linkingDataElementId, prefix, property, linkIndex} = this.props;
    pageBuilderActions.elementRemoveSchemaLink(
      linkingDataElementId,
      prefix + property.id,
      linkIndex
    );
  }

  @bind
  onMouseOver () {
    const {pageBuilderActions, link} = this.props;
    pageBuilderActions.overElement(link.elementId);
  }

  @bind
  onMouseOut () {
    const {pageBuilderActions, link} = this.props;
    pageBuilderActions.outElement(link.elementId);
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
