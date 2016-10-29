import Component from 'components/component';
import isElementSelected from 'helpers/is-element-selected';
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {outElement, overElement, selectElement} from 'actions/page-builder';

import Element from './element';

@connect(
  (state, props) => {
    const {element, settings, disableSelection, isTemplate} = props;
    const {pageBuilder} = state;
    const {editing} = pageBuilder;

    const building = state.router.location.query.build && true;
    const dragging = state.dnd.dragging;

    const elem = {
      id: element.id,
      context: props.context
    };

    const selected = !!(building && !disableSelection && isElementSelected(pageBuilder.selected, elem));
    const overed = !!(building && !disableSelection && isElementSelected(pageBuilder.overed, elem));
    const focused = isElementSelected(pageBuilder.focused, elem);
    const linkingDataMode = pageBuilder.menuTab === 'link';
    const isHighlightable = !!(
      building && editing && !dragging && (
        (props.elementLinks && props.elementLinks.length) ||
        props.editing && (focused || selected || overed)
      )
    );
    const isDraggable =
      editing &&
      settings.drag &&
      !isTemplate &&
      !disableSelection &&
      !(selected && settings.drag.dragSelected === false);

    return {
      overed,
      selected,
      display: state.display,
      dragging,
      isHighlightable,
      isDraggable,
      building,
      focused,
      linkingDataMode,
      isTemplate
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
