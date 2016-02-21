import Component from 'components/component';
import Portal from 'components/portal';
import Stick from 'components/stick';
import React, {PropTypes} from 'react';

export default class Balloon extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    element: PropTypes.any.isRequired
  };

  render () {
    return (
      <Portal>
        <Stick element={this.props.element} verticalPosition='bottom' horizontalPosition='left' transition='slideUpIn' horizontalOffset={-9}>
          <div className='balloon'>
            <span className='triangle'/>
            <div className='content'>
              {this.props.children}
            </div>
          </div>
        </Stick>
      </Portal>
    );
  }
}
