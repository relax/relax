export default function getFilterDefaultOptions (type) {
  switch (type) {
    case 'Date':
      return {
        fromGran: 'day',
        fromValue: 1,
        toGran: 'present',
        toValue: 1
      };
    case 'String':
      return {
        op: 'equal',
        value: ''
      };
    case 'Boolean':
      return {
        value: 'true'
      };
    default:
      return {
        op: 'set'
      };
  }
}
