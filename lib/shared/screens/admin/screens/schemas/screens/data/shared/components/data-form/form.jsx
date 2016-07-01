import Component from 'components/component';
import Content from 'components/content';
import ContentHeader from 'components/content-header';
import ContentLoading from 'components/content-loading';
import OptionsList from 'components/options-list';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import styles from './form.less';

export default class DataSchemaForm extends Component {
  static propTypes = {
    schemaId: PropTypes.string.isRequired,
    loading: PropTypes.bool,
    properties: PropTypes.array,
    values: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  };

  render () {
    const {loading} = this.props;
    let result;

    if (loading) {
      result = this.renderLoading();
    } else {
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
        </ContentHeader>
        <Content>
          <OptionsList
            options={properties}
            values={values}
            onChange={onChange}
            white
          />
        </Content>
      </div>
    );
  }
}
