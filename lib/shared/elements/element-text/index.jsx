import Component from 'components/component';
import Editor from 'components/medium-editor';
import bind from 'decorators/bind';
import cx from 'classnames';
import React, {PropTypes} from 'react';
import {changeElementContent} from 'actions/page-builder';

import styles from './index.less';

export default class ElementText extends Component {
  static propTypes = {
    relax: PropTypes.object.isRequired,
    value: PropTypes.string,
    className: PropTypes.string
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  @bind
  onChange (value) {
    const {store} = this.context;
    const {relax} = this.props;
    store.dispatch(changeElementContent(relax.element.id, value, relax.context));
  }

  render () {
    const {relax, className, value} = this.props;
    const {editing, selected} = relax;
    let result;

    if (editing && selected) {
      result = (
        <Editor
          tag='div'
          className={className}
          onChange={this.onChange}
          value={value}
        />
      );
    } else {
      result = (
        <div
          className={cx(className, editing && styles.cursor)}
          dangerouslySetInnerHTML={{__html: value}}
        />
      );
    }

    return result;
  }
}
