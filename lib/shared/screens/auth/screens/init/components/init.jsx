import authStyles from 'styles/auth.less';
import Button from 'components/button';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

export default class Init extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    user: PropTypes.object,
    error: PropTypes.string
  };

  onChange (id, event) {
    this.props.onChange(id, event.target.value);
  }

  render () {
    const {username, password, name, email} = this.props.user;

    return (
      <div>
        <div className={authStyles.title}>Welcome to Relax!</div>
        <div className={authStyles.subTitle}>Register the first user to start building your website in a breeze.</div>
        <form className={authStyles.form} onSubmit={this.props.onSubmit}>
          <label>
            <i className='material-icons'>person_outline</i>
            <input type='text' name='username' placeholder='Username' value={username} onChange={this.onChange.bind(this, 'username')} />
          </label>
          <label>
            <i className='material-icons'>lock_outline</i>
            <input type='password' name='password' placeholder='Password' value={password} onChange={this.onChange.bind(this, 'password')} />
          </label>
          <label>
            <i className='material-icons smaller'>face</i>
            <input type='text' name='name' placeholder='Name' value={name} onChange={this.onChange.bind(this, 'name')} />
          </label>
          <label>
            <i className='material-icons smaller'>email</i>
            <input type='text' name='email' placeholder='Email' value={email} onChange={this.onChange.bind(this, 'email')} />
          </label>
          <Button primary full big onClick={this.props.onSubmit} style={{marginTop: 40}}>Let's get started</Button>
          {<div className='error'>{this.props.error && this.props.error || ' '}</div>}
          <input type='submit' hidden />
        </form>
      </div>
    );
  }
}
