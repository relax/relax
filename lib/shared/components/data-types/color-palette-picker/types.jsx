import cx from 'classnames';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

export default class Types extends Component {

  static propTypes = {
    type: PropTypes.string.isRequired,
    changeToSolid: PropTypes.func.isRequired,
    changeToLinear: PropTypes.func.isRequired,
    changeToRadial: PropTypes.func.isRequired
  }

  render () {
    const {type} = this.props;

    return (
      <div className='types'>
        <div className={cx('type solid', type !== 'linear' && type !== 'radial' && 'active')} onClick={this.props.changeToSolid}></div>
        <div className={cx('type linear', type === 'linear' && 'active')} onClick={this.props.changeToLinear}></div>
        <div className={cx('type radial', type === 'radial' && 'active')} onClick={this.props.changeToRadial}></div>
      </div>
    );
  }
}
