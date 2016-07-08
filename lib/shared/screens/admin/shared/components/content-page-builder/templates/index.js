import bind from 'decorators/bind';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {dataConnect} from 'relate-js';

import Templates from './templates';

@dataConnect(
  () => ({
    fragments: Templates.fragments
  })
)
export default class TemplatesPickerContainer extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    templates: PropTypes.array
  };

  getInitState () {
    return {
      search: ''
    };
  }

  @bind
  onSearchChange (search) {
    this.setState({
      search
    });
  }

  render () {
    const {loading, templates} = this.props;
    return (
      <Templates
        {...this.state}
        loading={loading}
        templates={templates}
        onSearchChange={this.onSearchChange}
      />
    );
  }
}
