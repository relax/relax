import bind from 'decorators/bind';
import cx from 'classnames';
import {placeCaretAtEnd} from 'helpers/utils';
import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './selected.less';

export default class Selected extends Component {
  static propTypes = {
    selectedStyle: PropTypes.object,
    onClick: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    opened: PropTypes.bool.isRequired
  };

  getInitState () {
    return {
      editing: false,
      value: ''
    };
  }

  componentWillReceiveProps (nextProps) {
    if (this.state.editing && nextProps.selectedStyle !== this.props.selectedStyle) {
      this.setState({
        editing: false
      });
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (!prevState.editing && this.state.editing) {
      const input = this.refs.input;

      if (input) {
        placeCaretAtEnd(input);
      }
    }
  }

  @bind
  toggleEdit (event) {
    const {selectedStyle} = this.props;

    event.preventDefault();
    event.stopPropagation();

    this.setState({
      editing: !this.state.editing,
      value: selectedStyle && selectedStyle.title || 'No style'
    });
  }

  @bind
  onTitleChange (event) {
    this.setState({
      value: event.target.value
    });
  }

  @bind
  onClick () {
    if (!this.state.editing) {
      this.props.onClick();
    }
  }

  @bind
  onSubmit (event) {
    const {onSubmit} = this.props;

    event.preventDefault();

    onSubmit(this.state.value);
    this.setState({
      editing: false
    });
  }

  render () {
    return (
      <div className={styles.selected} onClick={this.onClick}>
        {this.renderContent()}
      </div>
    );
  }

  renderContent () {
    const {selectedStyle, opened} = this.props;
    let result;

    if (this.state.editing) {
      result = (
        <form
          onSubmit={this.onSubmit}
          className={cx(styles.form)}
        >
          <input
            value={this.state.value}
            className={cx(styles.title, styles.input)}
            onChange={this.onTitleChange}
            ref='input'
          />
          <button className={cx(styles.formButton, styles.confirmButton)}>
            <i className='nc-icon-outline ui-1_check-circle-08' />
          </button>
          <button className={cx(styles.formButton, styles.cancelButton)} onClick={this.toggleEdit}>
            <i className='nc-icon-outline ui-1_circle-remove' />
          </button>
        </form>
      );
    } else {
      result = (
        <div>
          <div className={styles.title}>
            {selectedStyle && selectedStyle.title || 'No style'}
          </div>
          {
            selectedStyle &&
            <i
              className={cx(styles.editButton, 'nc-icon-outline ui-1_edit-74')}
              onClick={this.toggleEdit}
            />
          }
          <i
            className={cx(
              styles.arrow,
              'nc-icon-outline',
              opened ? 'arrows-1_minimal-up' : 'arrows-1_minimal-down'
            )}
          />
        </div>
      );
    }

    return result;
  }
}
