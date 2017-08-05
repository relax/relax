import {processFVD} from 'helpers/utils';
import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './font.less';

export default class Font extends Component {
  static propTypes = {
    input: PropTypes.bool,
    style: PropTypes.object,
    family: PropTypes.string,
    fvd: PropTypes.string,
    onChange: PropTypes.func,
    text: PropTypes.string
  };

  render () {
    const style = Object.assign({}, this.props.style);
    style.fontFamily = this.props.family;
    processFVD(style, this.props.fvd);

    return (
      <div
        className={styles.font}
        style={style}
      >
        {this.props.text}
      </div>
    );
  }
}
