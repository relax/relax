import forEach from 'lodash.foreach';
import moment from 'moment';

import {Types} from '../../../data-types';

const momentDate = moment();
const dateFormats = [
  'fromNow',
  'L',
  'l',
  'LL',
  'll',
  'LLL',
  'lll',
  'LLLL',
  'llll',
  'custom'
];
const labels = [];

forEach(dateFormats, (format) => {
  if (format === 'fromNow') {
    labels.push(momentDate.fromNow());
  } else if (format === 'custom') {
    labels.push('Custom');
  } else {
    labels.push(momentDate.format(format));
  }
});

export default [
  {
    label: 'Date',
    type: Types.Date,
    id: 'date'
  },
  {
    label: 'Format',
    type: Types.Select,
    id: 'format',
    props: {
      values: dateFormats,
      labels
    },
    unlocks: {
      custom: [
        {
          label: 'Custom Format',
          type: Types.String,
          id: 'customFormat'
        }
      ]
    }
  }
];
