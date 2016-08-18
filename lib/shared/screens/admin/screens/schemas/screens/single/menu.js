import * as adminMenuActions from 'actions/admin-menu';

import bind from 'decorators/bind';
import getLazyFilters from 'helpers/get-lazy-load-filters';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

import Menu from './components/menu';

@dataConnect(
  (state) => ({
    params: state.router.params,
    location: state.router.location,
    sort: state.router.location.query.sort || '_id',
    order: state.router.location.query.order || 'desc',
    search: state.router.location.query.s || '',
    schemaId: state.router.params.id
  }),
  (dispatch) => bindActionCreators(adminMenuActions, dispatch),
  (props) => ({
    fragments: Menu.fragments,
    variablesTypes: {
      schema: {
        id: 'ID!'
      },
      schemaList: {
        schemaId: 'ID!',
        sort: 'String',
        order: 'String',
        search: 'String',
        s: 'String',
        limit: 'Int',
        filters: '[Filter]'
      }
    },
    initialVariables: {
      schema: {
        id: props.schemaId
      },
      schemaList: {
        schemaId: props.schemaId,
        sort: props.sort,
        order: props.order,
        search: 'title',
        s: props.search,
        limit: 15
      }
    },
    mutations: {
      addSchemaEntry: [
        {
          type: 'PREPEND',
          field: 'schemaList'
        }
      ]
    }
  })
)
export default class SchemaMenuContainer extends Component {
  static propTypes = {
    children: PropTypes.node,
    schemaList: PropTypes.array,
    schema: PropTypes.object,
    closeAdminMenu: PropTypes.func.isRequired,
    openAdminMenu: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    sort: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    schemaId: PropTypes.string.isRequired
  };

  static defaultProps = {
    schemaList: [],
    schema: {}
  };

  getInitState () {
    return {
      newOpened: false
    };
  }

  componentDidMount () {
    this.props.openAdminMenu();
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.sort !== this.props.sort ||
        nextProps.order !== this.props.order ||
        nextProps.search !== this.props.search ||
        nextProps.schemaId !== this.props.schemaId) {
      this.props.relate.refresh();
    }
    if (nextProps.schemaId !== this.props.schemaId) {
      this.props.openAdminMenu();
    }
  }

  @bind
  loadMore () {
    const {loading, relate} = this.props;
    if (!loading && relate.hasMore) {
      const {schemaList, sort, order, search, schemaId} = this.props;

      relate.loadMore({
        schemaList: {
          schemaId,
          sort,
          order,
          search: 'title',
          s: search,
          limit: 10,
          filters: getLazyFilters({
            items: schemaList,
            sort,
            order
          })
        }
      }, 'schemaList', 10);
    }
  }

  @bind
  onBack () {
    this.props.closeAdminMenu();
  }

  @bind
  onNew () {
    this.setState({
      newOpened: true
    });
  }

  @bind
  closeNew () {
    this.setState({
      newOpened: false
    });
  }

  render () {
    const {
      schemaList,
      schema,
      params,
      sort,
      order,
      search,
      location,
      schemaId,
      loading,
      loadingMore
    } = this.props;
    return (
      <Menu
        schemaList={schemaList}
        schema={schema}
        location={location}
        onBack={this.onBack}
        onNew={this.onNew}
        closeNew={this.closeNew}
        activeSchemaEntryId={params.entryId}
        sort={sort}
        order={order}
        search={search}
        schemaId={schemaId}
        loading={loading}
        loadingMore={loadingMore}
        loadMore={this.loadMore}
        {...this.state}
      />
    );
  }
}
