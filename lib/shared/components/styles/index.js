import Component from 'components/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import Styles from './styles';

@connect(
  (state) => ({
    styles: state.stylesMap
  })
)
export default class StylesContainer extends Component {
  static propTypes = {
    styles: PropTypes.object.isRequired
  };

  render () {
    const {styles} = this.props;

    return (
      <Styles styles={styles} />
    );
  }
}
