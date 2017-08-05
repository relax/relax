import Button from 'components/button';
import Component from 'components/component';
import ContentLoading from 'components/content-loading';
import OptionsList from 'components/options-list';
import React from 'react';
import PropTypes from 'prop-types';
import Animate from 'components/animate';
import styles from './form.less';

export default class DataSchemaForm extends Component {
  static propTypes = {
    schemaId: PropTypes.string.isRequired,
    loading: PropTypes.bool,
    properties: PropTypes.array,
    values: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    saving: PropTypes.bool,
    saved: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
    toggleRemoveConfirm: PropTypes.func.isRequired,
    removeEntry: PropTypes.func.isRequired,
    removeConfirm: PropTypes.bool,
    isNew: PropTypes.bool,
    removing: PropTypes.bool,
    draftHasChanges: PropTypes.bool,
    openDropDraftConfirmation: PropTypes.func.isRequired
  };

  render () {
    const {loading, properties} = this.props;
    let result;

    if (loading) {
      result = this.renderLoading();
    } else if (properties) {
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
      <div>
        <OptionsList
          options={properties}
          values={values}
          onChange={onChange}
          white
        />
        <div className={styles.state}>
          {this.renderState()}
        </div>
      </div>
    );
  }

  renderState () {
    const {
      onSubmit,
      isNew,
      draftHasChanges,
      openDropDraftConfirmation
    } = this.props;
    let result;

    if (isNew) {
      result = (
        <Animate key='create'>
          <Button primary smallFont noBackground bordered onClick={onSubmit}>
            Push Changes Live
          </Button>
        </Animate>
      );
    } else if (draftHasChanges) {
      result = (
        <Animate key='changes'>
          <div>
            <Button smallFont noBackground grey onClick={openDropDraftConfirmation}>
              Drop Changes
            </Button>
            <Button smallFont primary noBackground bordered onClick={onSubmit}>
              Push Changes Live
            </Button>
          </div>
        </Animate>
      );
    } else {
      result = (
        <Animate key='none'>
          <div className={styles.none}>No changes made</div>
        </Animate>
      );
    }

    return result;
  }
}
