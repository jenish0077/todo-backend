const Todo = require('../models/Todo');

// @desc    Get all todos for user
// @route   GET /api/todos
// @access  Private
exports.getTodos = async (req, res, next) => {
  try {
    const { completed, priority, sort = '-createdAt', page = 1, limit = 20 } = req.query;

    // Build filter
    const filter = { user: req.userId };
    
    if (completed !== undefined) {
      filter.completed = completed === 'true';
    }
    
    if (priority) {
      filter.priority = priority;
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query
    const [todos, total] = await Promise.all([
      Todo.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      Todo.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: {
        todos,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit)),
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single todo
// @route   GET /api/todos/:id
// @access  Private
exports.getTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found.',
      });
    }

    res.json({
      success: true,
      data: {
        todo,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create todo
// @route   POST /api/todos
// @access  Private
exports.createTodo = async (req, res, next) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    const todo = await Todo.create({
      title,
      description,
      priority,
      dueDate,
      user: req.userId,
    });

    res.status(201).json({
      success: true,
      message: 'Todo created successfully.',
      data: {
        todo,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update todo
// @route   PUT /api/todos/:id
// @access  Private
exports.updateTodo = async (req, res, next) => {
  try {
    const { title, description, completed, priority, dueDate } = req.body;

    let todo = await Todo.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found.',
      });
    }

    // Update fields
    todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, description, completed, priority, dueDate },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Todo updated successfully.',
      data: {
        todo,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle todo completion
// @route   PATCH /api/todos/:id/toggle
// @access  Private
exports.toggleTodo = async (req, res, next) => {
  try {
    let todo = await Todo.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found.',
      });
    }

    todo.completed = !todo.completed;
    await todo.save();

    res.json({
      success: true,
      message: `Todo marked as ${todo.completed ? 'completed' : 'incomplete'}.`,
      data: {
        todo,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete todo
// @route   DELETE /api/todos/:id
// @access  Private
exports.deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found.',
      });
    }

    res.json({
      success: true,
      message: 'Todo deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete all completed todos
// @route   DELETE /api/todos/completed
// @access  Private
exports.deleteCompleted = async (req, res, next) => {
  try {
    const result = await Todo.deleteMany({
      user: req.userId,
      completed: true,
    });

    res.json({
      success: true,
      message: `${result.deletedCount} completed todo(s) deleted.`,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get todo statistics
// @route   GET /api/todos/stats
// @access  Private
exports.getStats = async (req, res, next) => {
  try {
    const stats = await Todo.aggregate([
      { $match: { user: req.userId } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          completed: { $sum: { $cond: ['$completed', 1, 0] } },
          pending: { $sum: { $cond: ['$completed', 0, 1] } },
          highPriority: { $sum: { $cond: [{ $eq: ['$priority', 'high'] }, 1, 0] } },
          mediumPriority: { $sum: { $cond: [{ $eq: ['$priority', 'medium'] }, 1, 0] } },
          lowPriority: { $sum: { $cond: [{ $eq: ['$priority', 'low'] }, 1, 0] } },
        },
      },
    ]);

    const defaultStats = {
      total: 0,
      completed: 0,
      pending: 0,
      highPriority: 0,
      mediumPriority: 0,
      lowPriority: 0,
    };

    res.json({
      success: true,
      data: {
        stats: stats[0] || defaultStats,
      },
    });
  } catch (error) {
    next(error);
  }
};
