import bind from 'decorators/bind';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {addTab} from 'actions/tabs';
import {updateTemplateTitle} from 'actions/template';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

import Template from './components/template';

@dataConnect(
  (state) => ({
    templateId: state.router.params.id,
    location: state.router.location
  }),
  (dispatch) => bindActionCreators({updateTemplateTitle, addTab}, dispatch),
  (props) => ({
    fragments: Template.fragments,
    variablesTypes: {
      template: {
        id: 'ID!'
      }
    },
    initialVariables: {
      template: {
        id: props.templateId
      }
    }
  })
)
export default class TemplateContainer extends Component {
  static propTypes = {
    relate: PropTypes.object.isRequired,
    template: PropTypes.object.isRequired,
    templateId: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    updateTemplate: PropTypes.func.isRequired
  };

  getInitState () {
    this.processTab(this.props);
    return {
      sidebar: null
    };
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.templateId !== nextProps.templateId) {
      this.setState({
        sidebar: null
      });
      this.props.relate.setVariables({
        template: {
          id: nextProps.templateId
        }
      });
    }

    const oldBuild = this.props.location.query.build;
    const currentBuild = nextProps.location.query.build;
    if (oldBuild !== currentBuild || this.props.templateId !== nextProps.templateId) {
      this.processTab(nextProps);
    }
  }

  processTab (props) {
    const currentBuild = props.location.query.build;
    if (currentBuild) {
      this.props.addTab('template', props.templateId);
    }
  }

  @bind
  updateTitle (title) {
    const {template} = this.props;
    return this.props.updateTemplateTitle(template._id, title);
  }

  @bind
  toggleTemplateInfo () {
    const {sidebar} = this.state;
    this.setState({
      sidebar: sidebar === 'info' ? null : 'info'
    });
  }

  @bind
  toggleTemplateRevisions () {
    const {sidebar} = this.state;
    this.setState({
      sidebar: sidebar === 'revisions' ? null : 'revisions'
    });
  }

  render () {
    const {template, location, loading, templateId} = this.props;
    return (
      <Template
        {...this.state}
        template={template}
        templateId={templateId}
        location={location}
        loading={loading}
        updateTitle={this.updateTitle}
        toggleTemplateInfo={this.toggleTemplateInfo}
        toggleTemplateRevisions={this.toggleTemplateRevisions}
      />
    );
  }
}
