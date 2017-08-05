import * as pageBuilderActions from 'actions/page-builder';
import * as stylesMapActions from 'actions/styles-map';
import Component from 'components/component';
import bind from 'decorators/bind';
import stylesManager from 'helpers/styles-manager';
import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Canvas from './canvas.jsx';

@connect(
  (state) => ({
    display: state.display,
    editing: state.pageBuilder.editing,
    building: !!(state.router.location.query.build)
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
    updateStylesMap: PropTypes.func.isRequired,
    editing: PropTypes.bool.isRequired,
    building: PropTypes.bool.isRequired
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
      type,
      editing,
      building
    } = this.props;

    return (
      <Canvas
        display={display}
        template={template}
        type={type}
        editing={editing}
        building={building}
        updateStylesMap={this.updateStylesMap}
      />
    );
  }
}
