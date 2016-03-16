import find from 'lodash.find';
import Balloon from 'components/balloon';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import Edit from './edit';

export default class Sort extends Component {
  static propTypes = {
    editing: PropTypes.bool.isRequired,
    sort: PropTypes.object.isRequired,
    schemaProperties: PropTypes.array.isRequired,
    index: PropTypes.number.isRequired,
    selectSort: PropTypes.func.isRequired,
    removeSort: PropTypes.func.isRequired,
    new: PropTypes.bool
  };

  onClick () {
    if (!this.props.new) {
      this.props.selectSort(this.props.index);
    }
  }

  onRemove (event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.removeSort(this.props.index);
  }

  render () {
    return (
      <div className='sort-item white-options'>
        <div className='sort' onClick={::this.onClick} ref={(ref) => {
          this.ref = ref;
          !this.state.ready && this.setState({ready: true});
        }}
        >
          {this.renderContent()}
          {
            !this.props.new &&
            <div className='sort-remove' onClick={::this.onRemove}>
              <i className='material-icons'>delete</i>
            </div>
          }
        </div>
        {this.renderEditing()}
      </div>
    );
  }

  renderContent () {
    let result;
    const {sort, schemaProperties} = this.props;
    const property = find(schemaProperties, 'id', sort.prop);

    if (property) {
      switch (property.type) {
        case 'Date':
          if (sort.order === 'ASC') {
            result = (
              <div>
                <span>{property.title}</span>
                <span className='highlight'> newest</span>
                <span> to </span>
                <span className='highlight'>oldest</span>
              </div>
            );
          } else {
            result = (
              <div>
                <span>{property.title}</span>
                <span className='highlight'> oldest</span>
                <span> to </span>
                <span className='highlight'>newest</span>
              </div>
            );
          }
          break;
        case 'Boolean':
          if (sort.order === 'ASC') {
            result = (
              <div>
                <span>{property.title}</span>
                <span className='highlight'> first</span>
              </div>
            );
          } else {
            result = (
              <div>
                <span>{property.title}</span>
                <span className='highlight'> last</span>
              </div>
            );
          }
          break;
        default:
          if (sort.order === 'ASC') {
            result = (
              <div>
                <span>{property.title}</span>
                <span className='highlight'> alphabetical</span>
                <span> order </span>
                <span className='highlight'>[A-Z]</span>
              </div>
            );
          } else {
            result = (
              <div>
                <span>{property.title}</span>
                <span className='highlight'> inverse alphabetical</span>
                <span> order </span>
                <span className='highlight'>[Z-A]</span>
              </div>
            );
          }
      }
    }

    return result;
  }

  renderEditing () {
    if (this.props.editing && this.state.ready) {
      return (
        <Balloon element={this.ref}>
          <Edit {...this.props} />
        </Balloon>
      );
    }
  }
}
