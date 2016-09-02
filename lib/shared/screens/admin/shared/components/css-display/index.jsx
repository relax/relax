import bind from 'decorators/bind';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import DisplayButton from './button';

export default class CssDisplayOption extends Component {
  static propTypes = {
    values: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  };

  @bind
  onDisplayChange (value) {
    const {onChange} = this.props;
    onChange('display', value);
  }

  render () {
    const {display} = this.props.values;

    return (
      <div>
        <DisplayButton
          value='none'
          onChange={this.onDisplayChange}
          label='Hidden'
          active={display === 'none'}
        >
          <i className='nc-icon-outline ui-1_eye-ban-20' />
        </DisplayButton>
        <DisplayButton
          value='block'
          onChange={this.onDisplayChange}
          label='Block'
          active={display === 'block'}
        >
          <i className='nc-icon-outline design_patch-19' />
        </DisplayButton>
        <DisplayButton
          value='inline-block'
          onChange={this.onDisplayChange}
          label='Inline Block'
          active={display === 'inline-block'}
        >
          <i className='nc-icon-outline design_artboard' />
        </DisplayButton>
      </div>
    );
  }
}
