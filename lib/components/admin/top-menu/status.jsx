import React from 'react';
import {Component} from 'relax-framework';

import Animate from '../../animate';
import FormState from '../../form-state';

export default class Status extends Component {
  static propTypes = {
    draft: React.PropTypes.object.isRequired,
    fetchCurrent: React.PropTypes.func.isRequired,
    state: React.PropTypes.string,
    stateMessage: React.PropTypes.string
  }

  render () {
    let result;
    let currentVersion = 10;

    // if (this.context.page) {
    //   currentVersion = this.context.page.__v;
    // } else if (this.context.schemaEntry) {
    //   currentVersion = this.context.schemaEntry.__v;
    // } else if (this.context.schema) {
    //   currentVersion = this.context.schema.__v;
    // }

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
              <a href='#' onClick={this.props.fetchCurrent}> drop my changes</a>
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
