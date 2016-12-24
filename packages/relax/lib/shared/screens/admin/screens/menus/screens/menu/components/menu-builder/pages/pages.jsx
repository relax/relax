import Component from 'components/component';
import Spinner from 'components/spinner';
import React, {PropTypes} from 'react';

import styles from './pages.less';
import Entry from '../entry';

export default class PagesList extends Component {
  static fragments = {
    pages: {
      _id: 1,
      title: 1
    }
  };

  static propTypes = {
    pages: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
  };

  render () {
    return (
      <div>
        {this.renderPages()}
      </div>
    );
  }

  renderPages () {
    const {pages} = this.props;
    let result;

    if (this.props.loading) {
      result = (
        <div className={styles.loading}>
          <Spinner />
        </div>
      );
    } else if (this.props.pages.length > 0) {
      result = pages.map(this.renderPage, this);
    } else {
      result = (
        <div className={styles.no}>No pages to show</div>
      );
    }

    return result;
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
