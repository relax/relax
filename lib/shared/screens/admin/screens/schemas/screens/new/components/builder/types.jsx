import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './types.less';
import Type from './type';

export default class SchemaTypes extends Component {
  static propTypes = {
    changeSchemaType: PropTypes.func.isRequired
  };

  render () {
    const {changeSchemaType} = this.props;
    return (
      <div className={styles.root}>
        <div className={styles.subHeader}>Let's create some new content types!</div>
        <div className={styles.header}>What type of content is this?</div>
        <div className={styles.options}>
          <Type
            changeSchemaType={changeSchemaType}
            image='/images/admin/url-schema-icon.png'
            title='With URL'
            subTitle='Single Page'
            type='single'
          />
          <div className={styles.or}>or</div>
          <Type
            changeSchemaType={changeSchemaType}
            image='/images/admin/data-schema-icon.png'
            title='Without URL'
            subTitle='Multiple Table Entries'
            type='data'
          />
        </div>
      </div>
    );
  }
}
