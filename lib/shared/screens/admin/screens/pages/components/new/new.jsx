import Button from 'components/button';
import Component from 'components/component';
import ModalInput from 'components/modal-input';
import React, {PropTypes} from 'react';

import styles from './new.less';

export default class NewPage extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    changeTitle: PropTypes.func.isRequired
  };

  render () {
    const {title, changeTitle} = this.props;
    return (
      <div className={styles.root}>
        <ModalInput
          focus
          value={title}
          placeholder='Name your page. e.g. Homepage'
          onChange={changeTitle}
        />
        <Button noBackground primary className={styles.button}>Create</Button>
      </div>
    );
  }
}
