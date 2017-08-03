import Component from 'components/component';
import bind from 'decorators/bind';
import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

export default class ToggleButton extends Component {
  static propTypes = {
    children: PropTypes.node,
    id: PropTypes.string.isRequired,
    active: PropTypes.bool,
    className: PropTypes.string,
    activeClassName: PropTypes.string,
    onClick: PropTypes.func.isRequired
  };

  @bind
  onClick () {
    const {onClick, id} = this.props;
    onClick(id);
  }

  render () {
    const {className, activeClassName, active} = this.props;

    return (
      <button
        className={cx(className, active && activeClassName)}
        onClick={this.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}
