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
  Color: ColorPicker,
  Custom,
  String: Input,
  Image: ImagePicker,
  Audio: ImagePicker,
  Select: Combobox,
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
  }
};
