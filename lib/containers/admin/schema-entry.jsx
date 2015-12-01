import * as overlaysActions from '../../client/actions/overlays';
import * as schemaEntryActions from '../../client/actions/schema-entry';

import cloneDeep from 'lodash.clonedeep';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component} from 'relax-framework';

import RevisionsContainer from './revisions';
import SchemaEntry from '../../components/admin/panels/schema-entry';

@connect(
  (state) => ({
    schema: state.schema.data,
    schemaEntry: state.schemaEntry.data,
    isSlugValid: state.schemaEntry.isSlugValid,
    errors: state.schemaEntry.errors
  }),
  (dispatch) => ({
    ...bindActionCreators(schemaEntryActions, dispatch),
    ...bindActionCreators(overlaysActions, dispatch)
  })
)
export default class SchemaEntryContainer extends Component {
  static fragments = SchemaEntry.fragments

  static panelSettings = {
    activePanelType: 'schemaEntry',
    breadcrumbs: [
      {
        label: 'Schemas',
        type: 'schemas',
        link: '/admin/schemas'
      }
    ]
  }

  static propTypes = {
    schemaEntry: PropTypes.object,
    schema: PropTypes.object,
    user: PropTypes.object,
    id: PropTypes.string.isRequired,
    changeSchemaEntryFields: PropTypes.func,
    changeSchemaEntryToDefault: PropTypes.func,
    addSchemaEntry: PropTypes.func.isRequired,
    addOverlay: PropTypes.func.isRequired,
    closeOverlay: PropTypes.func.isRequired,
    validateSchemaEntrySlug: PropTypes.func.isRequired,
    updateSchemaEntry: PropTypes.func.isRequired,
    restoreSchemaEntry: PropTypes.func.isRequired,
    entryId: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired
  }

  getInitState () {
    if (this.props.entryId === 'new') {
      this.props.changeSchemaEntryToDefault();
    }
    return {};
  }

  componentWillUnmount () {
    if (this.successTimeout) {
      clearTimeout(this.successTimeout);
    }
  }

  async onSubmit (schemaEntryProps) {
    if (this.successTimeout) {
      clearTimeout(this.successTimeout);
    }

    const submitSchemaEntry = cloneDeep(schemaEntryProps);

    let action;

    if (this.isNew()) {
      submitSchemaEntry.createdBy = this.props.user._id;
      action = this.props.addSchemaEntry;
    } else {
      submitSchemaEntry.createdBy = submitSchemaEntry.createdBy._id;
      action = this.props.updateSchemaEntry;
    }

    submitSchemaEntry.updatedBy = this.props.user._id;

    try {
      const resultSchemaEntry = await action(this.constructor.fragments, this.props.schema._id, submitSchemaEntry);
      this.setState({
        saving: false,
        success: true,
        error: false
      });
      this.props.history.pushState({}, `/admin/schema/${this.props.schema._id}/${resultSchemaEntry._id}`);
      this.successTimeout = setTimeout(::this.onSuccessOut, 3000);
    } catch (err) {
      this.setState({
        saving: false,
        error: true
      });
    }
  }

  onSuccessOut () {
    clearTimeout(this.successTimeout);
    // FIXME
    // const dom = findDOMNode(this.refs.success);
    //
    // if (dom) {
    //   const transition = 'transition.slideDownOut';
    //   Velocity(dom, transition, {
    //     duration: 400,
    //     display: null
    //   }).then(() => {
    //     this.setState({
    //       success: false
    //     });
    //   });
    // }
  }

  onSaveDraft () {
    this.setState({
      saving: true,
      savingLabel: 'Saving draft'
    });

    this.onSubmit(this.props.schemaEntry);
  }

  onUpdate () {
    this.setState({
      saving: true,
      savingLabel: 'Updating schema entry'
    });

    this.onSubmit(this.props.schemaEntry);
  }

  onPublish () {
    const clone = Object.assign({}, this.props.schemaEntry, {
      state: 'published'
    });

    this.setState({
      saving: true,
      savingLabel: 'Publishing'
    });

    this.onSubmit(clone);
  }

  onUnpublish () {
    const clone = Object.assign({}, this.props.schemaEntry, {
      state: 'draft'
    });

    this.setState({
      saving: true,
      savingLabel: 'Saving and unpublishing'
    });

    this.onSubmit(clone);
  }

  onChange (values) {
    this.props.changeSchemaEntryFields(values);
  }

  async onRestore (__v) {
    this.setState({
      saving: true,
      savingLabel: 'Restoring revision'
    });

    try {
      const schemaEntry = await this.props.restoreSchemaEntry(
        this.constructor.fragments,
        this.props.schema._id,
        this.props.schemaEntry._id, __v
      );

      this.setState({
        saving: false,
        success: true,
        error: false
      });

      history.pushState({}, '', `/admin/schema/${this.props.schema._id}/${schemaEntry.restoreSchemaEntry._id}`);
      this.successTimeout = setTimeout(::this.onSuccessOut, 3000);
    } catch (err) {
      this.setState({
        success: false,
        error: 'Error restoring schema entry revision'
      });
    }
  }

  getCurrentSchemaEntryProps () {
    const {schemaEntry} = this.props;

    return {
      _id: {
        _id: schemaEntry._id,
        __v: schemaEntry.__v
      },
      date: schemaEntry.updatedDate,
      user: schemaEntry.updatedBy,
      title: schemaEntry.title
    };
  }

  onRevisions (event) {
    event.preventDefault();
    this.props.addOverlay(
      'revisions',
      (
        <RevisionsContainer
          id={this.props.schemaEntry._id}
          onRestore={::this.onRestore}
          current={this.getCurrentSchemaEntryProps()}
        />
      )
    );
  }

  onRevertTemplate (event) {
    event.preventDefault();
  }

  onOverlap (event) {
    event.preventDefault();
  }

  isNew () {
    return !this.props.schemaEntry._id;
  }

  async validateSlug (slug, schemaEntryId = this.props.schemaEntry._id) {
    return await this.props.validateSchemaEntrySlug({slug, schemaId: this.props.schema._id, schemaEntryId});
  }

  render () {
    return (
      <SchemaEntry
        {...this.props}
        {...this.state}
        isNew={this.isNew()}
        onChange={::this.onChange}
        onPublish={::this.onPublish}
        onRevisions={::this.onRevisions}
        onRestore={::this.onRestore}
        onSaveDraft={::this.onSaveDraft}
        onUnpublish={::this.onUnpublish}
        onUpdate={::this.onUpdate}
        validateSlug={::this.validateSlug}
        onRevertTemplate={::this.onRevertTemplate}
        onOverlap={::this.onOverlap}
      />
    );
  }
}
