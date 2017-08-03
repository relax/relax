import Component from 'components/component';
import ContentEmpty from 'components/content-empty';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './content.less';
import New from './new';

export default class Content extends Component {
  static propTypes = {
    children: PropTypes.node,
    count: PropTypes.number
  };

  render () {
    let result;

    if (this.props.count === 0) {
      result = this.renderNoMenus();
    } else if (this.props.children) {
      result = this.props.children;
    } else {
      result = this.renderEmpty();
    }

    return result;
  }

  renderEmpty () {
    return (
      <ContentEmpty name='menu' />
    );
  }

  renderNoMenus () {
    return (
      <div className={styles.noMenus}>
        <div className={styles.noTitle}>Create your first menu</div>
        <New />
      </div>
    );
  }
}
