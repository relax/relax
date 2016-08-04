import Component from 'components/component';
import React from 'react';
import {connect} from 'react-redux';

import Menu from './menu';

@connect(
  (state) => ({
    editing: state.pageBuilder.editing
  })
)
export default class PageBuilderMenuContainer extends Component {
  render () {
    return (
      <Menu {...this.props} />
    );
  }
}
