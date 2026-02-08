const express = require('express');
const { body, query } = require('express-validator');
const router = express.Router();
const todoController = require('../controllers/todo.controller');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');

// Validation rules
const createTodoValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Priority must be low, medium, or high'),
  body('dueDate')
    .optional()
    .isISO8601()
    .withMessage('Invalid date format'),
];

const updateTodoValidation = [
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),
  body('completed')
    .optional()
    .isBoolean()
    .withMessage('Completed must be a boolean'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Priority must be low, medium, or high'),
  body('dueDate')
    .optional()
    .isISO8601()
    .withMessage('Invalid date format'),
];

const getTodosValidation = [
  query('completed')
    .optional()
    .isIn(['true', 'false'])
    .withMessage('Completed must be true or false'),
  query('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Priority must be low, medium, or high'),
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
];

// All routes require authentication
router.use(auth);

// Routes
router.get('/stats', todoController.getStats);
router.delete('/completed', todoController.deleteCompleted);

router.route('/')
  .get(getTodosValidation, validate, todoController.getTodos)
  .post(createTodoValidation, validate, todoController.createTodo);

router.route('/:id')
  .get(todoController.getTodo)
  .put(updateTodoValidation, validate, todoController.updateTodo)
  .delete(todoController.deleteTodo);

router.patch('/:id/toggle', todoController.toggleTodo);

module.exports = router;
