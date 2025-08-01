const express = require('express');
const healthController = require('../controllers/health');

const authRoutes = require('./auth');
const userRoutes = require('./users');
const groupRoutes = require('./groups');
const assignmentRoutes = require('./assignments');
const messageRoutes = require('./messages');
const notificationRoutes = require('./notifications');

const router = express.Router();
// Health endpoint

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health endpoint
 *     responses:
 *       200:
 *         description: Service health check passed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 message:
 *                   type: string
 *                   example: Service is healthy
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 environment:
 *                   type: string
 *                   example: development
 */
router.get('/', healthController.check.bind(healthController));

// Feature endpoints
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/groups', groupRoutes);
router.use('/assignments', assignmentRoutes);
router.use('/messages', messageRoutes);
router.use('/notifications', notificationRoutes);

module.exports = router;
