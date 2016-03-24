import utils from 'helpers/utils';
import Component from 'components/component';
import React, {PropTypes} from 'react';

export default class Image extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number
  };

  static defaultProps = {
    width: 200,
    height: 0
  };

  render () {
    const {id, width, height, ...htmlProps} = this.props;
    let result = null;

    if (id) {
      const url = utils.getBestImageUrl(id, width, height);
      result = (
        <img src={url} {...htmlProps} />
      );
    }

    return result;
  }
}
