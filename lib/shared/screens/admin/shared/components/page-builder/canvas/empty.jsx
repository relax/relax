import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './empty.less';

export default class Empty extends Component {
  static propTypes = {
    pageBuilderActions: PropTypes.object.isRequired
  };

  onClick () {
    const {pageBuilderActions} = this.props;
    pageBuilderActions.addElementAt({tag: 'Section'}, {id: 'body', position: 0});
  }

  render () {
    return (
      <div className={styles.root}>
        <div className={styles.wrapper}>
          <div className={styles.title}>Let's get you started</div>
          <div className={styles.subTitle}>Click the blue dot below to add your first section</div>
          <button className={styles.button} onClick={::this.onClick}>
            <i className='nc-icon-mini ui-1_simple-add'></i>
          </button>
        </div>
      </div>
    );
  }
}
