const express = require('express');
const notificationController = require('../controllers/notification');
const { authenticateJWT } = require('../middleware/auth');
const router = express.Router();

/**
 * @openapi
 * /notifications:
 *   get:
 *     summary: Get my notifications
 *     tags: [Notification]
 */
router.get('/', authenticateJWT, notificationController.list);

/**
 * @openapi
 * /notifications/:id/read:
 *   post:
 *     summary: Mark a notification as read
 *     tags: [Notification]
 */
router.post('/:id/read', authenticateJWT, notificationController.markRead);

module.exports = router;
