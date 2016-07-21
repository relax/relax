import * as pbActions from 'actions/page-builder';

import bind from 'decorators/bind';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

import LinkingData from './linking-data';

@dataConnect(
  () => ({}),
  (dispatch) => ({
    pageBuilderActions: bindActionCreators(pbActions, dispatch)
  }),
  () => ({
    fragments: LinkingData.fragments
  })
)
export default class LinkingDataContainer extends Component {
  static propTypes = {
    schemas: PropTypes.array,
    pageBuilderActions: PropTypes.object.isRequired
  };

  getInitState () {
    return {
      section: 'list' // list || linking
    };
  }

  @bind
  toggleSection () {
    const {section} = this.state;
    this.setState({
      section: section === 'list' ? 'linking' : 'list'
    });
  }

  render () {
    const {schemas, pageBuilderActions} = this.props;

    return (
      <LinkingData
        {...this.state}
        schemas={schemas}
        toggleSection={this.toggleSection}
        pageBuilderActions={pageBuilderActions}
      />
    );
  }
}
