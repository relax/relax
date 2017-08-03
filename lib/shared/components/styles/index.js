import Component from 'components/component';
import stylesManager from 'helpers/styles-manager';
import React from 'react';
import PropTypes from 'prop-types';
import {Component as Jss} from 'relax-jss';
import {connect} from 'react-redux';

import Styles from './styles';

@connect(
  (state) => ({
    styles: state.stylesMap
  })
)
export default class StylesContainer extends Component {
  static propTypes = {
    styles: PropTypes.object.isRequired,
    single: PropTypes.bool
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
