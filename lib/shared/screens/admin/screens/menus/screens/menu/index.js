import dataConnect from 'decorators/data-connector';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import Menu from './components/menu';

@dataConnect(
  (state) => ({
    params: state.router.params
  }),
  null,
  (props) => ({
    fragments: Menu.fragments,
    variablesTypes: {
      menu: {
        _id: 'ID!'
      }
    },
    initialVariables: {
      menu: {
        _id: props.params.id
      }
    }
  })
)
export default class MenuContainer extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired
  };

  static defaultProps = {
    menu: {}
  };

  componentWillReceiveProps (nextProps) {
    if (this.props.params.id !== nextProps.params.id) {
      this.props.relent.setVariables({
        menu: {
          _id: nextProps.params.id
        }
      });
    }
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
