// options components
// import BorderPicker from '../components/border-picker';

import Button from '../components/button';
import Checkbox from '../components/checkbox';
import Combobox from '../components/combobox';
import CornersPicker from '../components/corners-picker';
import ImagePicker from '../containers/data-types/image-picker';
import Input from '../components/input';
import NumberInput from '../components/number-input';
import Optional from '../components/optional';
import Section from '../components/section';
import SpacingPicker from '../components/spacing-picker';
// import CollectionCombobox from '../components/collection-combobox';
// import FontPicker from '../components/font-picker';
// import IconPicker from '../components/icon-picker';
// import ColorPalettePicker from '../components/color-palette-picker';
// import ColumnsManager from '../components/columns-manager';
// import HtmlArea from '../components/html-area';
// import StateTrigger from '../components/state-trigger';

var TypesOptionsMap = {
  // Color: ColorPalettePicker,
  String: Input,
  Image: ImagePicker,
  Select: Combobox,
  // SelectEntry: CollectionCombobox,
  Number: NumberInput,
  Pixels: NumberInput,
  Percentage: NumberInput,
  Padding: SpacingPicker,
  Margin: SpacingPicker,
  Boolean: Checkbox,
  // Font: FontPicker,
  Button,
  // Icon: IconPicker,
  Corners: CornersPicker,
  // Columns: ColumnsManager,
  // Border: BorderPicker,
  Optional,
  Section
  // Html: HtmlArea,
  // StateTrigger
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
