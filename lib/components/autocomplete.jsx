import React from 'react';
import {Component} from 'relax-framework';

export default class Autocomplete extends Component {
  componentDidMount () {
    super.componentDidMount();
    const autoFocus = this.props.autoFocus;

    if (autoFocus) {
      this.focus();
    }
  }

  onInput (e) {
    var str = this.refs.editable.innerText;

    if (this.props.onChange) {
      this.props.onChange(str);
    }
  }

  focus () {
    var el = this.refs.editable;
    el.focus();
    if (typeof window.getSelection !== "undefined" && typeof document.createRange !== "undefined") {
      var range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    } else if (typeof document.body.createTextRange !== "undefined") {
      var textRange = document.body.createTextRange();
      textRange.moveToElementText(el);
      textRange.collapse(false);
      textRange.select();
    }
  }

  render () {
    var suggestion = '';

    if (this.props.suggestion !== '') {
      suggestion = this.props.suggestion.slice(this.props.value.length);
    }

    return (
      <div className='autocomplete'>
        <span ref='editable' className='editable' onInput={this.onInput.bind(this)} contentEditable={true}>{this.props.value}</span>
        <span onClick={this.focus.bind(this)}>{suggestion}</span>
      </div>
    );
  }
}

Autocomplete.propTypes = {
  autoFocus: React.PropTypes.bool,
  onChange: React.PropTypes.func,
  suggestion: React.PropTypes.string,
  value: React.PropTypes.string.isRequired
};

Autocomplete.defaultProps = {
  autoFocus: true
};
