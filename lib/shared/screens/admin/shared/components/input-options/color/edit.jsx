import cx from 'classnames';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';

import styles from './edit.less';
import ColorPicker from './color-picker';
import ColorsCollection from './colors-collection';
import GradientPoints from './gradient-points';
import Inputs from './inputs';
import LinearGradient from './linear-gradient';
import Opacity from './opacity';
import RadialGradient from './radial-gradient';
import RadialRadius from './radial-radius';
import Types from './types';

export default class Edit extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    colr: PropTypes.object.isRequired,
    opacity: PropTypes.number.isRequired,
    editingPoint: PropTypes.number.isRequired,
    hsvChange: PropTypes.func.isRequired,
    rgbChange: PropTypes.func.isRequired,
    hexChange: PropTypes.func.isRequired,
    opacityChange: PropTypes.func.isRequired,
    inputType: PropTypes.string.isRequired,
    previousInputType: PropTypes.func.isRequired,
    nextInputType: PropTypes.func.isRequired,
    gradients: PropTypes.bool.isRequired,
    side: PropTypes.string.isRequired,
    changeToSolid: PropTypes.func.isRequired,
    changeToLinear: PropTypes.func.isRequired,
    changeToRadial: PropTypes.func.isRequired,
    value: PropTypes.object.isRequired,
    colors: PropTypes.array.isRequired,
    changeEditingPoint: PropTypes.func.isRequired,
    pointPercChange: PropTypes.func.isRequired,
    toggleOpened: PropTypes.func.isRequired,
    infoElement: PropTypes.any,
    changeAngle: PropTypes.func.isRequired,
    changeRadius: PropTypes.func.isRequired,
    changeCenter: PropTypes.func.isRequired,
    addPoint: PropTypes.func.isRequired,
    removePoint: PropTypes.func.isRequired,
    showCollection: PropTypes.func.isRequired,
    showOpacity: PropTypes.func.isRequired,
    noPicker: PropTypes.bool
  };

  componentDidMount () {
    if (!this.props.noPicker) {
      this.onCloseBind = ::this.onClose;
      document.body.addEventListener('mousedown', this.onCloseBind, false);
    }
  }

  componentWillUnmount () {
    if (!this.props.noPicker) {
      document.body.removeEventListener('mousedown', this.onCloseBind, false);
    }
  }

  onClose (event) {
    const holderRect = findDOMNode(this.refs.holder).getBoundingClientRect();
    const outOfHolder =
      (event.pageX < holderRect.left || event.pageX > holderRect.left + holderRect.width) ||
      (event.pageY < holderRect.top || event.pageY > holderRect.top + holderRect.height);

    let outOfGradient = true;
    if (this.refs.linearGradient) {
      const gradientRect = findDOMNode(this.refs.linearGradient).getBoundingClientRect();
      outOfGradient =
        (event.pageX < gradientRect.left - 10 || event.pageX > gradientRect.left + gradientRect.width + 10) ||
        (event.pageY < gradientRect.top - 10 || event.pageY > gradientRect.top + gradientRect.height + 10);
    }

    let outOfRadial = true;
    if (this.refs.radialGradient) {
      const gradientRect = findDOMNode(this.refs.radialGradient).getBoundingClientRect();
      outOfRadial =
        (event.pageX < gradientRect.left - 10 || event.pageX > gradientRect.left + gradientRect.width + 10) ||
        (event.pageY < gradientRect.top - 10 || event.pageY > gradientRect.top + gradientRect.height + 10);
    }

    let outOfInfo = true;
    if (this.props.infoElement) {
      const infoRect = findDOMNode(this.props.infoElement).getBoundingClientRect();
      outOfInfo =
        (event.pageX < infoRect.left || event.pageX > infoRect.left + infoRect.width) ||
        (event.pageY < infoRect.top || event.pageY > infoRect.top + infoRect.height);
    }

    if (outOfHolder && outOfGradient && outOfInfo && outOfRadial) {
      event.preventDefault();
      event.stopPropagation();
      this.props.toggleOpened();
    }
  }

  render () {
    const {
      type,
      colr,
      opacity,
      gradients,
      hsvChange,
      rgbChange,
      hexChange,
      opacityChange,
      inputType,
      previousInputType,
      nextInputType,
      editingPoint,
      showOpacity,
      showCollection,
      noPicker
    } = this.props;
    const isGradient = (type === 'linear' || type === 'radial');

    return (
      <div className={cx(styles.root, noPicker && styles.noPicker)} ref='holder'>
        <span className={cx(styles.triangle, this.props.side)} />
        {gradients &&
          <Types
            type={type}
            changeToSolid={this.props.changeToSolid}
            changeToLinear={this.props.changeToLinear}
            changeToRadial={this.props.changeToRadial}
          />
        }
        {isGradient &&
          <GradientPoints
            editingPoint={editingPoint}
            value={this.props.value}
            colors={this.props.colors}
            changeEditingPoint={this.props.changeEditingPoint}
            pointPercChange={this.props.pointPercChange}
            addPoint={this.props.addPoint}
            removePoint={this.props.removePoint}
          />
        }
        <ColorPicker colr={colr} hsvChange={hsvChange} />
        {showOpacity && <Opacity colr={colr} opacity={opacity} opacityChange={opacityChange} />}
        <Inputs
          colr={colr}
          opacity={opacity}
          inputType={inputType}
          previousInputType={previousInputType}
          nextInputType={nextInputType}
          hsvChange={hsvChange}
          rgbChange={rgbChange}
          hexChange={hexChange}
          opacityChange={opacityChange}
          showOpacity={showOpacity}
        />
        {type === 'radial' &&
          <RadialRadius
            radius={this.props.value.radius}
            changeRadius={this.props.changeRadius}
          />
        }
        {showCollection && <ColorsCollection {...this.props} />}
        {type === 'linear' &&
          <LinearGradient
            ref='linearGradient'
            editingPoint={editingPoint}
            value={this.props.value}
            colors={this.props.colors}
            changeEditingPoint={this.props.changeEditingPoint}
            pointPercChange={this.props.pointPercChange}
            changeAngle={this.props.changeAngle}
            addPoint={this.props.addPoint}
          />
        }
        {type === 'radial' &&
          <RadialGradient
            ref='radialGradient'
            editingPoint={editingPoint}
            value={this.props.value}
            colors={this.props.colors}
            changeEditingPoint={this.props.changeEditingPoint}
            pointPercChange={this.props.pointPercChange}
            changeCenter={this.props.changeCenter}
            addPoint={this.props.addPoint}
          />
        }
      </div>
    );
  }
}
