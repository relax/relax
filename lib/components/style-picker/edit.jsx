import React from 'react';
import {Component} from 'relax-framework';

import OptionsList from '../options-list';

export default class Edit extends Component {
  static propTypes = {
    styleOptions: React.PropTypes.object.isRequired,
    selectedStyle: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired
  }

  render () {
    return (
      <div className='style-picker-options'>
        {this.renderOptions()}
      </div>
    );
  }

  renderOptions () {
    const {styleOptions, selectedStyle} = this.props;
    const values = Object.assign({}, styleOptions.defaults, selectedStyle.options);

    return (
      <OptionsList
        options={styleOptions.options}
        values={values}
        onChange={this.props.onChange}
      />
    );
  }
}
