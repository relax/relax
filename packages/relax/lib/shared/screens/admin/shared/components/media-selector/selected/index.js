import Component from 'components/component';
import React, {PropTypes} from 'react';
import {dataConnect} from 'relate-js';

import Selected from './selected';

@dataConnect(
  (props) => {
    const result = {
      fragments: {},
      variablesTypes: {
        mediaItem: {
          id: 'ID!'
        }
      },
      initialVariables: {
        mediaItem: {
          id: props.selected
        }
      }
    };

    if (props.selected) {
      result.fragments = Selected.fragments;
    }

    return result;
  }
)
export default class MediaSelectorSelectedContainer extends Component {
  static propTypes = {
    selected: PropTypes.string,
    mediaItem: PropTypes.object
  };

  componentWillReceiveProps (nextProps) {
    if (this.props.selected !== nextProps.selected && nextProps.selected) {
      this.props.relate.refresh(nextProps);
    }
  }

  render () {
    const {mediaItem, selected} = this.props;
    return (
      <Selected
        mediaItem={mediaItem}
        selected={selected}
      />
    );
  }
}
