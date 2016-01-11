import BorderPicker from '../components/data-types/border-picker';
import BorderStyle from '../components/data-types/border-style';
import BoxShadow from '../components/data-types/box-shadow';
import Button from '../components/data-types/button';
import Checkbox from '../components/data-types/checkbox';
import ColorPalettePicker from '../containers/data-types/color-palette-picker';
import ColumnsManager from '../components/data-types/columns-manager';
import Combobox from '../components/data-types/combobox';
import CornersPicker from '../components/data-types/corners-picker';
import Filters from '../containers/data-types/filters';
import FontPicker from '../containers/data-types/font-picker';
import HtmlArea from '../components/data-types/html-area';
import IconPicker from '../containers/data-types/icon-picker';
import ImagePicker from '../containers/data-types/image-picker';
import Input from '../components/data-types/input';
import MenuPicker from '../containers/data-types/menu-picker';
import NumberInput from '../components/data-types/number-input';
import Optional from '../components/data-types/optional';
import PagePicker from '../containers/data-types/page-picker';
import SchemaPicker from '../containers/data-types/schema-picker';
import Section from '../components/data-types/section';
import ShadowPosition from '../components/data-types/shadow-position';
import Sorts from '../containers/data-types/sorts';
import SpacingPicker from '../components/data-types/spacing-picker';
import TextShadow from '../components/data-types/text-shadow';

var TypesOptionsMap = {
  Color: ColorPalettePicker,
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
  Html: HtmlArea,
  Filters,
  Sorts,
  TextShadow,
  BoxShadow,
  ShadowPosition
};

var TypesOptionsDefaultProps = {
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

export default {
  TypesOptionsMap,
  TypesOptionsDefaultProps
};
