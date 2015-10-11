import React from 'react';
import Relay from 'react-relay';
import {Component} from 'relax-framework';
import Entry from './entry';

class List extends Component {
  renderEntry (page) {
    return (
      <Entry key={page._id} page={page} />
    );
  }

  renderEntries () {
    if (this.props.pages && this.props.pages.data.length > 0) {
      return this.props.pages.data.map(this.renderEntry, this);
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

List.defaultProps = {
  pages: []
};

List.propTypes = {
  pages: React.PropTypes.array.isRequired
};

export default Relay.createContainer(List, {
  fragments: {
    pages: () => Relay.QL`
      fragment on Pages {
        data {
          ${Entry.getFragment('page')}
        }
      }
    `
  }
});
