const express = require('express');
const assignmentController = require('../controllers/assignment');
const { authenticateJWT } = require('../middleware/auth');
const router = express.Router();

/**
 * @openapi
 * /assignments:
 *   post:
 *     summary: Create new assignment
 *     tags: [Assignment]
 */
router.post('/', authenticateJWT, assignmentController.create);

/**
 * @openapi
 * /assignments:
 *   get:
 *     summary: List or search assignments
 *     tags: [Assignment]
 */
router.get('/', authenticateJWT, assignmentController.list);

/**
 * @openapi
 * /assignments/:id:
 *   get:
 *     summary: Get assignment by ID
 *     tags: [Assignment]
 */
router.get('/:id', authenticateJWT, assignmentController.get);

/**
 * @openapi
 * /assignments/:id/submit:
 *   post:
 *     summary: Student submits assignment
 *     tags: [Assignment]
 */
router.post('/:id/submit', authenticateJWT, assignmentController.submit);

/**
 * @openapi
 * /assignments/:id/grade:
 *   post:
 *     summary: (Teacher/Admin) grade assignment submission
 *     tags: [Assignment]
 */
router.post('/:id/grade', authenticateJWT, assignmentController.grade);

module.exports = router;
