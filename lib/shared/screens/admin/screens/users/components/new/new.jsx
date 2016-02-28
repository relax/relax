import Animate from 'components/animate';
import Button from 'components/button';
import Component from 'components/component';
import ModalInput from 'components/modal-input';
import Spinner from 'components/spinner';
import React, {PropTypes} from 'react';

import styles from './new.less';

export default class NewUser extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    changeField: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    loading: PropTypes.bool
  };

  onSubmit (event) {
    event.preventDefault();
    this.props.submit();
  }

  changeField (field, value) {
    this.props.changeField(field, value);
  }

  render () {
    const {username, password, name, email} = this.props;
    return (
      <div className={styles.root}>
        <form onSubmit={::this.onSubmit}>
          <ModalInput
            focus
            value={username}
            placeholder='Username'
            onChange={this.changeField.bind(this, 'username')}
          />
          <ModalInput
            focus
            value={password}
            placeholder='Password'
            onChange={this.changeField.bind(this, 'password')}
          />
          <ModalInput
            focus
            value={name}
            placeholder='Name'
            onChange={this.changeField.bind(this, 'name')}
          />
          <ModalInput
            focus
            value={email}
            placeholder='Email'
            onChange={this.changeField.bind(this, 'email')}
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
