import cx from 'classnames';
import utils from 'helpers/utils';
import Component from 'components/component';
import React, {PropTypes} from 'react';

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
    utils.processFVD(style, fvd);

    return (
      <div className={cx(styles.root, styles[display])}>
        <div className={styles.text} style={style}>{text}</div>
        <div className={styles.info}>
          <div className={styles.title}>{utils.filterFontFamily(family)}</div>
          <div className={styles.value}>{utils.filterFVD(fvd)}</div>
        </div>
      </div>
    );
  }
}
