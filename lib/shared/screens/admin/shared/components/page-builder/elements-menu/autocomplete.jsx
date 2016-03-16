import Component from 'components/component';
import React from 'react';

import styles from './autocomplete.less';

export default class Autocomplete extends Component {
  static propTypes = {
    autoFocus: React.PropTypes.bool,
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    suggestion: React.PropTypes.string
  };

  static defaultProps = {
    autoFocus: true
  };

  componentDidMount () {
    if (this.props.autoFocus) {
      this.focus();
    }
  }

  onInput () {
    const str = this.refs.editable.innerText;
    this.props.onChange(str);
  }

  focus () {
    const el = this.refs.editable;
    el.focus();
    if (typeof window.getSelection !== 'undefined' && typeof document.createRange !== 'undefined') {
      const range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    } else if (typeof document.body.createTextRange !== 'undefined') {
      const range = document.body.createTextRange();
      range.moveToElementText(el);
      range.collapse(false);
      range.select();
    }
  }

  render () {
    let before = '';
    let after = '';
    if (this.props.suggestion) {
      const index = this.props.suggestion.toLowerCase().indexOf(this.props.value.toLowerCase());
      before = index > 0 && this.props.suggestion.slice(0, index);
      after = this.props.suggestion.slice(index + this.props.value.length);
    }

    return (
      <div className={styles.autocomplete}>
        <span onClick={::this.focus}>{before}</span>
        <span
          ref='editable'
          className={styles.editable}
          onInput={::this.onInput}
          contentEditable
        >
          {this.props.value}
        </span>
        <span onClick={::this.focus}>{after}</span>
      </div>
    );
  }
}
