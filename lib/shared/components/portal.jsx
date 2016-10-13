import React, {PropTypes} from 'react';

import Component from 'components/component';
import ReactDOM from 'react-dom';

export default class Portal extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    attachTo: PropTypes.string
  };

  componentDidMount () {
    this._target =
      this.props.attachTo ?
      document.getElementById(this.props.attachTo).appendChild(document.createElement('div')) :
      document.body.appendChild(document.createElement('div'));
    this._portal = ReactDOM.render(<div>{this.props.children}</div>, this._target);
  }

  componentDidUpdate () {
    this._portal = ReactDOM.render(<div>{this.props.children}</div>, this._target);
  }

  componentWillUnmount () {
    ReactDOM.unmountComponentAtNode(this._target);
    if (this.props.attachTo) {
      document.getElementById(this.props.attachTo).removeChild(this._target);
    } else {
      document.body.removeChild(this._target);
    }
  }

  render () {
    return null;
  }
}
