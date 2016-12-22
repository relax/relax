import * as pageBuilderActions from 'actions/page-builder';
import * as stylesMapActions from 'actions/styles-map';
import Component from 'components/component';
import bind from 'decorators/bind';
import stylesManager from 'helpers/styles-manager';
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Canvas from './new-canvas.jsx';

@connect(
  (state) => ({
    display: state.display
  }),
  (dispatch) => ({
    pageBuilderActions: bindActionCreators(pageBuilderActions, dispatch),
    ...bindActionCreators(stylesMapActions, dispatch)
  })
)
export default class CanvasContainer extends Component {
  static propTypes = {
    display: PropTypes.string.isRequired,
    template: PropTypes.object,
    type: PropTypes.string.isRequired,
    updateStylesMap: PropTypes.func.isRequired
  };

  @bind
  updateStylesMap () {
    if (!this.updateTimeout) {
      this.updateTimeout = setTimeout(this.updateStyles, 10);
    }
  }

  @bind
  updateStyles () {
    this.props.updateStylesMap(stylesManager.stylesMap);
    this.updateTimeout = 0;
  }

  render () {
    const {
      display,
      template,
      type
    } = this.props;

    return (
      <Canvas
        display={display}
        template={template}
        type={type}
        updateStylesMap={this.updateStylesMap}
      />
    );
  }
}
