import Button from 'components/button';
import Component from 'components/component';
import ContentLoading from 'components/content-loading';
import OptionsList from 'components/options-list';
import Statuses from 'components/statuses';
import React, {PropTypes} from 'react';

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
    state: PropTypes.string,
    stateMessage: PropTypes.string,
    onDrop: PropTypes.func.isRequired
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
        {this.renderState()}
      </div>
    );
  }

  renderState () {
    const {
      saving,
      onSubmit,
      isNew,
      draftHasChanges,
      state,
      stateMessage,
      onDrop
    } = this.props;

    return (
      <div className={styles.state}>
        <Button smallFont bordered noBackground disabled={saving} onClick={onSubmit}>
          {isNew ? 'Create entry' : 'Save changes'}
        </Button>
        {
          !isNew &&
          <Statuses
            draftHasChanges={draftHasChanges}
            state={state}
            stateMessage={stateMessage}
            drop={onDrop}
            white
            big
          />
        }
      </div>
    );
  }
}
