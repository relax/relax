import Balloon from 'components/balloon';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {getColor} from 'helpers/colors';

import styles from './shadow.less';
import Edit from './edit';

export default class Shadow extends Component {
  static propTypes = {
    shadow: PropTypes.object.isRequired,
    editing: PropTypes.bool.isRequired,
    new: PropTypes.bool.isRequired,
    selectShadow: PropTypes.func.isRequired,
    removeShadow: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired
  };

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
    const colorLabel = getColor(shadow.color).label;

    return (
      <div className={styles.root}>
        <div className={styles.content} onClick={::this.onClick} ref={(ref) => {
          this.ref = ref;
          !this.state.ready && this.setState({ready: true});
        }}
        >
          <div>
            {`${shadow.type}, ${colorLabel}, ${shadow.x} ${shadow.y}, ${shadow.blur}, ${shadow.spread}`}
          </div>
          <div className={styles.removeButton} onClick={::this.onRemove}>
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
