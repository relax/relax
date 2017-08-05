import Button from 'components/button';
import Component from 'components/component';
import Modal from 'components/modal';
import NewTemplate from 'components/new-template';
import Titable from 'components/input-options/titable-picker';
import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './schema-template-picker.less';

export default class SchemaTemplatePicker extends Component {
  static propTypes = {
    toggleNew: PropTypes.func.isRequired,
    newOpened: PropTypes.bool,
    template: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  render () {
    const {toggleNew, onChange, template} = this.props;

    return (
      <div className={styles.root}>
        <Button
          primary
          big
          bordered
          noBackground
          thin
          onClick={toggleNew}
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
          value={template}
          onChange={onChange}
          className={styles.picker}
        />
        {this.renderNewTemplate()}
      </div>
    );
  }

  renderNewTemplate () {
    const {newOpened, toggleNew} = this.props;

    if (newOpened) {
      return (
        <Modal
          small
          subTitle='New Template'
          title='What should we call it?'
          onClose={toggleNew}
        >
          <NewTemplate
            onClose={toggleNew}
            redirect={false}
          />
        </Modal>
      );
    }
  }
}
