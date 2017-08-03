import Component from 'components/component';
import Content from 'components/content';
import ContentHeader from 'components/content-header';
import ContentHeaderActions from 'components/content-header-actions';
import ContentLoading from 'components/content-loading';
import ContentNotFound from 'components/content-not-found';
import ModalDelete from 'components/modal-delete';
import OptionsList from 'components/options-list';
import Properties from 'components/properties';
import TemplatePicker from 'components/template';
import React from 'react';
import PropTypes from 'prop-types';
import Permissions from 'components/permissions';

import Save from './save';
import styles from './index.less';

const options = [
  {
    label: 'Title',
    id: 'title',
    type: 'String'
  },
  {
    label: 'Type',
    id: 'type',
    type: 'Select',
    props: {
      labels: ['With Url', 'Data only'],
      values: ['single', 'data']
    },
    unlocks: {
      single: [
        {
          label: 'Slug',
          id: 'slug',
          type: 'String'
        }
      ]
    }
  }
];

export default class SchemaEdit extends Component {
  static fragments = {
    schema: {
      _id: 1,
      type: 1,
      title: 1,
      slug: 1,
      template: {
        _id: 1
      },
      publicWritable: 1,
      publicReadable: 1,
      properties: 1
    }
  };

  static propTypes = {
    loading: PropTypes.bool,
    schema: PropTypes.object,
    removeConfirm: PropTypes.bool,
    toggleRemoveConfirm: PropTypes.func.isRequired,
    confirmRemove: PropTypes.func.isRequired,
    editingSchema: PropTypes.object.isRequired,
    changeSchemaProperty: PropTypes.func.isRequired,
    updateSchema: PropTypes.func.isRequired,
    changeSchemaPermission: PropTypes.func.isRequired,
    removing: PropTypes.bool.isRequired,
    saving: PropTypes.bool.isRequired
  };

  render () {
    const {schema, loading} = this.props;
    let result;

    if (loading) {
      result = this.renderLoading();
    } else if (!schema) {
      result = this.renderNotFound();
    } else {
      result = this.renderContent();
    }

    return result;
  }

  renderLoading () {
    return (
      <ContentLoading />
    );
  }

  renderNotFound () {
    return (
      <ContentNotFound name='schema' />
    );
  }

  renderContent () {
    const {
      schema,
      toggleRemoveConfirm,
      editingSchema,
      changeSchemaProperty,
      changeSchemaPermission,
      updateSchema,
      saving
    } = this.props;

    return (
      <div>
        <ContentHeader smallPadding>
          <div className={styles.headerLabel}>
            {`Editing ${schema.title} content type`}
          </div>
          <ContentHeaderActions>
            <button
              className={styles.actionButton}
              onClick={toggleRemoveConfirm}
            >
              <i className='nc-icon-outline ui-1_trash'></i>
            </button>
          </ContentHeaderActions>
        </ContentHeader>
        <Content>
          <div className={styles.form}>
            <OptionsList
              options={options}
              values={editingSchema}
              onChange={changeSchemaProperty}
              white
            />
            <Properties />
            <Permissions
              readable={editingSchema.publicReadable}
              writable={editingSchema.publicWritable}
              onChange={changeSchemaPermission}
            />
            {editingSchema.type === 'single' && <TemplatePicker />}
            <Save
              schema={schema}
              editingSchema={editingSchema}
              onSave={updateSchema}
              saving={saving}
            />
          </div>
        </Content>
        {this.renderRemoveConfirm()}
      </div>
    );
  }

  renderRemoveConfirm () {
    const {removeConfirm, toggleRemoveConfirm, confirmRemove} = this.props;

    if (removeConfirm) {
      const {schema, removing} = this.props;

      return (
        <ModalDelete
          title={`Are you sure you want to remove "${schema.title}"?`}
          cancel={toggleRemoveConfirm}
          submit={confirmRemove}
          loading={removing}
        />
      );
    }
  }
}
