import jss from 'helpers/stylesheet';

export default jss.createRules({
  musicPlayer: {
    position: 'relative',
    backgroundColor: '#333333',
    overflow: 'hidden',
    '-webkit-mask-image': 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC)'
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
