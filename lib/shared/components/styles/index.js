import stylesManager from 'helpers/styles-manager';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Component as Jss} from 'relax-jss';

import Styles from './styles';

@connect(
  (state) => ({
    styles: state.stylesMap
  })
)
export default class StylesContainer extends Component {
  static propTypes = {
    styles: PropTypes.object.isRequired,
    single: PropTypes.func.isRequired
  };

  render () {
    const {styles, single} = this.props;
    let result;

    if (single) {
      result = (
        <Jss stylesheet={stylesManager.singleStylesheet} />
      );
    } else {
      result = (
        <Styles styles={styles} />
      );
    }

    return result;
  }
}
