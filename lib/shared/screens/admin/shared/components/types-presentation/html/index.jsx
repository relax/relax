import Component from 'components/component';
import React, {PropTypes} from 'react';

export default class HtmlPresentation extends Component {
  static propTypes = {
    value: PropTypes.string
  };

  render () {
    const {value} = this.props;
    return (
      <div dangerouslySetInnerHTML={{__html: value}} />
    );
  }
}
