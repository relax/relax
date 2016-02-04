import {Component} from 'relax-framework';
import React from 'react';

export default class StateTrigger extends Component {

  getInitState () {
    return {
      values: this.props.defaults
    };
  }

  onChange (id, value) {
    this.state.values[id] = value;

    let event = new CustomEvent('setState', {
      detail: {
        [id]: value
      }
    });
    document.dispatchEvent(event);

    this.setState({
      values: this.state.values
    });
  }

  render () {
    return (
      <this.props.OptionsList values={this.state.values} onChange={this.onChange.bind(this)} options={this.props.options} />
    );
  }
}

StateTrigger.propTypes = {
  options: React.PropTypes.array,
  defaults: React.PropTypes.object,
  selected: React.PropTypes.any
};
