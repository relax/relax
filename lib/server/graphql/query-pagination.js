import {
  GraphQLString,
  GraphQLInt
} from 'graphql';

export const paginationQueryArgs = {
  sort: {
    name: 'sort',
    type: GraphQLString
  },
  order: {
    name: 'order',
    type: GraphQLString
  },
  limit: {
    name: 'limit',
    type: GraphQLInt
  },
  page: {
    name: 'page',
    type: GraphQLInt
  },
  search: {
    name: 'search',
    type: GraphQLString
  },
  s: {
    name: 's',
    type: GraphQLString
  }
};

export function searchQuery (find, params) {
  if (params.search && params.s) {
    find[params.search] = new RegExp('.*' + params.s, 'i');
  }
  return find;
}

export function paginateQuery (query, params) {
  if (params.sort) {
    query.sort({
      [params.sort]: params.order || 'asc'
    });
  }
  if (params.page && params.limit) {
    query.skip((params.page - 1) * params.limit);
  }
  if (params.limit) {
    query.limit(params.limit);
  }
}
