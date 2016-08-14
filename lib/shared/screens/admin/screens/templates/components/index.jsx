import Component from 'components/component';
import ContentEmpty from 'components/content-empty';
import New from 'components/new-template';
import React, {PropTypes} from 'react';

import styles from './index.less';

export default class Templates extends Component {
  static propTypes = {
    children: PropTypes.node,
    count: PropTypes.number.isRequired
  };

  render () {
    let result;

    if (this.props.count === 0) {
      result = this.renderNoTemplates();
    } else if (this.props.children) {
      result = this.props.children;
    } else {
      result = this.renderEmpty();
    }

    return result;
  }

  renderEmpty () {
    return (
      <ContentEmpty name='template' />
    );
  }

  renderNoTemplates () {
    return (
      <div className={styles.noTemplates}>
        <div className={styles.noTitle}>Oh my!</div>
        <div className={styles.noText}>
          <span>You don’t have any templates yet!</span>
          <br />
          <span>Lets change that</span>
        </div>
        <New />
      </div>
    );
  }
}
