import dataConnect from 'decorators/data-connector';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import Menu from './components/menu';

@dataConnect()
@connect(
  (state) => ({
    menu: state.menu.data,
    params: state.router.params
  })
)
export default class MenuContainer extends Component {
  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    menu: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
  };

  componentWillReceiveProps (nextProps) {
    if (this.props.params.id !== nextProps.params.id) {
      this.getData(nextProps);
    }
  }

  initialize () {
    this.getData(this.props);
  }

  getData (props) {
    props.fetchData({
      fragments: Menu.fragments,
      variables: {
        menu: {
          _id: {
            value: props.params.id,
            type: 'ID!'
          }
        }
      }
    });
  }

  render () {
    const {menu} = this.props;
    return (
      <Menu
        menu={menu}
      />
    );
  }
}
