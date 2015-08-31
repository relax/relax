import {Component} from 'relax-framework';
import React from 'react';
import moment from 'moment';

export default class MediaList extends Component {

  onSelect (id) {
    this.props.onSelect(id);
  }

  renderItem (data) {
    var date = moment(data.date).format("Do MMMM YYYY");
    var className = 'entry';

    if(this.props.selected.indexOf(data._id) !== -1){
      className += ' active';
    }

    return (
      <div key={data._id} onClick={this.onSelect.bind(this, data._id)} className={className}>
        <div className='image-part'>
          <img src={data.thumbnail} width='100' height='100' />
        </div>
        <div className='info-part'>
          <div className='title'>{data.name}</div>
          <div className='under-title'>{data.dimension.width+'x'+data.dimension.height}</div>
          <div className='under-title'>{data.size}</div>
          <div className='under-title'>{date}</div>
        </div>
      </div>
    );
  }

  renderMedia () {
    if (this.props.media.length > 0) {
      return this.props.media.map(this.renderItem, this);
    } else {
      return (
        <div className='none-warning'>
          <div className='none-icon-part'>
            <i className='material-icons'>error_outline</i>
          </div>
          <div className='none-info-part'>
            <p>No media items added yet!</p>
            <p>You can add new media items on the upload media button above</p>
          </div>
        </div>
      );
    }
  }

  render () {
    return (
      <div className='list'>
        {this.renderMedia()}
      </div>
    );
  }
}

MediaList.propTypes = {
  media: React.PropTypes.array.isRequired,
  selected: React.PropTypes.array.isRequired,
  onSelect: React.PropTypes.func.isRequired
};
