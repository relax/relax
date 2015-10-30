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
    slug: PropTypes.string,
    getAdmin: PropTypes.func.isRequired,
    updatePage: PropTypes.func.isRequired,
    display: PropTypes.string.isRequired,
    loading: PropTypes.bool,
    tabs: PropTypes.array.isRequired,
    lastDashboard: PropTypes.string.isRequired,
    removeTab: PropTypes.func.isRequired,
    changeDisplay: PropTypes.func.isRequired
  }

  static defaultProps = {
    breadcrumbs: []
  }

  render () {
    return (
      <div>
        <div className={cx('blurr', this.state.overlay && 'blurred')}>
          <TopMenu
            activePanelType={this.props.activePanelType}
            user={this.props.user}
            tabs={this.props.tabs}
            display={this.props.display}
            changeDisplay={this.props.changeDisplay}
            lastDashboard={this.props.lastDashboard}
            removeTab={this.props.removeTab}
          />
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
