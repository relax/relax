// options components
import BorderPicker from '../components/border-picker';
import Checkbox from '../components/checkbox';
import Input from '../components/input';
import ImagePicker from '../components/image-picker';
import Combobox from '../components/combobox';
import NumberInput from '../components/number-input';
import FontPicker from '../components/font-picker';
import Button from '../components/button';
import IconPicker from '../components/icon-picker';
import SpacingPicker from '../components/spacing-picker';
import CornersPicker from '../components/corners-picker';
import ColorPalettePicker from '../components/color-palette-picker';
import ColumnsManager from '../components/columns-manager';
import Optional from '../components/optional';

var TypesOptionsMap = {
  Color: ColorPalettePicker,
  String: Input,
  Image: ImagePicker,
  Select: Combobox,
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
  Columns: ColumnsManager,
  Border: BorderPicker,
  Optional
};

var TypesOptionsDefaultProps = {
  Percentage: {
    min: 0,
    max: 100,
    label: '%'
  },
  Padding: {
    type: 'padding'
  },
  Margin: {
    type: 'margin'
  }
};

export default {
  TypesOptionsMap,
  TypesOptionsDefaultProps
};
