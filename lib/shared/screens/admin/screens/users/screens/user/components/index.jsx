import bind from 'decorators/bind';
import getGravatarImage from 'helpers/get-gravatar-image';
import moment from 'moment';
import ColorThief from 'color-thief';
import Component from 'components/component';
import EditableTitle from 'components/editable-title';
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
    updateUserName: PropTypes.func.isRequired,
    updateUserUsername: PropTypes.func.isRequired,
    updateUserEmail: PropTypes.func.isRequired
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
    const {user, updateUserName, updateUserUsername, updateUserEmail} = this.props;
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
          <button className={styles.remove}>Remove User</button>
        </div>
      </div>
    );
  }
}
