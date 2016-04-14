import Component from 'components/component';
import React, {PropTypes} from 'react';

import Entry from '../entry';

export default class PagesList extends Component {
  static fragments = {
    pages: {
      _id: 1,
      title: 1
    }
  };

  static propTypes = {
    pages: PropTypes.array.isRequired
  };

  render () {
    const {pages} = this.props;
    return (
      <div>
        {pages.map(this.renderPage, this)}
      </div>
    );
  }

  renderPage (page) {
    const item = {
      type: 'page',
      typeProps: {
        pageId: page._id
      },
      label: page.title
    };
    return (
      <Entry item={item} key={page._id} />
    );
  }
}
