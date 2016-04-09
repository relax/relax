import bind from 'decorators/bind';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './type.less';

export default class SchemaType extends Component {
  static propTypes = {
    changeSchemaType: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired
  };

  @bind
  onClick () {
    const {changeSchemaType, type} = this.props;
    changeSchemaType(type);
  }

  render () {
    const {image, title, subTitle} = this.props;
    return (
      <button className={styles.option} onClick={this.onClick}>
        <img className={styles.icon} src={image} width='64' />
        <div className={styles.title}>{title}</div>
        <div className={styles.subTitle}>{subTitle}</div>
      </button>
    );
  }
}
