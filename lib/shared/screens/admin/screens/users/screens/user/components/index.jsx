import bind from 'decorators/bind';
import getGravatarImage from 'helpers/get-gravatar-image';
import moment from 'moment';
import ColorThief from 'color-thief';
import Component from 'components/component';
import EditableTitle from 'components/editable-title';
import Modal from 'components/modal';
import ModalDelete from 'components/modal-delete';
import ModalNew from 'components/modal-new';
import OptionsList from 'components/options-list';
import React, {PropTypes} from 'react';

import styles from './index.less';

export default class User extends Component {
  static fragments = {
    user: {
      _id: 1,
      email: 1,
      username: 1,
      name: 1,
      date: 1
    }
  };

  static propTypes = {
    user: PropTypes.object,
    removeConfirm: PropTypes.bool.isRequired,
    removing: PropTypes.bool,
    changingPassword: PropTypes.bool,
    toggleRemove: PropTypes.func.isRequired,
    togglePassword: PropTypes.func.isRequired,
    updateUserName: PropTypes.func.isRequired,
    updateUserUsername: PropTypes.func.isRequired,
    updateUserEmail: PropTypes.func.isRequired,
    removeUser: PropTypes.func.isRequired,
    password: PropTypes.string,
    passwordConfirm: PropTypes.string,
    changePasswordValue: PropTypes.func.isRequired,
    updateUserPassword: PropTypes.func.isRequired
  };

  getInitState () {
    return {
      color: [0, 0, 0]
    };
  }

  @bind
  imageLoaded () {
    const colorThief = new ColorThief();
    const color = colorThief.getColor(this.refs.image);
    this.setState({
      color
    });
  }

  render () {
    const {user} = this.props;
    let result;

    if (user) {
      result = this.renderContent();
    } else {
      result = this.renderLoading();
    }

    return result;
  }

  renderLoading () {
    return (
      <span></span>
    );
  }

  renderContent () {
    const {
      user,
      toggleRemove,
      togglePassword,
      updateUserName,
      updateUserUsername,
      updateUserEmail
    } = this.props;
    const {color} = this.state;
    const url = getGravatarImage(user.email, 250);
    const date = moment(user.date).format('MMM YYYY');
    const style = {
      backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`
    };

    return (
      <div>
        <div className={styles.info} style={style}>
          <div className={styles.content}>
            <div className={styles.user}>
              <img src={url} role='presentation' onLoad={this.imageLoaded} crossOrigin='Anonymous' ref='image' />
            </div>
            <EditableTitle
              value={user.name}
              className={styles.name}
              textClassName={styles.nameText}
              onSubmit={updateUserName}
            />
            <EditableTitle
              value={user.username}
              className={styles.sub}
              textClassName={styles.subText}
              onSubmit={updateUserUsername}
            />
            <EditableTitle
              value={user.email}
              className={styles.sub}
              textClassName={styles.subText}
              onSubmit={updateUserEmail}
            />
          </div>
          <div className={styles.date}>{`Member since: ${date}`}</div>
          <div className={styles.actions}>
            <button
              className={styles.actionButton}
              onClick={togglePassword}
            >
              Change Password
            </button>
            <button
              className={styles.actionButton}
              onClick={toggleRemove}
            >
              Remove User
            </button>
          </div>
        </div>
        {this.renderRemoving()}
        {this.renderChangingPassword()}
      </div>
    );
  }

  renderRemoving () {
    const {removeConfirm, removing, toggleRemove, removeUser} = this.props;

    if (removeConfirm) {
      return (
        <ModalDelete
          cancel={toggleRemove}
          submit={removeUser}
          loading={removing}
        />
      );
    }
  }

  renderChangingPassword () {
    const {changingPassword} = this.props;

    if (changingPassword) {
      const {
        password,
        passwordConfirm,
        changePasswordValue,
        togglePassword,
        updateUserPassword
      } = this.props;

      return (
        <Modal title='Changing user password' small onClose={togglePassword}>
          <ModalNew submitLabel='submit' submit={updateUserPassword}>
            <OptionsList
              white
              options={[
                {
                  type: 'String',
                  label: 'Password',
                  id: 'password',
                  props: {
                    password: true
                  }
                },
                {
                  type: 'String',
                  label: 'Confirm Password',
                  id: 'passwordConfirm',
                  props: {
                    password: true
                  }
                }
              ]}
              values={{password, passwordConfirm}}
              onChange={changePasswordValue}
            />
          </ModalNew>
        </Modal>
      );
    }
  }
}
