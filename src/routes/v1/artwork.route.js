const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const artworkValidation = require('../../validations/artwork.validation');
const artworkController = require('../../controllers/artwork.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageArtworks'), validate(artworkValidation.createArtwork), artworkController.createArtwork)
  .get(validate(artworkValidation.getArtworks), artworkController.getArtworks);

router
  .route('/:artworkId')
  .get(validate(artworkValidation.getArtwork), artworkController.getArtwork)
  .patch(auth('manageArtworks'), validate(artworkValidation.updateArtwork), artworkController.updateArtwork)
  .delete(auth('manageArtworks'), validate(artworkValidation.deleteArtwork), artworkController.deleteArtwork);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Artworks
 *   description: Artwork management and retrieval
 */
/**
 * @swagger
 * /artworks:
 *   post:
 *     summary: Create an artwork
 *     description: Only admins can create artworks.
 *     tags: [Artworks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - artist
 *               - type
 *               - price
 *               - imageUrls
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               artist:
 *                 type: string
 *                 format: objectId
 *                 description: The artist who created the artwork
 *               type:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: float
 *               quantity:
 *                 type: integer
 *               imageUrls:
 *                 type: array
 *                 items:
 *                   type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *             example:
 *               title: Mona Lisa
 *               description: A portrait of a woman by the Italian artist Leonardo da Vinci
 *               artist: 611d1625f1ddc45248b67c5e
 *               type: painting
 *               price: 2000000
 *               quantity: 1
 *               imageUrls: [ "https://www.example.com/image1.jpg", "https://www.example.com/image2.jpg" ]
 *               tags: [ "portrait", "renaissance" ]
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Artwork'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all artworks
 *     description: Get all artworks, optionally filtered by type or artist
 *     tags: [Artworks]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Artwork type (painting, sculpture, etc.)
 *       - in: query
 *         name: artist
 *         schema:
 *           type: string
 *         description: Artist ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Artwork'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 */
