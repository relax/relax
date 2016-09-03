import './index.less';

import bind from 'decorators/bind';
import key from 'keymaster';
import Component from 'components/component';
import MediumEditor from 'medium-editor';
import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';

export default class MediumEditorElement extends Component {
  static propTypes = {
    tag: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.object
  };

  static defaultProps = {
    tag: 'div'
  };

  getInitState () {
    this.currentValue = this.props.value;
    return {
      value: this.props.value
    };
  }

  componentDidMount () {
    const {options} = this.props;

    this.medium = new MediumEditor(findDOMNode(this), Object.assign({
      toolbar: {
        buttons: ['bold', 'italic', 'underline', 'anchor']
      },
      placeholder: 'Double click to edit text',
      imageDragging: false
    }, options));
    this.medium.subscribe('editableInput', this.onChange);
  }

  componentWillReceiveProps (nextProps) {
    if (this.currentValue !== nextProps.value) {
      this.currentValue = nextProps.value;
      this.setState({
        value: nextProps.value
      });
    }
  }

  componentWillUnmount () {
    this.medium.destroy();
  }

  @bind
  onFocus () {
    console.log('focus');
    key.setScope('mediumEditor');
  }

  @bind
  onBlur () {
    console.log('unfocus');
    key.setScope('pageBuilder');
  }

  @bind
  onChange () {
    const value = findDOMNode(this).innerHTML;
    this.currentValue = value;
    this.props.onChange && this.props.onChange(value);
  }

  render () {
    return (
      <this.props.tag
        className={this.props.className}
        contentEditable
        dangerouslySetInnerHTML={{__html: this.state.value}}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
      />
    );
  }
}
