import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import Animate from '../../animate';
import FormState from '../../form-state';

export default class Status extends Component {
  static propTypes = {
    draft: PropTypes.object.isRequired,
    fetchCurrent: PropTypes.func.isRequired,
    state: PropTypes.string,
    stateMessage: PropTypes.string,
    currentVersion: PropTypes.number
  }

  render () {
    let result;
    const currentVersion = this.props.currentVersion;

    if (this.props.state) {
      result = <FormState state={this.props.state} message={this.props.stateMessage} />;
    } else {
      if (this.props.draft.__v < currentVersion) {
        result = (
          <Animate transition='slideDownIn' key='behind'>
            <span className='status behind'>
              <span>Your draft revision is behind current one - </span>
              <a href='#' onClick={this.props.fetchCurrent}> fetch current</a>
            </span>
          </Animate>
        );
      } else if (this.props.draft.actions && this.props.draft.actions.length > 0) {
        result = (
          <Animate transition='slideDownIn' key='draft'>
            <span className='status draft'>
              <span>Editing your draft - </span>
              <a href='#' onClick={this.props.fetchCurrent}> Drop changes</a>
            </span>
          </Animate>
        );
      } else {
        result = (
          <Animate transition='slideDownIn' key='published'>
            <span className='status published'>Seeing published version</span>
          </Animate>
        );
      }
    }
    return result;
  }
}
