import Component from 'components/component';
import React, {PropTypes} from 'react';

import Entry from './entry';

export default class PagesList extends Component {
  static fragments = {
    pages: Entry.fragments.page
  };

  static propTypes = {
    pages: PropTypes.array.isRequired
  };

  render () {
    return (
      <div>
        {this.props.pages.map(this.renderEntry, this)}
      </div>
    );
  }

  renderEntry (page, key) {
    return (
      <Entry page={page} key={key} />
    );
  }
}
