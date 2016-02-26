import Animate from 'components/animate';
import Button from 'components/button';
import Component from 'components/component';
import ModalInput from 'components/modal-input';
import Spinner from 'components/spinner';
import React, {PropTypes} from 'react';

import styles from './new.less';

export default class NewPage extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    changeTitle: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    loading: PropTypes.bool
  };

  onSubmit (event) {
    event.preventDefault();
    this.props.submit();
  }

  render () {
    const {title, changeTitle, submit} = this.props;
    return (
      <div className={styles.root}>
        <form onSubmit={::this.onSubmit}>
          <ModalInput
            focus
            value={title}
            placeholder='Name your page. e.g. Homepage'
            onChange={changeTitle}
          />
          <div className={styles.state}>
            {this.renderLoading()}
            {this.renderCreateButton()}
          </div>
          <input type='submit' hidden />
        </form>
      </div>
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
    const {loading} = this.props;

    return (
      <div className={styles.button}>
        <Animate
          initial={false}
          transition={loading ? 'slideLeftOut' : 'slideLeftIn'}
          options={{display: loading ? 'none' : 'inline-block'}}
        >
          <Button noBackground primary>Create</Button>
        </Animate>
      </div>
    );
  }
}
