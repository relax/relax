import React from 'react';

export default class BaseComponent extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.state = this.getInitState ? this.getInitState() : {};
    this.init && this.init();
    this.constructor.displayName = this.constructor.name;
  }

  isClient () {
    return typeof document !== 'undefined';
  }
}
