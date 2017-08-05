import Animate from 'components/animate';
import Component from 'components/component';
import Scrollable from 'components/scrollable';
import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import {mergeFragments} from 'relate-js';

import Linking from './linking';
import List from './list';
import styles from './linking-data.less';

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
    links: PropTypes.object.isRequired,
    toggleSection: PropTypes.func.isRequired,
    changeSchema: PropTypes.func.isRequired,
    addSchemaLink: PropTypes.func.isRequired,
    changeLinkAction: PropTypes.func.isRequired,
    removeLink: PropTypes.func.isRequired,
    overLink: PropTypes.func.isRequired,
    outLink: PropTypes.func.isRequired,
    context: PropTypes.object.isRequired,
    goal: PropTypes.string.isRequired,
    extraLinks: PropTypes.array.isRequired
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
    const {schema, schemaId, section, toggleSection} = this.props;
    let label;

    if (schemaId === 'page') {
      label = 'Page';
    } else {
      label = schema && schema.title || 'None selected';
    }

    return (
      <div className={styles.selected} onClick={toggleSection}>
        <span>
          {label}
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
    const {schemas, changeSchema, goal} = this.props;

    return (
      <Animate
        transition='slideUpIn'
        duration={300}
        key='list'
      >
        <List
          schemas={schemas || []}
          changeSchema={changeSchema}
          goal={goal}
        />
      </Animate>
    );
  }

  renderLinking () {
    const {
      schema,
      links,
      schemaId,
      addSchemaLink,
      changeLinkAction,
      removeLink,
      overLink,
      outLink,
      context,
      extraLinks,
      goal
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
          addSchemaLink={addSchemaLink}
          changeLinkAction={changeLinkAction}
          removeLink={removeLink}
          overLink={overLink}
          outLink={outLink}
          context={context}
          extraLinks={extraLinks}
          goal={goal}
        />
      </Animate>
    );
  }
}
