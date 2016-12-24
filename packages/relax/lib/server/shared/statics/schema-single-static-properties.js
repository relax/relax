import {Schema} from 'mongoose';

export default {
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  state: {
    type: String,
    default: 'draft'
  },
  date: {
    type: Date,
    default: Date.now
  },
  publishedDate: {
    type: Date,
    default: Date.now
  },
  updatedDate: {
    type: Date,
    default: Date.now
  },
  data: {
    type: Schema.Types.Mixed,
    default: {}
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  template: {
    type: Schema.Types.ObjectId,
    ref: 'Template'
  }
};
