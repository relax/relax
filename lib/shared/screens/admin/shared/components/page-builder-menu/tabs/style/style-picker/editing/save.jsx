import bind from 'decorators/bind';
import Animate from 'components/animate';
import Button from 'components/button';
import Component from 'components/component';
import Input from 'components/input-options/input';
import React, {PropTypes} from 'react';

import styles from './save.less';

export default class StylePickerSave extends Component {
  static propTypes = {
    selectedStyle: PropTypes.object,
    onSubmit: PropTypes.func.isRequired
  };

  getInitState () {
    return {
      editingTitle: false,
      title: ''
    };
  }

  @bind
  changeTitle (title) {
    this.setState({
      title
    });
  }

  @bind
  toggleEditingTitle () {
    this.setState({
      editingTitle: !this.state.editingTitle
    });
  }

  @bind
  onSubmit (event) {
    const {onSubmit} = this.props;

    event.preventDefault();
    onSubmit(this.state.title);
  }

  render () {
    const {editingTitle, title, selectedStyle} = this.state;
    let result;

    if (selectedStyle) {
      result = (
        <div className={styles.saveStyle}>
          <Button
            primary
            full
            big
            onClick={this.onSubmit}
            className={styles.saveButton}
          >
            {`Update ${selectedStyle.title}`}
          </Button>
        </div>
      );
    } else if (editingTitle) {
      result = (
        <div className={styles.saveStyle}>
          <Animate transition='slideRightIn' duration={300}>
            <form onSubmit={this.onSubmit}>
              <Input
                className={styles.input}
                placeholder='Style title'
                value={title}
                onChange={this.changeTitle}
                focused
              />
            <div className={styles.submitButton} onClick={this.onSubmit}>
                <i className='nc-icon-outline arrows-1_tail-right'></i>
              </div>
              <input type='submit' hidden />
            </form>
          </Animate>
        </div>
      );
    } else {
      result = (
        <div className={styles.saveStyle}>
          <Button
            primary
            full
            big
            onClick={this.toggleEditingTitle}
            className={styles.saveButton}
          >
            Create new style
          </Button>
        </div>
      );
    }

    return result;
  }
}
