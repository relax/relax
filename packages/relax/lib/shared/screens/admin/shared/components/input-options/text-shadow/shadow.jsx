import Balloon from 'components/balloon';
import Component from 'components/component';
import bind from 'decorators/bind';
import React, {PropTypes} from 'react';
import {getColor} from 'helpers/styles/colors';

import Edit from './edit';
import styles from './shadow.less';

export default class Shadow extends Component {
  static propTypes = {
    shadow: PropTypes.object.isRequired,
    editing: PropTypes.bool.isRequired,
    selectShadow: PropTypes.func.isRequired,
    removeShadow: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired
  };

  @bind
  onClick () {
    this.props.selectShadow(this.props.index);
  }

  @bind
  onRemove (event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.removeShadow(this.props.index);
  }

  render () {
    const {shadow} = this.props;

    return (
      <div className={styles.root}>
        <div className={styles.content} onClick={this.onClick} ref={(ref) => {
          this.ref = ref;
          !this.state.ready && this.setState({ready: true});
        }}
        >
          <div>{`${getColor(shadow.color).label}, ${shadow.x} ${shadow.y}, ${shadow.blur}`}</div>
          <div className={styles.removeButton} onClick={this.onRemove}>
            <i className='nc-icon-mini ui-1_trash-simple'></i>
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
