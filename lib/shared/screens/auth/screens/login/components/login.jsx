import authStyles from 'styles/auth.less';
import Button from 'components/button';
import React, {PropTypes} from 'react';
import Component from 'components/component';

export default class Login extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    fieldChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    error: PropTypes.string
  };

  onChange (id, event) {
    this.props.fieldChange(id, event.target.value);
  }

  render () {
    return (
      <div>
        <div className={authStyles.title}>Welcome back!</div>
        <div className={authStyles.subTitle}>Login with your account below to get started</div>
        <form className={authStyles.form} onSubmit={this.props.onSubmit}>
          <label>
            <i className='nc-icon-outline users_single-03'></i>
            <input type='text' name='username' placeholder='Username' value={this.props.username} onChange={this.onChange.bind(this, 'username')} />
          </label>
          <label>
            <i className='nc-icon-outline ui-1_lock'></i>
            <input type='password' name='password' placeholder='Password' value={this.props.password} onChange={this.onChange.bind(this, 'password')} />
          </label>
          <Button primary full big onClick={this.props.onSubmit} style={{marginTop: 40}}>Let's get started</Button>
          {<div className={authStyles.error}>{this.props.error && this.props.error || ' '}</div>}
          <input type='submit' hidden />
        </form>
      </div>
    );
  }
}
