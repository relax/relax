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
    onSave: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired
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
  onSave (event) {
    const {onSave} = this.props;

    event.preventDefault();
    onSave(this.state.title);
  }

  @bind
  onUpdate (event) {
    const {onUpdate} = this.props;

    event.preventDefault();
    onUpdate();
  }

  render () {
    const {editingTitle, title} = this.state;
    const {selectedStyle} = this.props;
    let result;

    if (editingTitle) {
      result = (
        <Animate transition='slideRightIn' duration={300}>
          <form onSubmit={this.onSave}>
            <Input
              className={styles.input}
              placeholder='Style title'
              value={title}
              onChange={this.changeTitle}
              focused
            />
            <div className={styles.submitButton} onClick={this.onSave}>
              <i className='nc-icon-outline arrows-1_tail-right'></i>
            </div>
            <input type='submit' hidden />
          </form>
        </Animate>
      );
    } else {
      result = (
        <div>
          {
            selectedStyle &&
            <Button
              primary
              big
              onClick={this.onUpdate}
              className={styles.saveButton}
            >
              Update style
            </Button>
          }
          <Button
            primary
            full={!selectedStyle}
            noBackground={!!selectedStyle}
            big
            onClick={this.toggleEditingTitle}
            className={styles.saveButton}
          >
            Create new
          </Button>
        </div>
      );
    }

    return (
      <div className={styles.saveStyle}>
        {result}
      </div>
    );
  }
}
