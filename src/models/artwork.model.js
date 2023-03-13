const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const artworkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
  },
  type: {
    type: String,
    enum: ['painting', 'photograph', 'sculpture', 'print', 'drawing'],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  imageUrls: {
    type: [String],
    required: true,
  },
  tags: {
    type: [String],
  },
  published: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// add plugin that converts mongoose to json
artworkSchema.plugin(toJSON);
artworkSchema.plugin(paginate);

const Artwork = mongoose.model('Artwork', artworkSchema);

module.exports = Artwork;
