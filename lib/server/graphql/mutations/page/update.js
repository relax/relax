import {
  GraphQLNonNull
} from 'graphql';
import pageType from '../../types/page';
import pageInputType from '../../types/page-input';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

export default mutationWithClientMutationId({
  name: 'UpdatePage',
  outputFields: {
    page: {
      type: pageType,
      resolve () {
        console.log('porra aleluia');
        console.log(arguments);
      }
    }
  },
  inputFields: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(pageInputType)
    }
  },
  mutateAndGetPayload ({data}) {
    console.log(arguments);
    console.log(_id);
    console.log('a')
    //var pageId = fromGlobalId(_id);
    console.log('b')
    //console.log(pageId);
    // var localHidingSpotId = fromGlobalId(id).id;
    // checkHidingSpotForTreasure(localHidingSpotId);
    // return {localHidingSpotId};
    return data;
  }
  // resolve (root, params, options) {
  //   console.log(root);
  //   console.log(params);
  // }
});
