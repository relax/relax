import Component from 'components/component';
import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import {dataConnect} from 'relate-js';

import ToggleButton from '../toggle-button';
import styles from './index.less';

@dataConnect(
  (props) => {
    let result = {};

    if (props.templateId) {
      result = {
        fragments: {
          template: {
            _id: 1,
            title: 1
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
      };
    }

    return result;
  }
)
export default class TemplatePickerContainer extends Component {
  static propTypes = {
    templateId: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    active: PropTypes.bool,
    template: PropTypes.object
  };

  componentWillReceiveProps (nextProps) {
    if (this.props.templateId !== nextProps.templateId) {
      this.props.relate.refresh(nextProps);
    }
  }

  render () {
    const {templateId, onClick, active, template} = this.props;

    return (
      <ToggleButton
        onClick={onClick}
        active={active}
        className={styles.templatePicker}
        id='templates'
      >
        <div className={styles.tpLabel}>Template:</div>
        <div className={cx(styles.tpValue, !templateId && styles.none)}>
          {templateId && template && template.title || 'None selected'}
        </div>
        <i className={cx('nc-icon-mini', active ? 'arrows-1_minimal-up' : 'arrows-1_minimal-down')} />
      </ToggleButton>
    );
  }
}
