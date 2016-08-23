import isElementSelected from 'helpers/is-element-selected';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {selectElement, overElement, outElement} from 'actions/page-builder';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Element from './element';

@connect(
  (state, props) => {
    const {pageBuilder} = state;
    const building = state.router.location.query.build && true;
    const dragging = state.dnd.dragging;
    const elem = {
      id: props.element.id,
      context: props.context
    };
    const selected = building && !props.disableSelection && isElementSelected(pageBuilder.selected, elem);
    const overed = building && !props.disableSelection && isElementSelected(pageBuilder.overed, elem);
    const focused = isElementSelected(pageBuilder.focused, elem);
    const linkingDataMode = pageBuilder.menuTab === 'link';
    const isHighlightable = (
      building && state.pageBuilder.editing && !dragging && (
        (props.elementLinks && props.elementLinks.length) ||
        props.editing && (focused || selected || overed)
      )
    );

    return {
      overed,
      selected,
      display: state.display,
      dragging,
      isHighlightable,
      building,
      focused,
      linkingDataMode
    };
  },
  (dispatch) => bindActionCreators({
    selectElement,
    overElement,
    outElement
  }, dispatch)
)
export default class ElementContainer extends Component {
  static propTypes = {
    children: PropTypes.node,
    element: PropTypes.object.isRequired,
    editing: PropTypes.bool.isRequired,
    overed: PropTypes.bool,
    selected: PropTypes.bool,
    building: PropTypes.bool,
    disableSelection: PropTypes.bool,
    linkingDataMode: PropTypes.bool,
    elementLinks: PropTypes.array
  };

  render () {
    const {element} = this.props;

    return (
      <Element
        {...this.props}
        hasAnimation={element.animation && element.animation.use}
      >
        {this.props.children}
      </Element>
    );
  }
}
