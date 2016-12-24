import bind from 'decorators/bind';
import cx from 'classnames';
import Animate from 'components/animate';
import Button from 'components/button';
import Component from 'components/component';
import Spinner from 'components/spinner';
import React, {PropTypes} from 'react';

import styles from './index.less';

export default class ModalNew extends Component {
  static propTypes = {
    submit: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    children: PropTypes.node.isRequired,
    submitLabel: PropTypes.string,
    className: PropTypes.string
  };

  static defaultProps = {
    submitLabel: 'Create'
  };

  @bind
  onSubmit (event) {
    event.preventDefault();
    this.props.submit();
  }

  render () {
    const {className} = this.props;
    return (
      <div className={cx(styles.root, className)}>
        <form onSubmit={this.onSubmit}>
          {this.props.children}
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
    const {loading, submitLabel} = this.props;

    return (
      <div className={styles.button}>
        <Animate
          initial={false}
          transition={loading ? 'slideLeftOut' : 'slideLeftIn'}
          options={{display: loading ? 'none' : 'inline-block'}}
        >
          <Button noBackground primary>{submitLabel}</Button>
        </Animate>
      </div>
    );
  }
}
