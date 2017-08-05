import Component from 'components/component';
import ListHeader from 'components/list-header';
import ListSearchSort from 'components/list-search-sort';
import ListWrapper from 'components/list-wrapper';
import Modal from 'components/modal';
import React from 'react';
import PropTypes from 'prop-types';

import List from './list';
import New from './new';

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

export default class Menu extends Component {
  static fragments = List.fragments;

  static propTypes = {
    children: PropTypes.node,
    menus: PropTypes.array.isRequired,
    onBack: PropTypes.func.isRequired,
    newOpened: PropTypes.bool.isRequired,
    onNew: PropTypes.func.isRequired,
    closeNew: PropTypes.func.isRequired,
    activeId: PropTypes.string,
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
      menus,
      onBack,
      onNew,
      activeId,
      search,
      sort,
      order,
      location,
      loadMore,
      loading,
      loadingMore
    } = this.props;

    return (
      <div>
        <ListHeader
          title='Menus'
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
          <List menus={menus} activeId={activeId} query={location.query} />
        </ListWrapper>
        {this.renderNew()}
      </div>
    );
  }

  renderNew () {
    const {newOpened, closeNew} = this.props;
    if (newOpened) {
      return (
        <Modal small subTitle='New Menu' title='What should we call it?' onClose={closeNew}>
          <New onClose={closeNew} />
        </Modal>
      );
    }
  }
}
