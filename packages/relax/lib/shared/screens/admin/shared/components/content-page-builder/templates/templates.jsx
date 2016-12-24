import bind from 'decorators/bind';
import cx from 'classnames';
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
    loadMore: PropTypes.func.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string,
    itemId: PropTypes.string
  };

  @bind
  onDelete () {
    const {onChange} = this.props;
    onChange(null);
  }

  render () {
    const {templates, onSearchChange, search, loadMore, value} = this.props;

    return (
      <div>
        <ListSearch
          search={search}
          onChange={onSearchChange}
          placeholder='Search for templates title'
        />
        <Scrollable
          className={cx(styles.scrollable, value && styles.withValue)}
          lazyLoad
          loadMore={loadMore}
        >
          {templates && templates.map(this.renderEntry, this)}
        </Scrollable>
        {this.renderUnselect()}
      </div>
    );
  }

  renderEntry (template) {
    const {value, onChange, type, itemId} = this.props;
    const active = template._id === value;
    return (
      <Entry
        template={template}
        onClick={onChange}
        active={active}
        type={type}
        itemId={itemId}
        key={template._id}
      />
    );
  }

  renderUnselect () {
    const {value} = this.props;
    if (value) {
      return (
        <div className={styles.bottom}>
          <button className={styles.actionButton} onClick={this.onDelete}>
            Unselect template
          </button>
        </div>
      );
    }
  }
}
