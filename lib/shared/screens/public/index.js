import 'styles/icons/font-awesome/index.less';
import 'styles/icons/google-icons/index.less';
import 'styles/icons/nucleo/index.less';
import 'styles/normalize.less';

import stylesheet from 'helpers/stylesheet';
import Component from 'components/component';
import Styles from 'components/styles';
import React, {PropTypes} from 'react';
import {loadFonts} from 'actions/fonts';
import {updateColors} from 'helpers/styles/colors';
import {bindActionCreators} from 'redux';
import {rootDataConnect, dataConnect} from 'relate-js';
import {Component as Jss} from 'relax-jss';

@rootDataConnect()
@dataConnect(
  (state) => ({
    fonts: state.fonts
  }),
  (dispatch) => bindActionCreators({loadFonts}, dispatch),
  () => ({
    fragments: {
      settings: {
        _id: 1,
        value: 1
      },
      colors: {
        _id: 1,
        label: 1,
        value: 1
      },
      styles: {
        _id: 1,
        title: 1,
        type: 1,
        options: 1
      }
    },
    variablesTypes: {
      settings: {
        ids: '[String]!'
      }
    },
    initialVariables: {
      settings: {
        ids: ['fonts']
      }
    }
  })
)
export default class PublicContainer extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    fonts: PropTypes.object.isRequired,
    loadFonts: PropTypes.func.isRequired,
    colors: PropTypes.array
  };

  init () {
    const {colors} = this.props;
    updateColors(colors);
  }

  componentDidMount () {
    this.props.loadFonts();
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.colors !== nextProps.colors) {
      updateColors(nextProps.colors);
    }
  }

  render () {
    return (
      <div>
        <Jss stylesheet={stylesheet} />
        <Styles single />
        <div>{this.props.children}</div>
      </div>
    );
  }
}
