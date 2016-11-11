import Component from 'components/component';
import cx from 'classnames';
import React, {PropTypes} from 'react';

export default class ElementText extends Component {
  static propTypes = {
    value: PropTypes.string,
    className: PropTypes.string
  };

  render () {
    const {className, value} = this.props;

    return (
      <div
        className={cx(className)}
        dangerouslySetInnerHTML={{__html: value}}
      />
    );
  }
}
