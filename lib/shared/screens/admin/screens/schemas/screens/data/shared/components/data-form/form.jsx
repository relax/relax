import Component from 'components/component';
import ContentLoading from 'components/content-loading';
import OptionsList from 'components/options-list';
import React, {PropTypes} from 'react';

export default class DataSchemaForm extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    properties: PropTypes.array,
    values: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  };

  render () {
    const {loading} = this.props;
    let result;

    if (loading) {
      result = this.renderLoading();
    } else {
      result = this.renderForm();
    }

    return result;
  }

  renderLoading () {
    return (
      <ContentLoading />
    );
  }

  renderForm () {
    const {properties, onChange, values} = this.props;
    return (
      <OptionsList
        options={properties}
        values={values}
        onChange={onChange}
        white
      />
    );
  }
}
