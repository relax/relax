import './index.less';

import Component from 'components/component';
import MediumEditor from 'medium-editor';
import React from 'react';
import {findDOMNode} from 'react-dom';

export default class MediumEditorElement extends Component {
  static propTypes = {
    tag: React.PropTypes.string,
    className: React.PropTypes.string,
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    options: React.PropTypes.obj
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
    this.medium = new MediumEditor(findDOMNode(this), this.props.options);
    this.medium.subscribe('editableInput', this.onChange.bind(this));
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
      />
    );
  }
}
