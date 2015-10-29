// options components
// import BorderPicker from '../components/border-picker';

import Button from '../components/data-types/button';
import Checkbox from '../components/data-types/checkbox';
import Combobox from '../components/data-types/combobox';
import CornersPicker from '../components/data-types/corners-picker';
import ImagePicker from '../containers/data-types/image-picker';
import Input from '../components/data-types/input';
import NumberInput from '../components/data-types/number-input';
import Optional from '../components/data-types/optional';
import Section from '../components/data-types/section';
import SpacingPicker from '../components/data-types/spacing-picker';
// import CollectionCombobox from '../components/data-types/collection-combobox';
// import FontPicker from '../components/data-types/font-picker';
// import IconPicker from '../components/data-types/icon-picker';
// import ColorPalettePicker from '../components/data-types/color-palette-picker';
// import ColumnsManager from '../components/data-types/columns-manager';
// import HtmlArea from '../components/data-types/html-area';
// import StateTrigger from '../components/data-types/state-trigger';

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
