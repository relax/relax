import BorderPicker from 'components/input-options/border';
import BorderStyle from 'components/input-options/border-style';
import BoxShadow from 'components/input-options/box-shadow';
import Button from 'components/input-options/button';
import Checkbox from 'components/input-options/checkbox';
import ColorPicker from 'components/input-options/color';
import ColumnsManager from 'components/input-options/columns';
import Combobox from 'components/input-options/combobox';
import CornersPicker from 'components/input-options/corners';
import Filters from 'components/input-options/filters';
import FontPicker from 'components/input-options/font';
import IconPicker from 'components/input-options/icon';
import ImagePicker from 'components/input-options/image';
import Input from 'components/input-options/input';
import MenuPicker from 'components/input-options/menu';
import NumberInput from 'components/input-options/number';
import Optional from 'components/input-options/optional';
import PagePicker from 'components/input-options/page';
import RichText from 'components/input-options/rich-text';
import SchemaPicker from 'components/input-options/schema';
import Section from 'components/input-options/section';
import ShadowPosition from 'components/input-options/shadow-position';
import Sorts from 'components/input-options/sorts';
import SpacingPicker from 'components/input-options/spacing';
import TextShadow from 'components/input-options/text-shadow';

export const TypesOptionsMap = {
  Color: ColorPicker,
  String: Input,
  Image: ImagePicker,
  Audio: ImagePicker,
  Select: Combobox,
  SchemaPicker,
  MenuPicker,
  PagePicker,
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
  Date: NumberInput
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
