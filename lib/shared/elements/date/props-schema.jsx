import forEach from 'lodash.foreach';
import moment from 'moment';

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
    type: 'Date',
    id: 'date'
  },
  {
    label: 'Format',
    type: 'Select',
    id: 'format',
    props: {
      values: dateFormats,
      labels
    },
    unlocks: {
      custom: [
        {
          label: 'Custom Format',
          type: 'String',
          id: 'customFormat'
        }
      ]
    }
  }
];
