import Component from 'components/component';
import ModalInput from 'components/modal-input';
import ModalNew from 'components/modal-new';
import React, {PropTypes} from 'react';
import {changeTemplateTitle, addTemplate} from 'actions/template';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

@connect(
  (state) => ({
    title: state.template.title,
    loading: state.template.loading
  }),
  (dispatch) => bindActionCreators({changeTemplateTitle, addTemplate}, dispatch)
)
export default class NewTemplateContainer extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    addTemplate: PropTypes.func.isRequired,
    changeTemplateTitle: PropTypes.func.isRequired
  };

  render () {
    const {title, loading} = this.props;
    return (
      <ModalNew submit={this.props.addTemplate} loading={loading}>
        <ModalInput
          focus
          value={title}
          placeholder='Name your template. e.g. Default'
          onChange={this.props.changeTemplateTitle}
        />
      </ModalNew>
    );
  }
}
