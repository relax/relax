import velocity from 'velocity-animate';
import Component from 'components/component';
import {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';

export default class Animate extends Component {
  static propTypes = {
    transition: PropTypes.string,
    duration: PropTypes.number,
    children: PropTypes.node,
    options: PropTypes.object,
    initial: PropTypes.bool
  };

  static defaultProps = {
    transition: 'slideUpIn',
    duration: 400,
    options: {},
    initial: true
  };

  componentDidMount () {
    if (this.props.initial) {
      this.makeTransition(this.props);
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.transition !== nextProps.transition) {
      this.makeTransition(nextProps);
    }
  }

  makeTransition (props) {
    const dom = findDOMNode(this);
    const transition = `transition.${props.transition}`;
    velocity(dom, transition, Object.assign({
      duration: props.duration,
      display: null
    }, props.options));
  }

  render () {
    return this.props.children;
  }
}
