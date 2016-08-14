import cx from 'classnames';
import Button from 'components/button';
import Component from 'components/component';
import Modal from 'components/modal';
import NewTemplate from 'components/new-template';
import Titable from 'components/input-options/titable-picker';
import React, {PropTypes} from 'react';

import styles from './template.less';
import Progress from './progress';

export default class SchemaTemplatePick extends Component {
  static propTypes = {
    schema: PropTypes.object.isRequired,
    schemaStepBack: PropTypes.func.isRequired,
    changeSchemaTemplate: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    toggleNewTemplate: PropTypes.func.isRequired,
    newTemplate: PropTypes.bool.isRequired
  };

  render () {
    const {
      schema,
      schemaStepBack,
      onSubmit,
      changeSchemaTemplate,
      toggleNewTemplate
    } = this.props;

    return (
      <div className={styles.root}>
        <Progress schema={schema} title properties />
        <div className={styles.header}>
          ...Finally, let's create a new template or <br />
          assign an existing one
        </div>
        <div className={styles.subHeader}>
          What will <span className={styles.primary}>{schema.title}</span> look like?
        </div>
        <div className={styles.options}>
          <Button
            primary
            big
            bordered
            noBackground
            thin
            onClick={toggleNewTemplate}
          >
            Create New Template
          </Button>
          <div className={cx(styles.subHeader, styles.margin)}>
            or
          </div>
          <div className={cx(styles.subHeader, styles.margin)}>
            ASSIGN EXISTING TEMPLATE
          </div>
          <Titable
            type='templates'
            white
            value={schema.template}
            onChange={changeSchemaTemplate}
            className={styles.picker}
          />
        </div>
        <div className={styles.buttons}>
          <button className={styles.button} onClick={schemaStepBack}>
            Back
          </button>
          <button className={cx(styles.button, styles.primary)} onClick={onSubmit}>
            Create Schema
          </button>
        </div>
        {this.renderNewTemplate()}
      </div>
    );
  }

  renderNewTemplate () {
    const {newTemplate, toggleNewTemplate} = this.props;

    if (newTemplate) {
      return (
        <Modal
          small
          subTitle='New Template'
          title='What should we call it?'
          onClose={toggleNewTemplate}
        >
          <NewTemplate
            onClose={toggleNewTemplate}
            redirect={false}
          />
        </Modal>
      );
    }
  }
}
