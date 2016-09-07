import Animate from 'components/animate';
import Component from 'components/component';
import OptionsList from 'components/options-list';
import Scrollable from 'components/scrollable';
import React, {PropTypes} from 'react';

import styles from './editing.less';
import Save from './save';

export default class StylePickerEditing extends Component {
  static propTypes = {
    values: PropTypes.object.isRequired,
    options: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    hasChanges: PropTypes.bool.isRequired,
    selectedStyle: PropTypes.object,
    onSave: PropTypes.func.isRequired
  };

  render () {
    return (
      <div className={styles.root}>
        {this.renderOptions()}
      </div>
    );
  }

  renderOptions () {
    const {values, options, onChange} = this.props;

    return (
      <div>
        <Scrollable>
          <Animate transition='slideUpIn' duration={300}>
            <div className={styles.content}>
              <OptionsList
                options={options}
                values={values}
                onChange={onChange}
              />
            </div>
          </Animate>
        </Scrollable>
        {this.renderSave()}
      </div>
    );
  }

  renderSave () {
    const {hasChanges, selectedStyle, onSave} = this.props;

    if (hasChanges) {
      return (
        <Save
          selectedStyle={selectedStyle}
          onSubmit={onSave}
        />
      );
    }
  }
}
