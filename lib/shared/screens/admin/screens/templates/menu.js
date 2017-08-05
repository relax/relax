import * as adminMenuActions from 'actions/admin-menu';
import * as templateActions from 'actions/template';

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
    search: state.router.location.query.s || '',
    opened: state.template.opened
  }),
  (dispatch) => bindActionCreators({...adminMenuActions, ...templateActions}, dispatch),
  (props) => ({
    fragments: Menu.fragments,
    variablesTypes: {
      templates: {
        sort: 'String',
        order: 'String',
        search: 'String',
        s: 'String',
        limit: 'Int',
        filters: '[Filter]'
      }
    },
    initialVariables: {
      templates: {
        sort: props.sort,
        order: props.order,
        search: 'title',
        s: props.search,
        limit: 15
      }
    },
    mutations: {
      addTemplate: [
        {
          type: 'PREPEND',
          field: 'templates'
        }
      ]
    }
  })
)
export default class TemplatesContainer extends Component {
  static propTypes = {
    templates: PropTypes.array.isRequired,
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
    templates: []
  };

  componentDidMount () {
    this.props.openAdminMenu();
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.sort !== this.props.sort ||
        nextProps.order !== this.props.order ||
        nextProps.search !== this.props.search) {
      this.props.relate.setVariables({
        templates: {
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
      const {templates, sort, order, search} = this.props;
      relate.loadMore({
        templates: {
          sort,
          order,
          search: 'title',
          s: search,
          limit: 10,
          filters: getLazyFilters({
            items: templates,
            sort,
            order
          })
        }
      }, 'templates', 10);
    }
  }

  @bind
  onBack () {
    this.props.closeAdminMenu();
  }

  render () {
    const {
      templates,
      params,
      sort,
      order,
      location,
      search,
      openNewTemplate,
      closeNewTemplate,
      opened,
      loading,
      loadingMore
    } = this.props;
    return (
      <Menu
        templates={templates}
        location={location}
        onBack={this.onBack}
        loadMore={this.loadMore}
        onNew={openNewTemplate}
        closeNew={closeNewTemplate}
        newOpened={opened}
        activeTemplateId={params.id}
        sort={sort}
        order={order}
        search={search}
        loading={loading}
        loadingMore={loadingMore}
      />
    );
  }
}
