import React from 'react';
import Relay from 'react-relay';
import {Component} from 'relax-framework';
import List from './list';
// import Filter from '../../../filter';
// import Pagination from '../../../pagination';
import A from '../../../a';

class Pages extends Component {
  getInitialState () {
    return {
      search: (this.context.query && this.context.query.s) || '',
      lightbox: false
    };
  }

  render () {
    return (
      <div className='admin-pages'>
        <div className='filter-menu'>
          <span className='admin-title'>Pages</span>
          <List pages={this.props.pages}/>
        </div>
        <div className='admin-scrollable'>
        </div>
      </div>
    );
  }
}

Pages.contextTypes = {
  query: React.PropTypes.object
};

export default Relay.createContainer(Pages, {
  fragments: {
    pages: () => Relay.QL`
      fragment on Pages {
        ${List.getFragment('pages')}
      }
    `
  }
});
