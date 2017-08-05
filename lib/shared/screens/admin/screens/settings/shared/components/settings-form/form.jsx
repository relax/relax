import bind from 'decorators/bind';
import cx from 'classnames';
import Animate from 'components/animate';
import Button from 'components/button';
import Component from 'components/component';
import ContentLoading from 'components/content-loading';
import OptionsList from 'components/options-list';
import Spinner from 'components/spinner';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './form.less';

export default class SettingsForm extends Component {
  static propTypes = {
    options: PropTypes.array.isRequired,
    values: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    saving: PropTypes.bool.isRequired,
    saved: PropTypes.bool.isRequired
  };

  @bind
  onSubmit (event) {
    event.preventDefault();
    this.props.onSubmit();
  }

  render () {
    const {loading} = this.props;
    return loading ? this.renderLoading() : this.renderContent();
  }

  renderLoading () {
    return (
      <ContentLoading />
    );
  }

  renderContent () {
    const {options, values, onChange} = this.props;
    return (
      <form onSubmit={this.onSubmit}>
        <OptionsList
          options={options}
          values={values}
          onChange={onChange}
          white
        />
        <div className={styles.state}>
          {this.renderState()}
        </div>
      </form>
    );
  }

  renderState () {
    const {saving, saved, onSubmit} = this.props;
    let result;

    if (saving) {
      result = (
        <Animate key='saving'>
          <div>
            <Spinner />
            <span className={styles.savingLabel}>Saving changes</span>
          </div>
        </Animate>
      );
    } else if (saved) {
      result = (
        <Animate key='saved'>
          <div>
            <i className={cx(styles.success, 'nc-icon-mini ui-1_check')} />
            <span className={cx(styles.success, styles.successLabel)}>Saved successfuly</span>
          </div>
        </Animate>
      );
    } else {
      result = (
        <Animate key='button'>
          <Button smallFont bordered noBackground onClick={onSubmit}>
            Save Changes
          </Button>
        </Animate>
      );
    }

    return result;
  }
}
