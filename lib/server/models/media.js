import mongoose from 'mongoose';

var mediaSchema = new mongoose.Schema({
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
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
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
    type: String,
    required: true
  },
  variations: []
});

export default mongoose.model('Media', mediaSchema);
