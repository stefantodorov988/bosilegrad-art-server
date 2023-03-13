const httpStatus = require('http-status');
const { Artwork } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a artwork
 * @param {Object} artworkBody
 * @returns {Promise<Artwork>}
 */
const createArtwork = async (artworkBody) => {
  return Artwork.create(artworkBody);
};

/**
 * Query for artworks
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryArtworks = async (filter, options) => {
  const artworks = await Artwork.paginate(filter, options);
  return artworks;
};

/**
 * Get artwork by id
 * @param {ObjectId} id
 * @returns {Promise<Artwork>}
 */
const getArtworkById = async (id) => {
  return Artwork.findById(id);
};

/**
 * Update artwork by id
 * @param {ObjectId} artworkId
 * @param {Object} updateBody
 * @returns {Promise<Artwork>}
 */
const updateArtworkById = async (artworkId, updateBody) => {
  const artwork = await getArtworkById(artworkId);
  if (!artwork) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Artwork not found');
  }
  Object.assign(artwork, updateBody);
  await artwork.save();
  return artwork;
};

/**
 * Delete artwork by id
 * @param {ObjectId} artworkId
 * @returns {Promise<Artwork>}
 */
const deleteArtworkById = async (artworkId) => {
  const artwork = await getArtworkById(artworkId);
  if (!artwork) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Artwork not found');
  }
  await artwork.remove();
  return artwork;
};

module.exports = {
  createArtwork,
  queryArtworks,
  getArtworkById,
  updateArtworkById,
  deleteArtworkById,
};
