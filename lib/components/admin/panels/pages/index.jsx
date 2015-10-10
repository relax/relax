import React from 'react';
import Relay from 'react-relay';
import {Component} from 'relax-framework';
import List from './list';
import Filter from '../../../filter';
import Pagination from '../../../pagination';
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
          <A href='/admin/pages/new' className='button-clean'>
            <i className='material-icons'>library_add</i>
            <span>Add new page</span>
          </A>
          <Filter
            sorts={[{label: 'Date', property: '_id'}, {label: 'Title', property: 'title'}, {label: 'Slug', property: 'slug'}]}
            url='/admin/pages'
            search='title'
          />
        </div>
        <div className='admin-scrollable'>
          <List data={this.state.pages} />
          <Pagination url='/admin/pages' />
        </div>
      </div>
    );
  }
}

Pages.contextTypes = {
  query: React.PropTypes.object
};

export default Relay.createContainer(Pages, {
  // Specify the initial value of the `$size` variable.
  initialVariables: {
    size: 32
  },
  // For each of the props that depend on server data, we define a corresponding
  // key in `fragments`. Here, the component expects server data to populate the
  // `user` prop, so we'll specify the fragment from above as `fragments.user`.
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        profilePhoto(size: $size) {
          uri,
        },
      }
    `,
  },
});
