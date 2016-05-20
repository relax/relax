import Component from 'components/component';
import React, {PropTypes} from 'react';

import DataSchemaForm from './form';

export default class DataSchemaFormContainer extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  };

  render () {
    return (
      <DataSchemaForm />
    );
  }
}
