import bind from 'decorators/bind';
import cx from 'classnames';
import utils from 'helpers/utils';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './index.less';

export default class EditableTitle extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    sub: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
    big: PropTypes.bool,
    className: PropTypes.string,
    textClassName: PropTypes.string
  };

  getInitState () {
    return {
      editing: false
    };
  }

  componentWillReceiveProps (nextProps) {
    if (this.state.editing && nextProps.value !== this.props.value) {
      this.setState({
        editing: false
      });
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (!prevState.editing && this.state.editing) {
      const input = this.refs.input;

      if (input) {
        utils.placeCaretAtEnd(input);
      }
    }
  }

  @bind
  onClick () {
    this.setState({
      editing: true,
      editValue: this.props.value
    });
  }

  @bind
  onChange () {
    this.setState({
      editValue: this.refs.input.innerText
    });
  }

  @bind
  cancel (event) {
    event.preventDefault();
    this.setState({
      editing: false,
      editValue: ''
    });
  }

  @bind
  onSubmit (event) {
    event.preventDefault();
    this.props
      .onSubmit(this.state.editValue)
      .then(() => {
        this.setState({
          editing: false
        });
      });
  }

  @bind
  keyPress (event) {
    if (event.charCode === 13) {
      this.onSubmit(event);
    }
  }

  render () {
    const {sub, big} = this.props;
    return (
      <div className={cx(sub && styles.sub, big && styles.big)}>
        {this.renderContent()}
      </div>
    );
  }

  renderContent () {
    const {editing} = this.state;
    const {value, className, textClassName} = this.props;
    let result;

    if (!editing) {
      result = (
        <button
          className={cx(styles.root, styles.editButton, className)}
          onClick={this.onClick}
        >
          <div className={cx(styles.title, textClassName || styles.titleStyle)}>{value}</div>
          <i className='nc-icon-outline ui-1_edit-74' />
        </button>
      );
    } else {
      result = (
        <form
          onSubmit={this.onSubmit}
          className={cx(styles.root, className)}
        >
          <div
            onInput={this.onChange}
            className={cx(styles.title, textClassName || styles.titleStyle)}
            contentEditable
            dangerouslySetInnerHTML={{__html: this.state.editValue}}
            onKeyPress={this.keyPress}
            ref='input'
          />
          <button className={cx(styles.formButton, styles.confirmButton)}>Ok</button>
          <button className={cx(styles.formButton, styles.cancelButton)} onClick={this.cancel}>Cancel</button>
        </form>
      );
    }

    return result;
  }
}
