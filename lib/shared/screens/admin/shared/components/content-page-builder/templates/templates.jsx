import Component from 'components/component';
import ListSearch from 'components/list-search';
import Scrollable from 'components/scrollable';
import React, {PropTypes} from 'react';

import styles from './templates.less';
import Entry from './entry';

export default class TemplatesPicker extends Component {
  static fragments = {
    templates: Entry.fragments.template
  };

  static propTypes = {
    templates: PropTypes.array,
    loading: PropTypes.bool,
    onSearchChange: PropTypes.func.isRequired,
    search: PropTypes.string,
    loadMore: PropTypes.func.isRequired
  };

  render () {
    const {templates, onSearchChange, search, loadMore} = this.props;

    return (
      <div>
        <ListSearch
          search={search}
          onChange={onSearchChange}
          placeholder='Search for templates title'
        />
        <Scrollable
          className={styles.scrollable}
          lazyLoad
          loadMore={loadMore}
        >
          {templates && templates.map(this.renderEntry, this)}
        </Scrollable>
      </div>
    );
  }

  renderEntry (template) {
    return (
      <Entry template={template} key={template._id} />
    );
  }
}
