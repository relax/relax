import Component from 'components/component';
import ListHeader from 'components/list-header';
import ListSearchSort from 'components/list-search-sort';
import Modal from 'components/modal';
import Scrollable from 'components/scrollable';
import React, {PropTypes} from 'react';
import {mergeFragments} from 'relate-js';

import styles from './menu.less';
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
    location: PropTypes.object.isRequired
  };

  render () {
    const {schemaList, schema, onBack, onNew, activeSchemaEntryId, sort, order, location, search} = this.props;

    return (
      <div>
        <ListHeader
          title={schema.title}
          onBack={onBack}
          newIcon='nc-icon-outline ui-2_window-add'
          onNew={onNew}
        />
        <ListSearchSort
          search={search}
          sorts={sorts}
          sort={sort}
          order={order}
          location={location}
        />
        <Scrollable className={styles.list}>
          <List
            schemaList={schemaList}
            activeSchemaEntryId={activeSchemaEntryId}
            query={location.query}
          />
        </Scrollable>
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
