import Component from 'components/component';
import React from 'react';

import Pages from './components/pages.jsx';

export default class PagesContainer extends Component {
  static propTypes = {};

  onNew () {

  }

  render () {
    return (
      <Pages
        onNew={::this.onNew}
      />
    );
  }
}
