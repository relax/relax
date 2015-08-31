import {Component} from 'relax-framework';
import React from 'react';

export default class Button extends Component {
  onClick (event) {
    event.preventDefault();

    if (this.props.action === 'addElement') {
      this.context.addElementAtSelected(this.props.actionProps);
    }
  }

  render () {
    return (
      <a href='#' className='button button-primary' onClick={this.onClick.bind(this)}>
        {this.props.label}
      </a>
    );
  }
}

Button.contextTypes = {
  addElementAtSelected: React.PropTypes.func
};

Button.propTypes = {
  label: React.PropTypes.string.isRequired,
  action: React.PropTypes.string.isRequired,
  actionProps: React.PropTypes.object.isRequired
};
