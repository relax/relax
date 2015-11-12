import {Types} from '../../../data-types';

export default [
  {
    label: 'Schema assigned',
    id: 'schemaId',
    type: Types.SchemaPicker
  },
  {
    label: 'Limit',
    id: 'limit',
    type: Types.Number
  },
  {
    label: 'Columns',
    id: 'columns',
    type: Types.Number
  },
  {
    label: 'Vertical gutter',
    id: 'verticalGutter',
    type: Types.Pixels
  },
  {
    label: 'Horizontal gutter',
    id: 'horizontalGutter',
    type: Types.Pixels
  }
];
