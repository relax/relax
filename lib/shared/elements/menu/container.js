import Component from 'components/component';
import React, {PropTypes} from 'react';
import {dataConnect} from 'relate-js';

import Menu from './menu';

@dataConnect(
  (props) => {
    const result = {
      variablesTypes: {
        menu: {
          id: 'ID!'
        }
      }
    };

    if (props.menuId) {
      result.fragments = {
        menu: {
          _id: 1,
          data: 1
        }
      };
      result.initialVariables = {
        menu: {
          id: props.menuId
        }
      };
    }

    return result;
  }
)
export default class MenuContainer extends Component {
  static propTypes = {
    menuId: PropTypes.string,
    menu: PropTypes.object,
    styleClassMap: PropTypes.object,
    editing: PropTypes.bool.isRequired
  };

  componentWillReceiveProps (nextProps) {
    if (this.props.menuId !== nextProps.menuId && nextProps.menuId) {
      this.props.relate.refresh(nextProps);
    }
  }

  render () {
    return (
      <Menu {...this.props} />
    );
  }
}
