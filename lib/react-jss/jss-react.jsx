import React from 'react';

import jss from './index';

export default class JSSReact extends React.Component {
  componentDidMount () {
    // jss.on('update', this.onUpdate.bind(this));
    this.onUpdate();
  }

  onUpdate () {
    this.forceUpdate();
  }

  render () {
    return <style dangerouslySetInnerHTML={{__html: jss.toString()}} />;
  }
}
