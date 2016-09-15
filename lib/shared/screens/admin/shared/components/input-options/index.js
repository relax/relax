import BorderPicker from './border';
import BorderStyle from './border-style';
import BoxShadow from './box-shadow';
import Button from './button';
import Checkbox from './checkbox';
import ColorPicker from './color';
import ColumnsManager from './columns';
import Combobox from './combobox';
import CornersPicker from './corners';
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
  Color: ColorPicker,
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
  ManageColumns: ColumnsManager,
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
  }
};
