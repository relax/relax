import React from 'react';
import PropTypes from 'prop-types';

import Component from 'components/component';
import MediaItem from 'components/media-item-preview';
import {dataConnect} from 'relate-js';
import styles from './index.less';

@dataConnect(
  (props) => {
    let result = {};

    if (props.value) {
      result = {
        fragments: MediaItem.fragments,
        variablesTypes: {
          mediaItem: {
            id: 'ID!'
          }
        },
        initialVariables: {
          mediaItem: {
            id: props.value
          }
        }
      };
    }

    return result;
  }
)
export default class ImagePresentation extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    mediaItem: PropTypes.object
  };

  render () {
    const {mediaItem} = this.props;

    return (
      <div className={styles.root}>
        <MediaItem
          mediaItem={mediaItem}
          width={80}
          height={80}
          useThumbnail
        />
      </div>
    );
  }
}
