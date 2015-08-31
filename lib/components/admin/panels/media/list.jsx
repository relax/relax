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

  render () {
    return (
      <div className='list'>
        {this.props.media.map(this.renderItem, this)}
      </div>
    );
  }
}

MediaList.propTypes = {
  media: React.PropTypes.array.isRequired,
  selected: React.PropTypes.array.isRequired,
  onSelect: React.PropTypes.func.isRequired
};
