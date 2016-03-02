import Component from 'components/component';
import React, {PropTypes} from 'react';

import Entry from './entry';

export default class PagesList extends Component {
  static fragments = {
    pages: Entry.fragments.page
  };

  static propTypes = {
    pages: PropTypes.array.isRequired,
    activePageId: PropTypes.string,
    query: PropTypes.object.isRequired
  };

  render () {
    return (
      <div>
        {this.props.pages.map(this.renderEntry, this)}
      </div>
    );
  }

  renderEntry (page, key) {
    const {activePageId, query} = this.props;
    return (
      <Entry page={page} key={key} active={activePageId === page._id} query={query} />
    );
  }
}
