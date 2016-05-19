import bind from 'decorators/bind';
import Component from 'components/component';
import PageInfo from 'components/content-page-info';
import React, {PropTypes} from 'react';
import {removeTemplate} from 'actions/template';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

@dataConnect(
  (state) => ({
    templateId: state.router.params.id
  }),
  (dispatch) => bindActionCreators({removeTemplate}, dispatch),
  (props) => ({
    fragments: {
      template: {
        _id: 1,
        title: 1,
        date: 1,
        updatedDate: 1,
        createdBy: {
          _id: 1,
          email: 1,
          name: 1
        },
        updatedBy: {
          _id: 1,
          email: 1,
          name: 1
        }
      }
    },
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
export default class PageInfoContainer extends Component {
  static propTypes = {
    templateId: PropTypes.string.isRequired,
    template: PropTypes.object
  };

  getInitState () {
    return {
      removeConfirm: false
    };
  }

  @bind
  onDelete () {
    this.setState({
      removeConfirm: true
    });
  }

  @bind
  cancelDelete () {
    this.setState({
      removeConfirm: false
    });
  }

  @bind
  confirmRemoveTemplate () {
    const {templateId} = this.props;
    this.props.removeTemplate(templateId, true);
  }

  render () {
    const {template} = this.props;
    const {removeConfirm} = this.state;
    return (
      <PageInfo
        item={template}
        removeConfirm={removeConfirm}
        onDelete={this.onDelete}
        cancelDelete={this.cancelDelete}
        confirmRemove={this.confirmRemoveTemplate}
      />
    );
  }
}
