import React, {PropTypes} from 'react';
import Component from 'components/component';

import styles from './content-types.less';
import Button from './button';

export default class ContentTypes extends Component {
  static fragments = {
    schemas: {
      _id: 1,
      title: 1
    }
  };

  static propTypes = {
    schemas: PropTypes.array.isRequired
  };

  render () {
    const {schemas} = this.props;
    return (
      <div className={styles.contentTypes}>
        <div className={styles.header}>
          <span className={styles.text}>Content Types</span>
          <button className={styles.button}>
            <i className='nc-icon-mini ui-1_circle-bold-add'></i>
          </button>
        </div>
        {schemas.map(this.renderSchema, this)}
      </div>
    );
  }

  renderSchema (schema) {
    // design_webpage or files_single-copy-04
    return (
      <Button link='#' label={schema.title} icon='nc-icon-outline files_single-copy-04' />
    );
  }
}
