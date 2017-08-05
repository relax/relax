import velocity from 'relax-velocity-animate';
import Component from 'components/component';
import PropTypes from 'prop-types';
import {findDOMNode} from 'react-dom';

export default class AnimateProps extends Component {
  static propTypes = {
    props: PropTypes.object,
    options: PropTypes.object,
    children: PropTypes.node
  };

  static defaultProps = {
    props: {},
    options: {}
  };

  componentDidMount () {
    const dom = findDOMNode(this);
    velocity(dom, this.props.props, this.props.options);
  }

  render () {
    return this.props.children;
  }
}
