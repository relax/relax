import bind from 'decorators/bind';
import cx from 'classnames';
import Component from 'components/component';
import GeminiScrollbar from 'react-gemini-scrollbar';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.less';

export default class Scrollable extends Component {
  static propTypes = {
    children: PropTypes.node,
    autoshow: PropTypes.bool,
    className: PropTypes.string,
    lazyLoad: PropTypes.bool,
    loadMore: PropTypes.func,
    loadMoreTrigger: PropTypes.number,
    onScroll: PropTypes.func
  };

  static defaultProps = {
    autoshow: true,
    lazyLoad: false,
    loadMoreTrigger: 200
  };

  componentDidMount () {
    const {lazyLoad, onScroll} = this.props;
    if (lazyLoad) {
      this.refs.gemini.refs['scroll-view'].addEventListener('scroll', this.onScroll);
    }
    if (onScroll) {
      this.refs.gemini.refs['scroll-view'].addEventListener('scroll', onScroll);
    }
  }

  componentWillUnmount () {
    const {lazyLoad, onScroll} = this.props;
    if (lazyLoad && this.refs.gemini.refs['scroll-view']) {
      this.refs.gemini.refs['scroll-view'].removeEventListener('scroll', this.onScroll);
    }
    if (onScroll && this.refs.gemini.refs['scroll-view']) {
      this.refs.gemini.refs['scroll-view'].removeEventListener('scroll', onScroll);
    }
  }

  @bind
  onScroll (event) {
    const {loadMoreTrigger, loadMore} = this.props;
    const {clientHeight, scrollTop, scrollHeight} = event.target || event.srcElement;

    const toScroll = scrollHeight - clientHeight;
    const needsToLoadMore = (toScroll - scrollTop) < loadMoreTrigger;

    if (needsToLoadMore) {
      loadMore();
    }
  }

  render () {
    return (
      <div className={cx(this.props.className || styles.root, styles.scrollbar)}>
        <GeminiScrollbar
          autoshow={this.props.autoshow}
          forceGemini
          ref='gemini'
        >
          {this.props.children}
        </GeminiScrollbar>
      </div>
    );
  }
}
