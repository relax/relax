import {fragmentToQL} from 'relax-framework';
import request from '../client/helpers/request';
import forEach from 'lodash.foreach';

export const actionTypes = {
  getAdmin: 'GET_ADMIN'
};

export function getAdmin (fragments, variables, variablesTypes) {
  return (dispatch) => {
    const finalVariables = {};
    const queries = [];
    let it = 0;

    const varsTypes = []; // $slug: String!

    forEach(fragments, (fragment, key) => {
      let queryStr = '';
      const vars = variables[key];
      const varsString = []; // slug: $slug

      forEach(vars, (varValue, varKey) => {
        const name = varKey + it;
        varsTypes.push(`$${name}: ${variablesTypes[key][varKey]}`);
        varsString.push(`${varKey}: $${name}`);
        finalVariables[name] = varValue;
        it += 1;
      });

      if (varsString.length) {
        queryStr += `${key} (${varsString.join(',')}) {`;
      } else {
        queryStr += `${key} {`;
      }

      queryStr += `${fragmentToQL(fragment)}}`;

      queries.push(queryStr);
    });

    let query;
    if (varsTypes.length) {
      query = `query (${varsTypes.join(',')}){ ${queries.join(',')} }`;
    } else {
      query = `query { ${queries.join(',')} }`;
    }

    return request({
      dispatch,
      type: actionTypes.getAdmin,
      query,
      variables: finalVariables
    });
  };
}
