import cx from 'classnames';
import React, {PropTypes} from 'react';
import {Component, mergeFragments} from 'relax-framework';

import Loading from './loading';
import MenuBar from './menu-bar';
import TopMenu from './top-menu';

export default class Admin extends Component {
  static fragments = mergeFragments({
    session: {
      _id: 1,
      username: 1,
      name: 1,
      email: 1
    }
  }, TopMenu.fragments)

  static propTypes = {
    activePanelType: PropTypes.string,
    breadcrumbs: PropTypes.array,
    children: PropTypes.element.isRequired,
    user: PropTypes.object,
    loading: PropTypes.bool,
    removeTab: PropTypes.func.isRequired,
    editing: PropTypes.bool.isRequired,
    linkingData: PropTypes.bool.isRequired,
    pageBuilderActions: PropTypes.object.isRequired,
    blurred: PropTypes.bool.isRequired
  }

  static defaultProps = {
    breadcrumbs: []
  }

  render () {
    return (
      <div>
        <div className={cx('blurr', this.props.blurred && 'blurred', !this.props.editing && 'previewing', this.props.linkingData && 'pb-linking-data')}>
          <div className='close-preview' onClick={this.props.pageBuilderActions.toggleEditing}>Close preview</div>
          <TopMenu {...this.props} />
          <div className='admin-holder'>
            {this.props.activePanelType !== 'pageBuild' && <MenuBar user={this.props.user} activePanelType={this.props.activePanelType} breadcrumbs={this.props.breadcrumbs} />}
            <div className='admin-content'>
              {this.props.loading ? <Loading /> : this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
