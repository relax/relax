import Component from 'components/component';
import ListHeader from 'components/list-header';
import ListSearchSort from 'components/list-search-sort';
import ListWrapper from 'components/list-wrapper';
import Modal from 'components/modal';
import New from 'components/new-page';
import React, {PropTypes} from 'react';
import {mergeFragments} from 'relate-js';

import List from './list';

const sorts = [
  {
    label: 'Date desc',
    sort: '_id',
    order: 'desc'
  },
  {
    label: 'Date asc',
    sort: '_id',
    order: 'asc'
  },
  {
    label: 'Title A-Z',
    sort: 'title',
    order: 'asc'
  },
  {
    label: 'Title Z-A',
    sort: 'title',
    order: 'desc'
  },
  {
    label: 'Updated desc',
    sort: 'updatedDate',
    order: 'desc'
  },
  {
    label: 'Updated asc',
    sort: 'updatedDate',
    order: 'asc'
  }
];

export default class PagesMenu extends Component {
  static fragments = mergeFragments(
    List.fragments,
    {
      pages: { // for filters
        _id: 1,
        title: 1,
        updatedDate: 1
      }
    }
  );

  static propTypes = {
    children: PropTypes.node,
    pages: PropTypes.array.isRequired,
    onBack: PropTypes.func.isRequired,
    onNew: PropTypes.func.isRequired,
    closeNew: PropTypes.func.isRequired,
    activePageId: PropTypes.string,
    newOpened: PropTypes.bool.isRequired,
    sort: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    loadMore: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    loadingMore: PropTypes.bool
  };

  render () {
    const {
      pages,
      onBack,
      onNew,
      activePageId,
      sort,
      order,
      location,
      search,
      loadMore,
      loading,
      loadingMore
    } = this.props;

    return (
      <div>
        <ListHeader
          title='Pages'
          onBack={onBack}
          onNew={onNew}
        />
        <ListSearchSort
          search={search}
          sorts={sorts}
          sort={sort}
          order={order}
          location={location}
        />
        <ListWrapper
          loading={loading}
          loadingMore={loadingMore}
          loadMore={loadMore}
        >
          <List
            pages={pages}
            activePageId={activePageId}
            query={location.query}
          />
        </ListWrapper>
        {this.renderNew()}
      </div>
    );
  }

  renderNew () {
    const {newOpened, closeNew} = this.props;
    if (newOpened) {
      return (
        <Modal small subTitle='New Page' title='What should we call it?' onClose={closeNew}>
          <New onClose={closeNew} />
        </Modal>
      );
    }
  }
}
