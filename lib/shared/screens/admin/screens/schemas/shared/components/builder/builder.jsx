import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './builder.less';
import Types from './types';

const steps = [
  Types
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
