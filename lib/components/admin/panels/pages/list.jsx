import React from 'react';
import Relay from 'react-relay';
import {Component} from 'relax-framework';
import Entry from './entry';

export default class List extends Component {
  renderEntry (page) {
    return (
      <Entry key={page._id} page={page} />
    );
  }

  renderEntries () {
    if (this.props.pages.length > 0) {
      return this.props.pages.map(this.renderEntry, this);
    } else {
      return (
        <div className='none-warning'>
          <div className='none-icon-part'>
            <i className='material-icons'>error_outline</i>
          </div>
          <div className='none-info-part'>
            <p>No pages added yet!</p>
            <p>You can add new pages on the add new page button above</p>
          </div>
        </div>
      );
    }
  }

  render () {
    return (
      <div className='list'>
        {this.renderEntries()}
      </div>
    );
  }
}

List.propTypes = {
  pages: React.PropTypes.array.isRequired
};

export default Relay.createContainer(List, {
  // Specify the initial value of the `$size` variable.
  initialVariables: {
    page: 1
  },
  // For each of the props that depend on server data, we define a corresponding
  // key in `fragments`. Here, the component expects server data to populate the
  // `user` prop, so we'll specify the fragment from above as `fragments.user`.
  fragments: {
    user: () => Relay.QL`
      fragment on Page {
        profilePhoto(size: $size) {
          uri,
        },
      }
    `,
  },
});
