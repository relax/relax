import authStyles from 'styles/auth.less';
import Button from 'components/button';
import React, {PropTypes} from 'react';
import Component from 'components/component';
import bind from 'decorators/bind';

export default class Init extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    user: PropTypes.object,
    error: PropTypes.string
  };

  @bind
  changeUsername (event) {
    this.props.onChange('username', event.target.value);
  }

  @bind
  changePassword (event) {
    this.props.onChange('password', event.target.value);
  }

  @bind
  changeName (event) {
    this.props.onChange('name', event.target.value);
  }

  @bind
  changeEmail (event) {
    this.props.onChange('email', event.target.value);
  }

  render () {
    const {username, password, name, email} = this.props.user;

    return (
      <div>
        <div className={authStyles.title}>Welcome to Relax!</div>
        <div className={authStyles.subTitle}>
          Register the first user to start building your website in a breeze.
        </div>
        <form className={authStyles.form} onSubmit={this.props.onSubmit}>
          <label>
            <i className='nc-icon-outline users_single-03' />
            <input
              type='text'
              name='username'
              placeholder='Username'
              value={username}
              onChange={this.changeUsername}
            />
          </label>
          <label>
            <i className='nc-icon-outline ui-1_lock' />
            <input
              type='password'
              name='password'
              placeholder='Password'
              value={password}
              onChange={this.changePassword}
            />
          </label>
          <label>
            <i className='nc-icon-outline users_circle-08' />
            <input
              type='text'
              name='name'
              placeholder='Name'
              value={name}
              onChange={this.changeName}
            />
          </label>
          <label>
            <i className='nc-icon-outline ui-1_email-85' />
            <input
              type='text'
              name='email'
              placeholder='Email'
              value={email}
              onChange={this.changeEmail}
            />
          </label>
          <Button primary full big onClick={this.props.onSubmit} style={{marginTop: 40}}>
            Let's get started
          </Button>
          {<div className='error'>{this.props.error && this.props.error || ' '}</div>}
          <input type='submit' hidden />
        </form>
      </div>
    );
  }
}
