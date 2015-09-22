import React from 'react';
import SchemaLinking from './schema-linking';

import Canvas from './canvas';
import Chrome from './chrome';
import factory from './factory';

class SchemaModuleBuilder extends SchemaLinking {
  onSave () {
    this.props.onSave(this.context.page);
  }

  onSwitch () {
    this.context.page.switchBackground = this.context.page.switchBackground === true ? false : true;
    this.props.onSwitch();
  }

  render () {
    return (
      <div className='schema-module-builder-wrapper'>
        <div className='header'>
          <div className='title'>Create the model to be replicated for each entry <span className='switch' onClick={this.onSwitch.bind(this)}>Switch background</span></div>
          <div className='button button-primary' onClick={this.onSave.bind(this)}>Save model</div>
          <div className='button button-faded-grey' onClick={this.props.onClose}>Close without saving</div>
        </div>
        <div className='editing-part'>
          <Canvas />
        </div>
        <div className='options-part'>
          <Chrome />
        </div>
        {this.renderDraggingLine()}
        {this.renderPossibilities()}
      </div>
    );
  }
}

SchemaModuleBuilder.contextTypes = {
  page: React.PropTypes.object.isRequired
};

export default factory(SchemaModuleBuilder, {
  className: 'schema-module-builder'
});
