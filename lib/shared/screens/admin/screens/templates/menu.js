import * as adminMenuActions from 'actions/admin-menu';
import * as templateActions from 'actions/template';

import bind from 'decorators/bind';
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
        s: 'String'
      }
    },
    initialVariables: {
      templates: {
        sort: props.sort,
        order: props.order,
        search: 'title',
        s: props.search
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
    search: PropTypes.string.isRequired
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
      opened
    } = this.props;
    return (
      <Menu
        templates={templates}
        location={location}
        onBack={this.onBack}
        onNew={openNewTemplate}
        closeNew={closeNewTemplate}
        newOpened={opened}
        activeTemplateId={params.id}
        sort={sort}
        order={order}
        search={search}
      />
    );
  }
}
