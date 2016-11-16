import {map, compact} from 'lodash';

export default (options) => compact(map(options, (option) => option.id));
