import * as stylesMapActions from 'actions/styles-map';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import bind from 'decorators/bind';
import forEach from 'lodash/forEach';
import Element from './element';
import ElementText from './element-text';
import Viewer from './viewer';
import displays from 'statics/displays';

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

  getInitState () {
    return {
      display: 'desktop',
      ready: false
    };
  }

  getChildContext () {
    return {
      Element,
      ElementText
    };
  }

  componentDidMount () {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  }

  @bind
  onResize () {
    const width = window.outerWidth;

    let display = 'desktop';
    let amount = 99999;

    forEach(displays, (value, key) => {
      const dif = value - width;
      if (width < value && dif < amount) {
        amount = dif;
        display = key;
      }
    });

    this.setState({
      display,
      ready: true
    });
  }

  render () {
    const {doc, template, styles, type, updateStylesMap} = this.props;
    const {display, ready} = this.state;

    return (
      <Viewer
        display={display}
        ready={ready}
        styles={styles}
        doc={doc}
        type={type}
        template={template}
        updateStylesMap={updateStylesMap}
      />
    );
  }
}
