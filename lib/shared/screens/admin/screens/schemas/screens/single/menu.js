import * as adminMenuActions from 'actions/admin-menu';

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
    search: state.router.location.query.s || ''
  }),
  (dispatch) => bindActionCreators(adminMenuActions, dispatch),
  (props) => ({
    fragments: Menu.fragments,
    variablesTypes: {
      schema: {
        _id: 'ID!'
      },
      schemaList: {
        schemaId: 'ID!',
        sort: 'String',
        order: 'String',
        search: 'String',
        s: 'String'
      }
    },
    initialVariables: {
      schema: {
        _id: props.params.id
      },
      schemaList: {
        schemaId: props.params.id,
        sort: props.sort,
        order: props.order,
        search: 'title',
        s: props.search
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
    search: PropTypes.string.isRequired
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
        nextProps.search !== this.props.search) {
      this.props.relate.setVariables({
        schema: {
          _id: nextProps.params.id
        },
        schemaList: {
          schemaId: nextProps.params.id,
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
    const {schemaList, schema, params, sort, order, search, location} = this.props;
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
        {...this.state}
      />
    );
  }
}
