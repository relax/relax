import React from 'react';

export default class BaseComponent extends React.Component {
  constructor (props, children) {
    super(props, children);
    this.state = this.getInitState ? this.getInitState() : {};
    this.initialize && this.initialize();
  }

  isClient () {
    return typeof document !== 'undefined';
  }
}
