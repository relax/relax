import GeminiScrollbar from 'react-gemini-scrollbar';
import React, {PropTypes} from 'react';
import {Component, mergeFragments} from 'relax-framework';

import Animate from '../../../animate';
import Linking from './linking';
import List from './list';

export default class DataLinking extends Component {
  static fragments = mergeFragments(Linking.fragments, List.fragments)

  static propTypes = {
    pageBuilder: PropTypes.object.isRequired,
    pageBuilderActions: PropTypes.object.isRequired,
    schema: PropTypes.object,
    list: PropTypes.bool.isRequired,
    toggleList: PropTypes.func.isRequired,
    schemas: PropTypes.array.isRequired,
    selectedSchema: PropTypes.object.isRequired
  }

  render () {
    return (
      <div className='data-linking'>
        <div className='data-linking-header'>
          <div className='button button-primary' onClick={this.props.pageBuilderActions.closeLinkDataMode}>
            <i className='material-icons'>keyboard_arrow_left</i>
            <span>DONE</span>
          </div>
          <span className='title'>Link Data</span>
        </div>
        <div className='selected-schema' onClick={this.props.toggleList}>
          <span>{this.props.selectedSchema && this.props.selectedSchema.title || 'None selected'}</span>
          <i className='material-icons'>{!this.props.list ? 'expand_less' : 'expand_more'}</i>
        </div>
        <div className='content-scrollable'>
          <GeminiScrollbar autoshow>
            {this.renderContent()}
          </GeminiScrollbar>
        </div>
      </div>
    );
  }

  renderContent () {
    let result;
    if (!this.props.list) {
      result = (
        <Animate transition='slideDownIn' duration={300} key='edit'>
          <Linking {...this.props} />
        </Animate>
      );
    } else if (this.props.selectedSchema && this.props.schemas.length > 1 || !this.props.selectedSchema && this.props.schemas.length) {
      result = (
        <Animate transition='slideUpIn' duration={300} key='list'>
          <List {...this.props} />
        </Animate>
      );
    }
    return result;
  }

  renderLinkage () {
    return (
      <div>Linkage</div>
    );
  }
}
