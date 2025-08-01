const express = require('express');
const groupController = require('../controllers/group');
const { authenticateJWT } = require('../middleware/auth');
const router = express.Router();

/**
 * @openapi
 * /groups:
 *   post:
 *     summary: Create group (teacher/admin)
 *     tags: [Group]
 */
router.post('/', authenticateJWT, groupController.create);

/**
 * @openapi
 * /groups:
 *   get:
 *     summary: List all groups
 *     tags: [Group]
 */
router.get('/', authenticateJWT, groupController.list);

/**
 * @openapi
 * /groups/:id:
 *   get:
 *     summary: Get group by ID
 *     tags: [Group]
 */
router.get('/:id', authenticateJWT, groupController.get);

/**
 * @openapi
 * /groups/:id/members:
 *   post:
 *     summary: Add member to group
 *     tags: [Group]
 */
router.post('/:id/members', authenticateJWT, groupController.addMember);

/**
 * @openapi
 * /groups/:id/members/:userId:
 *   delete:
 *     summary: Remove member from group
 *     tags: [Group]
 */
router.delete('/:id/members/:userId', authenticateJWT, groupController.removeMember);

module.exports = router;
