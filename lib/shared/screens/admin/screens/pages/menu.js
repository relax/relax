import * as adminMenuActions from 'actions/admin-menu';

import bind from 'decorators/bind';
import getLazyFilters from 'helpers/get-lazy-load-filters';
import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

import Menu from './components/menu';

@dataConnect(
  (state) => ({
    params: state.router.params,
    location: state.router.location,
    sort: state.router.location.query.sort || '_id',
    order: state.router.location.query.order || 'desc',
    search: state.router.location.query.s || ''
  }),
  (dispatch) => bindActionCreators(adminMenuActions, dispatch),
  (props) => ({
    fragments: Menu.fragments,
    variablesTypes: {
      pages: {
        sort: 'String',
        order: 'String',
        search: 'String',
        s: 'String',
        limit: 'Int',
        filters: '[Filter]'
      }
    },
    initialVariables: {
      pages: {
        sort: props.sort,
        order: props.order,
        search: 'title',
        s: props.search,
        limit: 15
      }
    },
    mutations: {
      addPage: [
        {
          type: 'PREPEND',
          field: 'pages'
        }
      ]
    }
  })
)
export default class PagesContainer extends Component {
  static propTypes = {
    pages: PropTypes.array.isRequired,
    closeAdminMenu: PropTypes.func.isRequired,
    openAdminMenu: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    sort: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    loading: PropTypes.bool,
    loadingMore: PropTypes.bool
  };

  static defaultProps = {
    pages: []
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
        nextProps.search !== this.props.search) {
      this.props.relate.setVariables({
        pages: {
          sort: nextProps.sort,
          order: nextProps.order,
          search: 'title',
          s: nextProps.search,
          limit: 10
        }
      });
    }
  }

  @bind
  loadMore () {
    const {loading, relate} = this.props;
    if (!loading && relate.hasMore) {
      const {pages, sort, order, search} = this.props;
      relate.loadMore({
        pages: {
          sort,
          order,
          search: 'title',
          s: search,
          limit: 10,
          filters: getLazyFilters({
            items: pages,
            sort,
            order
          })
        }
      }, 'pages', 10);
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
    const {pages, params, sort, order, location, search, loading, loadingMore} = this.props;
    return (
      <Menu
        pages={pages}
        location={location}
        onBack={this.onBack}
        onNew={this.onNew}
        closeNew={this.closeNew}
        loadMore={this.loadMore}
        activePageId={params.id}
        sort={sort}
        order={order}
        search={search}
        loading={loading}
        loadingMore={loadingMore}
        {...this.state}
      />
    );
  }
}
