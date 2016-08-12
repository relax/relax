import getProjection from 'helpers/get-projection';
import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLString
} from 'graphql';

import authorize from '../../authorize';
import schemaEntryType from '../../types/schema-entry';
import updateItem from '../_helpers/update-item';

export const updateTitle = {
  type: schemaEntryType,
  args: {
    schemaId: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    },
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    },
    title: {
      name: 'title',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve (root, params, options) {
    authorize(root);
    const projection = getProjection(options.fieldASTs[0]);
    const {item} = await updateItem({
      id: params.id,
      type: params.schemaId,
      changes: {title: params.title},
      projection,
      userId: root.user._id
    });
    return item;
  }
};

export const updateSlug = {
  type: schemaEntryType,
  args: {
    schemaId: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    },
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    },
    slug: {
      name: 'slug',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve (root, params, options) {
    authorize(root);
    const projection = getProjection(options.fieldASTs[0]);
    const {item} = await updateItem({
      id: params.id,
      type: params.schemaId,
      changes: {slug: params.slug},
      projection,
      userId: root.user._id
    });
    return item;
  }
};

export const updateState = {
  type: schemaEntryType,
  args: {
    schemaId: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    },
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    },
    state: {
      name: 'state',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve (root, params, options) {
    authorize(root);
    const projection = getProjection(options.fieldASTs[0]);
    const {item} = await updateItem({
      id: params.id,
      type: params.schemaId,
      changes: {state: params.state},
      projection,
      userId: root.user._id
    });
    return item;
  }
};

export const updateTemplate = {
  type: schemaEntryType,
  args: {
    schemaId: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    },
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    },
    templateId: {
      name: 'templateId',
      type: GraphQLID
    }
  },
  async resolve (root, params, options) {
    authorize(root);
    const projection = getProjection(options.fieldASTs[0]);
    const {item} = await updateItem({
      id: params.id,
      type: params.schemaId,
      changes: {template: params.templateId},
      projection,
      userId: root.user._id
    });
    return item;
  }
};
