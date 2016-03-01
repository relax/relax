import * as adminMenuActions from 'actions/admin-menu';

import dataConnect from 'decorators/data-connector';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';

import Menu from './components/menu';

@dataConnect(
  (state) => ({
    params: state.router.params
  }),
  (dispatch) => bindActionCreators(adminMenuActions, dispatch),
  (props) => {
    return {
      fragments: Menu.fragments,
      variablesTypes: {
        pages: {
          sort: 'String',
          order: 'String',
          page: 'Int',
          limit: 'Int'
        }
      },
      initialVariables: {
        pages: {
          sort: '_id',
          order: 'asc',
          page: 1,
          limit: 5
        }
      },
      mutations: {
        pages: {
          addPage: 'prepend'
        }
      }
    };
  }
)
export default class PagesContainer extends Component {
  static propTypes = {
    pages: PropTypes.array.isRequired,
    closeAdminMenu: PropTypes.func.isRequired,
    openAdminMenu: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired
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

  onBack () {
    this.props.closeAdminMenu();
  }

  onNew () {
    this.setState({
      newOpened: true
    });
  }

  closeNew () {
    this.setState({
      newOpened: false
    });
  }

  render () {
    const {pages, params} = this.props;
    return (
      <Menu
        pages={pages}
        onBack={::this.onBack}
        onNew={::this.onNew}
        closeNew={::this.closeNew}
        activePageId={params.id}
        {...this.state}
      />
    );
  }
}
