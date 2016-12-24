import A from 'components/a';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './back.less';

export default class Back extends Component {
  static propTypes = {
    link: PropTypes.string.isRequired
  };

  static defaultProps = {
    link: '#'
  };

  render () {
    return (
      <A href={this.props.link} className={styles.root}>
        <img src='/images/admin/logo@2x.png' className={styles.logo} role='presentation' />
        <img src='/images/admin/relax@2x.png' className={styles.lettering} role='presentation' />
      </A>
    );
  }
}
