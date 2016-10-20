import React, {PropTypes} from 'react';

import Animate from 'components/animate';
import Button from 'components/button';
import Component from 'components/component';
import Content from 'components/content';
import ContentHeader from 'components/content-header';
import ContentHeaderActions from 'components/content-header-actions';
import ContentLoading from 'components/content-loading';
import ContentNew from 'components/content-new';
import {Link} from 'react-router';
import ModalDelete from 'components/modal-delete';
import OptionsList from 'components/options-list';
import Spinner from 'components/spinner';
import cx from 'classnames';
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
    removing: PropTypes.bool
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
    const {properties, onChange, values, schemaId} = this.props;
    return (
      <div>
        <ContentHeader>
          <Link
            to={`/admin/schemas/data/${schemaId}`}
            className={styles.back}
          >
            <i className='nc-icon-outline arrows-1_small-triangle-left' />
            <span>Back to list</span>
          </Link>
          {this.renderActions()}
        </ContentHeader>
        <Content>
          <OptionsList
            options={properties}
            values={values}
            onChange={onChange}
            white
          />
          <div className={styles.state}>
            {this.renderState()}
          </div>
        </Content>
      </div>
    );
  }

  renderActions () {
    const {isNew, toggleRemoveConfirm} = this.props;

    if (!isNew) {
      return (
        <ContentHeaderActions>
          <ContentNew remove onClick={toggleRemoveConfirm}>
            Remove entry
          </ContentNew>
          {this.renderRemoveConfirm()}
        </ContentHeaderActions>
      );
    }
  }

  renderRemoveConfirm () {
    const {removeConfirm, removeEntry, toggleRemoveConfirm, removing} = this.props;

    if (removeConfirm) {
      return (
        <ModalDelete
          submit={removeEntry}
          cancel={toggleRemoveConfirm}
          loading={removing}
        />
      );
    }
  }

  renderState () {
    const {saving, saved, onSubmit, isNew} = this.props;
    let result;

    if (saving) {
      result = (
        <Animate key='saving'>
          <div>
            <Spinner />
            <span className={styles.savingLabel}>
              Saving
            </span>
          </div>
        </Animate>
      );
    } else if (saved) {
      result = (
        <Animate key='saved'>
          <div>
            <i className={cx(styles.success, 'nc-icon-mini ui-1_check')} />
            <span className={cx(styles.success, styles.successLabel)}>
              Saved successfuly
            </span>
          </div>
        </Animate>
      );
    } else {
      result = (
        <Animate key='button'>
          <Button smallFont bordered noBackground onClick={onSubmit}>
            {isNew ? 'Create entry' : 'Save changes'}
          </Button>
        </Animate>
      );
    }

    return result;
  }
}
