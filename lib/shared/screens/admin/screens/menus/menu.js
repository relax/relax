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
    activeId: state.router.params.id,
    location: state.router.location,
    sort: state.router.location.query.sort || '_id',
    order: state.router.location.query.order || 'desc',
    search: state.router.location.query.s || ''
  }),
  (dispatch) => bindActionCreators(adminMenuActions, dispatch),
  (props) => ({
    fragments: Menu.fragments,
    variablesTypes: {
      menus: {
        sort: 'String',
        order: 'String',
        search: 'String',
        s: 'String',
        limit: 'Int',
        filters: '[Filter]'
      }
    },
    initialVariables: {
      menus: {
        sort: props.sort,
        order: props.order,
        search: 'title',
        s: props.search,
        limit: 15
      }
    },
    mutations: {
      addMenu: [{
        type: 'PREPEND',
        field: 'menus'
      }]
    }
  })
)
export default class MenusMenuContainer extends Component {
  static propTypes = {
    menus: PropTypes.array.isRequired,
    closeAdminMenu: PropTypes.func.isRequired,
    openAdminMenu: PropTypes.func.isRequired,
    activeId: PropTypes.string,
    sort: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    loading: PropTypes.bool,
    loadingMore: PropTypes.bool
  };

  static defaultProps = {
    menus: []
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
        menus: {
          sort: nextProps.sort,
          order: nextProps.order,
          search: 'title',
          s: nextProps.search
        }
      });
    }
  }

  @bind
  loadMore () {
    const {loading, relate} = this.props;
    if (!loading && relate.hasMore) {
      const {menus, sort, order, search} = this.props;
      relate.loadMore({
        menus: {
          sort,
          order,
          search: 'title',
          s: search,
          limit: 10,
          filters: getLazyFilters({
            items: menus,
            sort,
            order
          })
        }
      }, 'menus', 10);
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
    const {menus, activeId, order, sort, search, location, loading, loadingMore} = this.props;
    return (
      <Menu
        menus={menus}
        location={location}
        activeId={activeId}
        loadMore={this.loadMore}
        onBack={this.onBack}
        onNew={this.onNew}
        closeNew={this.closeNew}
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
