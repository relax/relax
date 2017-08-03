import React from 'react';
import PropTypes from 'prop-types';

import Component from 'components/component';
import truncateHtml from 'helpers/truncate-html';

export default class HtmlPresentation extends Component {
  static propTypes = {
    value: PropTypes.string
  };

  shouldComponentUpdate (nextProps) {
    return this.props.value !== nextProps.value;
  }

  render () {
    const {value} = this.props;

    return (
      <div dangerouslySetInnerHTML={{__html: truncateHtml(value, 150)}} />
    );
  }
}
