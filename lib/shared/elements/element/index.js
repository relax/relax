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
    dragging: state.dnd.dragging,
    building: state.router.location.query.build && true
  }),
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
    overedId: PropTypes.string,
    selectedId: PropTypes.string,
    building: PropTypes.bool
  };

  getInitState () {
    const {element} = this.props;
    return {
      animation: element.animation && element.animation.use,
      animated: false,
      animatedEditing: false
    };
  }

  componentWillReceiveProps () {
    const {editing, element} = this.props;
    if (editing && this.state.animation !== (element.animation && element.animation.use)) {
      this.setState({
        animation: element.animation && element.animation.use
      });
    }
  }

  startAnimation () {
    this.setState({
      animated: true,
      animatedEditing: false
    });
  }

  resetAnimation () {
    this.setState({
      animated: false,
      animatedEditing: true
    });
  }

  render () {
    const {overedId, selectedId, element, building} = this.props;
    return (
      <Element
        {...this.props}
        {...this.state}
        selected={building && selectedId === element.id}
        overed={building && overedId === element.id}
        startAnimation={::this.startAnimation}
        resetAnimation={::this.resetAnimation}
      >
        {this.props.children}
      </Element>
    );
  }
}
