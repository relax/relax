import cx from 'classnames';
import A from 'components/a';
import Button from 'components/menu-button';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './content-types.less';

export default class ContentTypes extends Component {
  static fragments = {
    schemas: {
      _id: 1,
      title: 1,
      type: 1
    }
  };

  static propTypes = {
    active: PropTypes.string,
    onActiveClick: PropTypes.func.isRequired,
    schemas: PropTypes.array.isRequired
  };

  render () {
    const {schemas} = this.props;
    return (
      <div className={styles.contentTypes}>
        <div className={styles.header}>
          <span className={styles.text}>Content Types</span>
          <A href='/admin/schemas/new' className={styles.button}>
            <i className='nc-icon-mini ui-1_circle-bold-add'></i>
          </A>
        </div>
        {schemas.map(this.renderSchema, this)}
      </div>
    );
  }

  renderSchema (schema) {
    const {active, onActiveClick} = this.props;
    return (
      <Button
        link={`/admin/schemas/${schema.type}/${schema._id}`}
        label={schema.title}
        icon={cx(
          'nc-icon-outline',
          schema.type === 'single' ? 'design_webpage' : 'files_single-copy-04'
        )}
        active={active === schema._id}
        onActiveClick={onActiveClick}
        dark
      />
    );
  }
}
