import Component from 'components/component';
import React, {PropTypes} from 'react';
import {selectElement, overElement, outElement} from 'actions/page-builder';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Element from './element';

@connect(
  (state) => ({
    editing: state.pageBuilder.editing,
    overedId: state.pageBuilder.overedId,
    selectedId: state.pageBuilder.selectedId,
    display: state.display,
    dragging: state.dnd.dragging
  }),
  (dispatch) => bindActionCreators({
    selectElement,
    overElement,
    outElement
  }, dispatch)
)
export default class ElementContainer extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    element: PropTypes.object.isRequired,
    editing: PropTypes.bool.isRequired,
    overedId: PropTypes.string.isRequired,
    selectedId: PropTypes.string.isRequired
  };

  getInitState () {
    const {element} = this.props;
    return {
      animation: element.animation && element.animation.use,
      animated: false,
      animatedEditing: false
    };
  }

  componentWillReceiveProps (nextProps) {
    const {editing, element} = this.props;
    if (editing && this.state.animation !== (element.animation && element.animation.use)) {
      this.setState({
        animation: element.animation && element.animation.use
      });
    }
  }

  render () {
    const {overedId, selectedId, element} = this.props;
    return (
      <Element
        {...this.props}
        {...this.state}
        selected={selectedId === element.id}
        overed={overedId === element.id}
      >
        {this.props.children}
      </Element>
    );
  }
}
