import React from 'react';

import Background from './background';
import BorderPicker from './border';
import BorderStyle from './border-style';
import BoxShadow from './box-shadow';
import Button from './button';
import Buttons from './buttons';
import Checkbox from './checkbox';
import ColorPicker from './color';
import Combobox from './combobox';
import CornersPicker from './corners';
import Custom from './custom';
import DatePicker from './date-picker';
import Display from './display';
import Filters from './filters';
import FontPicker from './font';
import IconPicker from './icon';
import ImagePicker from './image';
import Input from './input';
import LinkPicker from './link';
import MarginPadding from './margin-padding';
import NumberInput from './number';
import Optional from './optional';
import Position from './position';
import RichText from './rich-text';
import Section from './section';
import ShadowPosition from './shadow-position';
import Sorts from './sorts';
import SpacingPicker from './spacing';
import TextShadow from './text-shadow';
import TitablePicker from './titable-picker';
import UserPicker from './user';

export default {
  Background,
  Buttons,
  TextAlign: Buttons,
  TextTransform: Buttons,
  Color: ColorPicker,
  Custom,
  String: Input,
  Image: ImagePicker,
  Audio: ImagePicker,
  Select: Combobox,
  Ease: Combobox,
  TitablePicker,
  Number: NumberInput,
  Pixels: NumberInput,
  Percentage: NumberInput,
  Padding: SpacingPicker,
  Margin: SpacingPicker,
  Boolean: Checkbox,
  Font: FontPicker,
  Button,
  Icon: IconPicker,
  Corners: CornersPicker,
  Border: BorderPicker,
  LineStyle: BorderStyle,
  Optional,
  Section,
  Html: RichText,
  Filters,
  Sorts,
  TextShadow,
  BoxShadow,
  ShadowPosition,
  Date: DatePicker,
  Link: LinkPicker,
  User: UserPicker,
  Position,
  MarginPadding,
  Display
};

export const TypesOptionsDefaultProps = {
  Pixels: {
    allowed: ['px']
  },
  Percentage: {
    min: 0,
    max: 100,
    allowed: ['%']
  },
  Padding: {
    type: 'padding'
  },
  Margin: {
    type: 'margin'
  },
  Audio: {
    width: 50,
    height: 50,
    type: 'audio'
  },
  TextAlign: {
    values: ['left', 'center', 'right', 'justify'],
    labels: [
      <i className='nc-icon-outline text_align-left' />,
      <i className='nc-icon-outline text_align-center' />,
      <i className='nc-icon-outline text_align-right' />,
      <i className='nc-icon-outline text_align-justify' />
    ],
    tooltips: ['Left', 'Center', 'Right', 'Justify']
  },
  TextTransform: {
    values: ['none', 'uppercase', 'lowercase', 'capitalize'],
    labels: [
      <i className='nc-icon-outline ui-2_ban' />,
      <i className='nc-icon-outline text_caps-all' />,
      <i className='nc-icon-outline text_caps-small' />,
      <i className='nc-icon-outline text_capitalize' />
    ],
    tooltips: ['None', 'Uppercase', 'Lowercase', 'Capitalize']
  },
  Ease: {
    /* eslint-disable max-len */
    values: [
      'cubic-bezier(0.47, 0, 0.745, 0.715)', 'cubic-bezier(0.39, 0.575, 0.565, 1)', 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
      'cubic-bezier(0.55, 0.085, 0.68, 0.53)', 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
      'cubic-bezier(0.55, 0.055, 0.675, 0.19)', 'cubic-bezier(0.215, 0.61, 0.355, 1)', 'cubic-bezier(0.645, 0.045, 0.355, 1)',
      'cubic-bezier(0.895, 0.03, 0.685, 0.22)', 'cubic-bezier(0.165, 0.84, 0.44, 1)', 'cubic-bezier(0.77, 0, 0.175, 1)',
      'cubic-bezier(0.755, 0.05, 0.855, 0.06)', 'cubic-bezier(0.23, 1, 0.32, 1)', 'cubic-bezier(0.86, 0, 0.07, 1)',
      'cubic-bezier(0.95, 0.05, 0.795, 0.035)', 'cubic-bezier(0.19, 1, 0.22, 1)', 'cubic-bezier(1, 0, 0, 1)',
      'cubic-bezier(0.6, 0.04, 0.98, 0.335)', 'cubic-bezier(0.075, 0.82, 0.165, 1)', 'cubic-bezier(0.785, 0.135, 0.15, 0.86)',
      'cubic-bezier(0.6, -0.28, 0.735, 0.045)', 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    ],
    /* eslint-enable max-len */
    labels: [
      'Ease In Sine', 'Ease Out Sine', 'Ease In Out Sine',
      'Ease In Quad', 'Ease Out Quad', 'Ease In Out Quad',
      'Ease In Cubic', 'Ease Out Cubic', 'Ease In Out Cubic',
      'Ease In Quart', 'Ease Out Quart', 'Ease In Out Quart',
      'Ease In Quint', 'Ease Out Quint', 'Ease In Out Quint',
      'Ease In Expo', 'Ease Out Expo', 'Ease In Out Expo',
      'Ease In Circ', 'Ease Out Circ', 'Ease In Out Circ',
      'Ease In Back', 'Ease Out Back', 'Ease In Out Back'
    ]
  }
};
