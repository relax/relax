import bind from 'decorators/bind';
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
    changeTemplateTitle: PropTypes.func.isRequired,
    redirect: PropTypes.bool,
    onClose: PropTypes.func
  };

  static defaultProps = {
    redirect: true
  };

  @bind
  onSubmit () {
    const {redirect, onClose} = this.props;
    onClose && onClose();
    this.props.addTemplate(redirect);
  }

  render () {
    const {title, loading} = this.props;
    return (
      <ModalNew submit={this.onSubmit} loading={loading}>
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
