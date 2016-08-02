import cx from 'classnames';
import Animate from 'components/animate';
import Component from 'components/component';
import Scrollable from 'components/scrollable';
import React, {PropTypes} from 'react';
import {mergeFragments} from 'relate-js';

import styles from './linking-data.less';
import Linking from './linking';
import List from './list';

export default class LinkingData extends Component {
  static fragments = mergeFragments(
    List.fragments,
    Linking.fragments,
    {
      schema: {
        _id: 1,
        title: 1
      }
    }
  );

  static propTypes = {
    section: PropTypes.oneOf(['list', 'linking']).isRequired,
    schemas: PropTypes.array,
    schemaId: PropTypes.string,
    schema: PropTypes.object,
    toggleSection: PropTypes.func.isRequired,
    pageBuilderActions: PropTypes.object.isRequired,
    changeSchema: PropTypes.func.isRequired,
    links: PropTypes.object.isRequired,
    linkingDataElementId: PropTypes.string.isRequired
  };

  render () {
    const {section} = this.props;
    let result;

    if (section === 'list') {
      result = this.renderList();
    } else if (section === 'linking') {
      result = this.renderLinking();
    }

    return (
      <div>
        {this.renderSelected()}
        <Scrollable className={styles.content}>
          {result}
        </Scrollable>
      </div>
    );
  }

  renderSelected () {
    const {schema, section, toggleSection} = this.props;
    return (
      <div className={styles.selected} onClick={toggleSection}>
        <span>
          {schema && schema.title || 'None selected'}
        </span>
        <i
          className={cx(
            'nc-icon-mini',
            section === 'linking' ? 'arrows-1_minimal-up' : 'arrows-1_minimal-down'
          )}
        />
      </div>
    );
  }

  renderList () {
    const {schemas, changeSchema} = this.props;

    return (
      <Animate
        transition='slideUpIn'
        duration={300}
        key='list'
      >
        <List
          schemas={schemas || []}
          changeSchema={changeSchema}
        />
      </Animate>
    );
  }

  renderLinking () {
    const {
      schema,
      links,
      pageBuilderActions,
      linkingDataElementId,
      schemaId
    } = this.props;

    return (
      <Animate
        transition='slideDownIn'
        duration={300}
        key='edit'
      >
        <Linking
          schema={schema}
          schemaId={schemaId}
          links={links}
          pageBuilderActions={pageBuilderActions}
          linkingDataElementId={linkingDataElementId}
        />
      </Animate>
    );
  }
}
