import * as adminMenuActions from 'actions/admin-menu';

import dataConnect from 'decorators/data-connector';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Menu from './components/menu';

@dataConnect()
@connect(
  (state) => ({
    pages: state.pages.items,
    params: state.router.params
  }),
  (dispatch) => bindActionCreators(adminMenuActions, dispatch)
)
export default class PagesContainer extends Component {
  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    pages: PropTypes.array.isRequired,
    closeAdminMenu: PropTypes.func.isRequired,
    openAdminMenu: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired
  };

  getInitState () {
    return {
      newOpened: false
    };
  }

  componentDidMount () {
    this.props.openAdminMenu();
  }

  initialize () {
    this.props.fetchData({
      fragments: Menu.fragments
    });
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
