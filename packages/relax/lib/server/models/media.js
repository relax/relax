import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  filesize: {
    type: Number,
    required: true
  },
  dimension: {
    width: {
      type: Number
    },
    height: {
      type: Number
    }
  },
  url: {
    type: String,
    required: true,
    unique: true
  },
  absoluteUrl: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  thumbnail: {
    type: String
  },
  variations: {
    type: Array
  }
});

export default mongoose.model('Media', mediaSchema);
