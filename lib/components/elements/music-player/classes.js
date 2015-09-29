import jss from '../../../react-jss';

export default jss.createRules({
  musicPlayer: {
    position: 'relative',
    backgroundColor: '#333333',
    overflow: 'hidden'
  },
  wrapper: {
    position: 'relative'
  },
  part: {
    display: 'table-cell',
    verticalAlign: 'middle'
  },
  table: {
    display: 'table',
    width: '100%'
  },
  fit: {
    width: '1%',
    whiteSpace: 'nowrap'
  },
  bar: {
    position: 'relative',
    overflow: 'hidden',
    height: 7,
    backgroundColor: '#cccccc'
  },
  streamBars: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 0,
    cursor: 'pointer'
  },
  volume: {
    width: 170
  },
  volumeBars: {
    paddingLeft: 10
  },
  volumeBar: {
    cursor: 'pointer'
  },
  divider: {
    width: 1,
    backgroundColor: '#3A3A3A'
  }
});
