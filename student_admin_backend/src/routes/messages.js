const express = require('express');
const messageController = require('../controllers/message');
const { authenticateJWT } = require('../middleware/auth');
const router = express.Router();

/**
 * @openapi
 * /messages:
 *   post:
 *     summary: Send a message to group or user
 *     tags: [Message]
 */
router.post('/', authenticateJWT, messageController.send);

/**
 * @openapi
 * /messages:
 *   get:
 *     summary: Fetch messages
 *     tags: [Message]
 */
router.get('/', authenticateJWT, messageController.fetch);

module.exports = router;
