import React from 'react';
import {Component} from 'relax-framework';
import GeminiScrollbar from 'react-gemini-scrollbar';
import Animate from '../animate';
import cx from 'classnames';

export default class DepthSelectMenu extends Component {
  onClick (element) {
    this.props.onClick(element);
  }

  onMouseOver (id, event) {
    this.context.overElement(id);
  }

  onMouseOut (id) {
    this.context.outElement(id);
  }

  renderElement (element) {
    const ElementClass = this.context.elements[element.tag];

    return (
      <div
        className='element-entry'
        onClick={this.onClick.bind(this, element)}
        onMouseEnter={this.onMouseOver.bind(this, element.id)}
        onMouseLeave={this.onMouseOut.bind(this, element.id)}
        key={element.id}
      >
        <i className={ElementClass.settings.icon.class}>{ElementClass.settings.icon.content}</i>
        <span>{element.label || element.tag}</span>
      </div>
    );
  }

  render () {
    let style = {
      top: this.props.position.top - 24,
      left: this.props.position.left + 20
    };

    return (
      <Animate transition='slideLeftIn'>
        <div className={cx('depth-select-menu')} style={style}>
          <div className='arrow-left'></div>
          <div className='ballon'>
            <div className='categories'>
              <GeminiScrollbar autoshow={true} className='gm-scrollbar-black'>
                <div className='category'>
                  <div className='category-info'>Link to</div>
                  {this.props.elements.map(this.renderElement, this)}
                </div>
              </GeminiScrollbar>
            </div>
          </div>
        </div>
      </Animate>
    );
  }
}

DepthSelectMenu.contextTypes = {
  elements: React.PropTypes.object.isRequired,
  overElement: React.PropTypes.func.isRequired,
  outElement: React.PropTypes.func.isRequired
};

DepthSelectMenu.propTypes = {
  position: React.PropTypes.object.isRequired,
  elements: React.PropTypes.array.isRequired,
  onClick: React.PropTypes.func.isRequired
};
