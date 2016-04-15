import Animate from 'components/animate';
import Button from 'components/button';
import Component from 'components/component';
import Spinner from 'components/spinner';
import React, {PropTypes} from 'react';

import styles from './index.less';
import Modal from '../modal';

export default class ModalDelete extends Component {
  static propTypes = {
    submit: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    children: PropTypes.node.isRequired,
    cancelLabel: PropTypes.string,
    deleteLabel: PropTypes.string,
    title: PropTypes.string,
    subTitle: PropTypes.string
  };

  static defaultProps = {
    cancelLabel: 'Cancel',
    deleteLabel: 'Delete',
    title: 'Are you sure?',
    subTitle: 'You won\'t be able to reverse it'
  };

  onSubmit (event) {
    event.preventDefault();
    this.props.submit();
  }

  render () {
    const {cancel, title, subTitle} = this.props;
    return (
      <Modal onClose={cancel} title={title} subTitle={subTitle} small>
        <div className={styles.state}>
          {this.renderLoading()}
          {this.renderCreateButton()}
        </div>
      </Modal>
    );
  }

  renderLoading () {
    const {loading} = this.props;

    return (
      <div className={styles.button}>
        <Animate
          initial={false}
          transition={loading ? 'slideRightIn' : 'slideRightOut'}
          options={{display: loading ? 'inline-block' : 'none'}}
        >
          <div className={styles.out}>
            <Spinner />
          </div>
        </Animate>
      </div>
    );
  }

  renderCreateButton () {
    const {loading, cancelLabel, deleteLabel, cancel, submit} = this.props;

    return (
      <div className={styles.button}>
        <Animate
          initial={false}
          transition={loading ? 'slideLeftOut' : 'slideLeftIn'}
          options={{display: loading ? 'none' : 'inline-block'}}
        >
          <div>
            <Button noBackground grey onClick={cancel}>{cancelLabel}</Button>
            <Button noBackground alert onClick={submit}>{deleteLabel}</Button>
          </div>
        </Animate>
      </div>
    );
  }
}
