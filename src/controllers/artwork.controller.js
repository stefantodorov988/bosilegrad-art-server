const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const { artworkService } = require('../services');

const createArtwork = catchAsync(async (req, res) => {
  const artwork = await artworkService.createArtwork(req.body);
  res.status(httpStatus.CREATED).send(artwork);
});

const getArtworks = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'type', 'artist']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await artworkService.queryArtworks(filter, options);
  res.send(result);
});

const getArtwork = catchAsync(async (req, res) => {
  const artwork = await artworkService.getArtworkById(req.params.artworkId);
  if (!artwork) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Artwork not found');
  }
  res.send(artwork);
});

const updateArtwork = catchAsync(async (req, res) => {
  const artwork = await artworkService.updateArtworkById(req.params.artworkId, req.body);
  res.send(artwork);
});

const deleteArtwork = catchAsync(async (req, res) => {
  await artworkService.deleteArtworkById(req.params.artworkId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createArtwork,
  getArtworks,
  getArtwork,
  updateArtwork,
  deleteArtwork,
};
