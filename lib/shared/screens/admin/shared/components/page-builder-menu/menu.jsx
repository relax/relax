import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './menu.less';
import Tabs from './tabs';

export default class PageBuilderMenu extends Component {
  static propTypes = {
    editing: PropTypes.bool.isRequired,
    linkingData: PropTypes.bool.isRequired,
    linkingFormData: PropTypes.bool.isRequired
  };

  render () {
    return (
      <div className={styles.root}>
        {this.renderContent()}
      </div>
    );
  }

  renderContent () {
    const {linkingData, linkingFormData} = this.props;
    let result;

    if (linkingData) {
      result = <div>Missing</div>;
    } else if (linkingFormData) {
      result = <div>Missing</div>;
    } else {
      result = <Tabs />;
    }

    return result;
  }
}
