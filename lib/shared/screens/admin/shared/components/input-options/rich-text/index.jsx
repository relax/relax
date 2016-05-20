import cx from 'classnames';
import Component from 'components/component';
import Editor from 'components/medium-editor';
import React, {PropTypes} from 'react';

import styles from './index.less';

export default class HtmlArea extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    white: PropTypes.bool
  };

  render () {
    const {className, value, onChange, white} = this.props;

    return (
      <div className={cx(styles.root, white && styles.white, className)}>
        <Editor
          tag='div'
          className={styles.editor}
          value={value}
          onChange={onChange}
          options={{
            toolbar: {
              buttons: ['bold', 'italic', 'underline', 'anchor']
            },
            placeholder: false,
            imageDragging: false
          }}
        />
      </div>
    );
  }
}
