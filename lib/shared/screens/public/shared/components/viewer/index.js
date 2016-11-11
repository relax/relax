import * as stylesMapActions from 'actions/styles-map';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Element from './element';
import ElementText from './element-text';
import Viewer from './viewer';

@connect(
  (state) => ({
    styles: state.styles
  }),
  (dispatch) => bindActionCreators(stylesMapActions, dispatch)
)
export default class ViewerContainer extends Component {
  static propTypes = {
    doc: PropTypes.object,
    template: PropTypes.object,
    styles: PropTypes.array,
    type: PropTypes.string.isRequired,
    updateStylesMap: PropTypes.func.isRequired
  };

  static childContextTypes = {
    Element: PropTypes.func.isRequired,
    ElementText: PropTypes.func.isRequired
  };

  getChildContext () {
    return {
      Element,
      ElementText
    };
  }

  render () {
    const {doc, template, styles, type, updateStylesMap} = this.props;

    return (
      <Viewer
        styles={styles}
        doc={doc}
        type={type}
        template={template}
        updateStylesMap={updateStylesMap}
      />
    );
  }
}
