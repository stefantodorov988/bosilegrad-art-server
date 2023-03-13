const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['Photographer', 'Painter', 'Woodcarver'],
    required: true,
  },
  bio: {
    type: String,
  },
  socialMedia: {
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  profilePictureUrl: {
    type: String,
  },
});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;
