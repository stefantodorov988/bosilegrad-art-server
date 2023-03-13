const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createArtwork = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string(),
    artist: Joi.string().required(),
    type: Joi.string().required(),
    price: Joi.number().required().min(0),
    quantity: Joi.number().integer().min(1),
    imageUrls: Joi.array().items(Joi.string()).min(1).required(),
    tags: Joi.array().items(Joi.string()),
    published: Joi.boolean(),
  }),
};

const getArtworks = {
  query: Joi.object().keys({
    name: Joi.string(),
    artist: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getArtwork = {
  params: Joi.object().keys({
    artworkId: Joi.string().custom(objectId),
  }),
};

const updateArtwork = {
  params: Joi.object().keys({
    artworkId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
    artist: Joi.string(),
    price: Joi.number().min(0),
  }),
};

const deleteArtwork = {
  params: Joi.object().keys({
    artworkId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createArtwork,
  getArtworks,
  getArtwork,
  updateArtwork,
  deleteArtwork,
};
