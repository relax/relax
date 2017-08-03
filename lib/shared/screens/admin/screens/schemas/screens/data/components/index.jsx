import React from 'react';
import PropTypes from 'prop-types';

import Component from 'components/component';
import ContentHeader from 'components/content-header';
import ContentHeaderActions from 'components/content-header-actions';
import ContentLoading from 'components/content-loading';
import ContentNew from 'components/content-new';
import EditableTitle from 'components/editable-title';
import List from './list';
import {mergeFragments} from 'relate-js';
import styles from './index.less';

export default class DataSchema extends Component {
  static fragments = mergeFragments({
    schema: {
      _id: 1,
      title: 1
    }
  }, {schema: List.fragments.schema});

  static propTypes = {
    schema: PropTypes.object,
    loading: PropTypes.bool.isRequired
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

  renderContent () {
    const {schema} = this.props;
    return (
      <div>
        <ContentHeader>
          <div className={styles.info}>
            <EditableTitle value={schema.title} onSubmit />
          </div>
          <ContentHeaderActions>
            <ContentNew url={`/admin/schemas/data/${schema._id}/new`}>
              Add new entry
            </ContentNew>
            <ContentNew url={`/admin/schemas/data/${schema._id}/edit`}>
              Edit Content Type
            </ContentNew>
          </ContentHeaderActions>
        </ContentHeader>
        <List schema={schema} />
      </div>
    );
  }

  renderNotFound () {
    return (
      <div>Schema not found</div>
    );
  }
}
