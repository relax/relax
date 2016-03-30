import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './builder.less';
import Name from './name';
import Types from './types';

const steps = [
  Types,
  Name
];

export default class SchemaBuilder extends Component {
  static propTypes = {
    step: PropTypes.number.isRequired
  };

  render () {
    const {step} = this.props;
    const StepComponent = steps[step];

    return (
      <div className={styles.root}>
        <StepComponent {...this.props} />
      </div>
    );
  }
}
