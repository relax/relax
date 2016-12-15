import Component from 'components/component';
import React from 'react';
import relaxElement from 'decorators/relax-element';

@relaxElement()
export default class BodyElement extends Component {
  render () {
    return (
      <div>
        BODY
      </div>
    );
  }
}
