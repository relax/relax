import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import Pages from './components/pages.jsx';

export default class PagesContainer extends Component {
  render () {
    return (
      <Pages
        {...this.props}
      />
    );
  }
}
