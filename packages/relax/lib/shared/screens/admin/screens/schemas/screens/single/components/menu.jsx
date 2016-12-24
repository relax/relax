import Component from 'components/component';
import ListHeader from 'components/list-header';
import ListSearchSort from 'components/list-search-sort';
import ListWrapper from 'components/list-wrapper';
import Modal from 'components/modal';
import React, {PropTypes} from 'react';
import {mergeFragments} from 'relate-js';
import styles from './menu.less';
import {Link} from 'react-router';

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

export default class SchemaMenu extends Component {
  static fragments = mergeFragments(
    List.fragments,
    {
      schemaList: { // for filters
        _id: 1,
        title: 1,
        updatedDate: 1
      },
      schema: {
        _id: 1,
        title: 1
      }
    }
  );

  static propTypes = {
    schemaList: PropTypes.array.isRequired,
    schema: PropTypes.object.isRequired,
    onBack: PropTypes.func.isRequired,
    onNew: PropTypes.func.isRequired,
    closeNew: PropTypes.func.isRequired,
    activeSchemaEntryId: PropTypes.string,
    newOpened: PropTypes.bool.isRequired,
    sort: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    schemaId: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    loadingMore: PropTypes.bool.isRequired,
    loadMore: PropTypes.func.isRequired
  };

  render () {
    const {
      schemaList,
      schema,
      onBack,
      onNew,
      activeSchemaEntryId,
      sort,
      order,
      location,
      search,
      schemaId,
      loading,
      loadingMore,
      loadMore
    } = this.props;

    return (
      <div>
        <ListHeader
          title={schema.title}
          onBack={onBack}
          onNew={onNew}
        />
        <Link to={`/admin/schemas/single/${schemaId}/edit`} className={styles.editButton}>
          Edit Schema
        </Link>
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
          className={styles.offset}
        >
          <List
            schemaList={schemaList}
            activeSchemaEntryId={activeSchemaEntryId}
            query={location.query}
            schemaId={schemaId}
          />
        </ListWrapper>
        {this.renderNew()}
      </div>
    );
  }

  renderNew () {
    const {newOpened, closeNew, schema} = this.props;
    if (newOpened) {
      return (
        <Modal small subTitle={`New ${schema.title} entry`} title='What should we call it?' onClose={closeNew}>
          <New onClose={closeNew} schemaId={schema._id} />
        </Modal>
      );
    }
  }
}
