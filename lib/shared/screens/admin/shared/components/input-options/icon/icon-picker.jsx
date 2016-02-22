import Component from 'components/component';
import React, {PropTypes} from 'react';

export default class IconPicker extends Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    openSelector: PropTypes.func.isRequired,
    closeSelector: PropTypes.func.isRequired
  };

  render () {
    return (
      <div className='icon-picker' onClick={this.props.openSelector}>
        {this.renderSelected()}
      </div>
    );
  }

  renderSelected () {
    let result;
    if (this.props.value && this.props.value.family) {
      result = (
        <div className='selected'>
          <i className={this.props.value.className}>
            {this.props.value.content}
          </i>
        </div>
      );
    } else {
      result = <p>No icon selected</p>;
    }
    return result;
  }
}
