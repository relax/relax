import cx from 'classnames';
import {filterFontFamily, processFVD, filterFVD} from 'helpers/utils';
import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './entry.less';

export default class Entry extends Component {
  static propTypes = {
    family: PropTypes.string.isRequired,
    fvd: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    display: PropTypes.oneOf(['grid', 'list']).isRequired
  };

  render () {
    const {family, fvd, text, display} = this.props;
    const style = {
      fontFamily: family
    };
    processFVD(style, fvd);

    return (
      <div className={cx(styles.root, styles[display])}>
        <div className={styles.text} style={style}>{text}</div>
        <div className={styles.info}>
          <div className={styles.title}>{filterFontFamily(family)}</div>
          <div className={styles.value}>{filterFVD(fvd)}</div>
        </div>
      </div>
    );
  }
}
