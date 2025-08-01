const express = require('express');
const userController = require('../controllers/user');
const { authenticateJWT } = require('../middleware/auth');
const router = express.Router();

/**
 * @openapi
 * /users:
 *   get:
 *     summary: List all users (admin/teacher only)
 *     tags: [User]
 */
router.get('/', authenticateJWT, userController.list);

/**
 * @openapi
 * /users/:id:
 *   get:
 *     summary: Get user profile by ID
 *     tags: [User]
 */
router.get('/:id', authenticateJWT, userController.profile);

/**
 * @openapi
 * /users/:id:
 *   delete:
 *     summary: Delete user (admin only)
 *     tags: [User]
 */
router.delete('/:id', authenticateJWT, userController.delete);

/**
 * @openapi
 * /users/me/profile:
 *   patch:
 *     summary: Update own profile
 *     tags: [User]
 */
router.patch('/me/profile', authenticateJWT, userController.updateProfile);

module.exports = router;
