import GeminiScrollbar from 'react-gemini-scrollbar';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import Animate from '../../../animate';

export default class DataLinking extends Component {
  static propTypes = {
    pageBuilder: PropTypes.object.isRequired,
    pageBuilderActions: PropTypes.object.isRequired
  }

  render () {
    return (
      <div className='data-linking'>
        <div className='data-linking-header'>
          <div className='button button-primary' onClick={this.props.pageBuilderActions.closeLinkFormDataMode}>
            <i className='material-icons'>keyboard_arrow_left</i>
            <span>DONE</span>
          </div>
          <span className='title'>Link Form Data</span>
        </div>
      </div>
    );
  }
}
