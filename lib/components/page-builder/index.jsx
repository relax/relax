import cx from 'classnames';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import Canvas from './canvas';
import GeneralElementsMenu from './general-elements-menu';
import JSSReact from '../../react-jss/jss-react';
import Menu from './menu';

export default class PageBuilder extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    actions: PropTypes.array.isRequired,
    pageBuilder: PropTypes.object.isRequired,
    pageBuilderActions: PropTypes.object.isRequired,
    draftActions: PropTypes.object.isRequired
  }

  render () {
    return (
      <div className={cx('page-builder', !this.props.pageBuilder.editing && 'preview')}>
        <JSSReact />
        <Canvas
          pageBuilder={this.props.pageBuilder}
          pageBuilderActions={this.props.pageBuilderActions}
          data={this.props.data}
        />
        <Menu
          pageBuilder={this.props.pageBuilder}
          pageBuilderActions={this.props.pageBuilderActions}
        />
        <GeneralElementsMenu
          pageBuilder={this.props.pageBuilder}
          pageBuilderActions={this.props.pageBuilderActions}
        />
      </div>
    );
  }
}


//
// {this.renderElementsMenu()}
// {this.renderDragger({top: -60})}
