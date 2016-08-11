import BorderPicker from 'components/input-options/border';
import BorderStyle from 'components/input-options/border-style';
import BoxShadow from 'components/input-options/box-shadow';
import Button from 'components/input-options/button';
import Checkbox from 'components/input-options/checkbox';
import ColorPicker from 'components/input-options/color';
import ColumnsManager from 'components/input-options/columns';
import Combobox from 'components/input-options/combobox';
import CornersPicker from 'components/input-options/corners';
import DatePicker from 'components/input-options/date-picker';
import Filters from 'components/input-options/filters';
import FontPicker from 'components/input-options/font';
import IconPicker from 'components/input-options/icon';
import ImagePicker from 'components/input-options/image';
import Input from 'components/input-options/input';
import LinkPicker from 'components/input-options/link';
import NumberInput from 'components/input-options/number';
import Optional from 'components/input-options/optional';
import RichText from 'components/input-options/rich-text';
import Section from 'components/input-options/section';
import ShadowPosition from 'components/input-options/shadow-position';
import Sorts from 'components/input-options/sorts';
import SpacingPicker from 'components/input-options/spacing';
import TextShadow from 'components/input-options/text-shadow';
import TitablePicker from 'components/input-options/titable-picker';
import UserPicker from 'components/input-options/user';

export const TypesOptionsMap = {
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
  User: UserPicker
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
