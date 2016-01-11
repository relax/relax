import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import Balloon from '../../balloon';
import Edit from './edit';
import {getColor} from '../../../helpers/colors';

export default class Shadow extends Component {
  static propTypes = {
    shadow: PropTypes.object.isRequired,
    editing: PropTypes.bool.isRequired,
    new: PropTypes.bool.isRequired,
    selectShadow: PropTypes.func.isRequired,
    removeShadow: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired
  }

  onClick () {
    this.props.selectShadow(this.props.index);
  }

  onRemove (event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.removeShadow(this.props.index);
  }

  render () {
    const {shadow} = this.props;

    return (
      <div className='box-shadow-item'>
        <div className='box-shadow' onClick={::this.onClick} ref={(ref) => {
          this.ref = ref;
          !this.state.ready && this.setState({ready: true});
        }}>
          <div>{`${shadow.type}, ${getColor(shadow.color).label}, ${shadow.x} ${shadow.y}, ${shadow.blur}, ${shadow.spread}`}</div>
          <div className='box-shadow-remove' onClick={::this.onRemove}>
            <i className='material-icons'>delete</i>
          </div>
        </div>
        {this.renderEditing()}
      </div>
    );
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
