import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import propsSchema from './props-schema';
import settings from './settings';
import Component from '../component';
import DynamicList from './dynamic-list';

@connect(
  (state) => ({
    linkingData: state.pageBuilder.linkingData,
    linkingDataElementId: state.pageBuilder.linkingDataElementId
  })
)
export default class DynamicListContainer extends Component {
  static propTypes = {
    children: PropTypes.node,
    linkingData: PropTypes.bool,
    linkingDataElementId: PropTypes.string,
    relax: PropTypes.object.isRequired,
    limit: PropTypes.number,
    columns: PropTypes.number,
    verticalGutter: PropTypes.string,
    horizontalGutter: PropTypes.string,
    elementsLinks: PropTypes.object
  };

  static defaultProps = {
    limit: 10,
    columns: 2,
    verticalGutter: '10px',
    horizontalGutter: '10px'
  };

  static propsSchema = propsSchema;
  static settings = settings;

  render () {
    const {
      relax,
      elementsLinks,
      limit,
      columns,
      verticalGutter,
      horizontalGutter,
      linkingData,
      linkingDataElementId
    } = this.props;

    return (
      <DynamicList
        entries={[]}
        relax={relax}
        elementsLinks={elementsLinks}
        limit={limit}
        columns={columns}
        verticalGutter={verticalGutter}
        horizontalGutter={horizontalGutter}
        linkingData={linkingData}
        linkingDataElementId={linkingDataElementId}
      >
        {this.props.children}
      </DynamicList>
    );
  }
}
