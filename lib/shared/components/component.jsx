import React from 'react';

export default class BaseComponent extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.state = this.getInitState ? this.getInitState() : {};
  }

  isClient () {
    return typeof document !== 'undefined';
  }
}
