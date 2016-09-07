import * as stylesMapActions from 'actions/styles-map';

import Component from 'components/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

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
