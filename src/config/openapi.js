module.exports = {
  openapi: '3.1.0',
  info: {
    title: 'Todo API',
    version: '1.0.0',
    description: 'A comprehensive Todo API with authentication and full CRUD operations',
    contact: {
      name: 'API Support',
      email: 'support@todoapi.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:8081',
      description: 'Development server',
    },
  ],
  tags: [
    {
      name: 'Authentication',
      description: 'User authentication and profile management',
    },
    {
      name: 'Todos',
      description: 'Todo management operations',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter your JWT token',
      },
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            example: '507f1f77bcf86cd799439011',
          },
          name: {
            type: 'string',
            example: 'John Doe',
          },
          email: {
            type: 'string',
            format: 'email',
            example: 'john@example.com',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
          },
        },
      },
      Todo: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            example: '507f1f77bcf86cd799439011',
          },
          title: {
            type: 'string',
            example: 'Complete project documentation',
          },
          description: {
            type: 'string',
            example: 'Write comprehensive API documentation using Scalar',
          },
          completed: {
            type: 'boolean',
            example: false,
          },
          priority: {
            type: 'string',
            enum: ['low', 'medium', 'high'],
            example: 'high',
          },
          dueDate: {
            type: 'string',
            format: 'date-time',
            example: '2024-12-31T23:59:59Z',
          },
          user: {
            type: 'string',
            example: '507f1f77bcf86cd799439011',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
          },
        },
      },
      Error: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: false,
          },
          message: {
            type: 'string',
            example: 'Error message',
          },
        },
      },
      ValidationError: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: false,
          },
          message: {
            type: 'string',
            example: 'Validation failed',
          },
          errors: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                field: {
                  type: 'string',
                  example: 'email',
                },
                message: {
                  type: 'string',
                  example: 'Please provide a valid email',
                },
              },
            },
          },
        },
      },
    },
  },
  paths: {
    '/health': {
      get: {
        summary: 'Health check',
        description: 'Check if the API is running',
        responses: {
          '200': {
            description: 'API is healthy',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'string',
                      example: 'ok',
                    },
                    timestamp: {
                      type: 'string',
                      format: 'date-time',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/auth/register': {
      post: {
        tags: ['Authentication'],
        summary: 'Register a new user',
        description: 'Create a new user account',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'email', 'password'],
                properties: {
                  name: {
                    type: 'string',
                    maxLength: 50,
                    example: 'John Doe',
                  },
                  email: {
                    type: 'string',
                    format: 'email',
                    example: 'john@example.com',
                  },
                  password: {
                    type: 'string',
                    minLength: 6,
                    example: 'password123',
                  },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'User registered successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Registration successful.',
                    },
                    data: {
                      type: 'object',
                      properties: {
                        user: {
                          $ref: '#/components/schemas/User',
                        },
                        token: {
                          type: 'string',
                          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Email already registered or validation error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
    },
    '/api/auth/login': {
      post: {
        tags: ['Authentication'],
        summary: 'Login',
        description: 'Authenticate a user and get a JWT token',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: {
                    type: 'string',
                    format: 'email',
                    example: 'john@example.com',
                  },
                  password: {
                    type: 'string',
                    example: 'password123',
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Login successful',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Login successful.',
                    },
                    data: {
                      type: 'object',
                      properties: {
                        user: {
                          $ref: '#/components/schemas/User',
                        },
                        token: {
                          type: 'string',
                          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          '401': {
            description: 'Invalid credentials',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
    },
    '/api/auth/me': {
      get: {
        tags: ['Authentication'],
        summary: 'Get current user',
        description: 'Get the authenticated user profile',
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          '200': {
            description: 'User profile retrieved',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                    },
                    data: {
                      type: 'object',
                      properties: {
                        user: {
                          $ref: '#/components/schemas/User',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          '401': {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
    },
    '/api/auth/profile': {
      put: {
        tags: ['Authentication'],
        summary: 'Update profile',
        description: 'Update user profile information',
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    maxLength: 50,
                    example: 'John Smith',
                  },
                  email: {
                    type: 'string',
                    format: 'email',
                    example: 'john.smith@example.com',
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Profile updated',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Profile updated successfully.',
                    },
                    data: {
                      type: 'object',
                      properties: {
                        user: {
                          $ref: '#/components/schemas/User',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Email already in use',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          '401': {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
    },
    '/api/auth/password': {
      put: {
        tags: ['Authentication'],
        summary: 'Change password',
        description: 'Change user password',
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['currentPassword', 'newPassword'],
                properties: {
                  currentPassword: {
                    type: 'string',
                    example: 'oldpassword123',
                  },
                  newPassword: {
                    type: 'string',
                    minLength: 6,
                    example: 'newpassword123',
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Password changed',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Password changed successfully.',
                    },
                    data: {
                      type: 'object',
                      properties: {
                        token: {
                          type: 'string',
                          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Current password is incorrect',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          '401': {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
    },
    '/api/todos': {
      get: {
        tags: ['Todos'],
        summary: 'Get all todos',
        description: 'Get all todos for the authenticated user with optional filtering and pagination',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'completed',
            in: 'query',
            description: 'Filter by completion status',
            schema: {
              type: 'string',
              enum: ['true', 'false'],
            },
          },
          {
            name: 'priority',
            in: 'query',
            description: 'Filter by priority',
            schema: {
              type: 'string',
              enum: ['low', 'medium', 'high'],
            },
          },
          {
            name: 'sort',
            in: 'query',
            description: 'Sort field (prefix with - for descending)',
            schema: {
              type: 'string',
              default: '-createdAt',
              example: '-createdAt',
            },
          },
          {
            name: 'page',
            in: 'query',
            description: 'Page number',
            schema: {
              type: 'integer',
              minimum: 1,
              default: 1,
            },
          },
          {
            name: 'limit',
            in: 'query',
            description: 'Items per page',
            schema: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 20,
            },
          },
        ],
        responses: {
          '200': {
            description: 'Todos retrieved',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                    },
                    data: {
                      type: 'object',
                      properties: {
                        todos: {
                          type: 'array',
                          items: {
                            $ref: '#/components/schemas/Todo',
                          },
                        },
                        pagination: {
                          type: 'object',
                          properties: {
                            page: {
                              type: 'integer',
                              example: 1,
                            },
                            limit: {
                              type: 'integer',
                              example: 20,
                            },
                            total: {
                              type: 'integer',
                              example: 50,
                            },
                            pages: {
                              type: 'integer',
                              example: 3,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          '401': {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Todos'],
        summary: 'Create todo',
        description: 'Create a new todo',
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['title'],
                properties: {
                  title: {
                    type: 'string',
                    maxLength: 200,
                    example: 'Complete project documentation',
                  },
                  description: {
                    type: 'string',
                    maxLength: 1000,
                    example: 'Write comprehensive API documentation',
                  },
                  priority: {
                    type: 'string',
                    enum: ['low', 'medium', 'high'],
                    default: 'medium',
                    example: 'high',
                  },
                  dueDate: {
                    type: 'string',
                    format: 'date-time',
                    example: '2024-12-31T23:59:59Z',
                  },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Todo created',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Todo created successfully.',
                    },
                    data: {
                      type: 'object',
                      properties: {
                        todo: {
                          $ref: '#/components/schemas/Todo',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Validation error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ValidationError',
                },
              },
            },
          },
          '401': {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
    },
    '/api/todos/stats': {
      get: {
        tags: ['Todos'],
        summary: 'Get todo statistics',
        description: 'Get statistics about todos (total, completed, pending, by priority)',
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          '200': {
            description: 'Statistics retrieved',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                    },
                    data: {
                      type: 'object',
                      properties: {
                        stats: {
                          type: 'object',
                          properties: {
                            total: {
                              type: 'integer',
                              example: 50,
                            },
                            completed: {
                              type: 'integer',
                              example: 20,
                            },
                            pending: {
                              type: 'integer',
                              example: 30,
                            },
                            highPriority: {
                              type: 'integer',
                              example: 10,
                            },
                            mediumPriority: {
                              type: 'integer',
                              example: 25,
                            },
                            lowPriority: {
                              type: 'integer',
                              example: 15,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          '401': {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
    },
    '/api/todos/completed': {
      delete: {
        tags: ['Todos'],
        summary: 'Delete completed todos',
        description: 'Delete all completed todos for the authenticated user',
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          '200': {
            description: 'Completed todos deleted',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: '5 completed todo(s) deleted.',
                    },
                  },
                },
              },
            },
          },
          '401': {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
    },
    '/api/todos/{id}': {
      get: {
        tags: ['Todos'],
        summary: 'Get single todo',
        description: 'Get a specific todo by ID',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Todo ID',
            schema: {
              type: 'string',
              example: '507f1f77bcf86cd799439011',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Todo retrieved',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                    },
                    data: {
                      type: 'object',
                      properties: {
                        todo: {
                          $ref: '#/components/schemas/Todo',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          '404': {
            description: 'Todo not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          '401': {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
      put: {
        tags: ['Todos'],
        summary: 'Update todo',
        description: 'Update a todo',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Todo ID',
            schema: {
              type: 'string',
              example: '507f1f77bcf86cd799439011',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  title: {
                    type: 'string',
                    maxLength: 200,
                    example: 'Updated title',
                  },
                  description: {
                    type: 'string',
                    maxLength: 1000,
                    example: 'Updated description',
                  },
                  completed: {
                    type: 'boolean',
                    example: true,
                  },
                  priority: {
                    type: 'string',
                    enum: ['low', 'medium', 'high'],
                    example: 'high',
                  },
                  dueDate: {
                    type: 'string',
                    format: 'date-time',
                    example: '2024-12-31T23:59:59Z',
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Todo updated',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Todo updated successfully.',
                    },
                    data: {
                      type: 'object',
                      properties: {
                        todo: {
                          $ref: '#/components/schemas/Todo',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          '404': {
            description: 'Todo not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          '401': {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ['Todos'],
        summary: 'Delete todo',
        description: 'Delete a todo',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Todo ID',
            schema: {
              type: 'string',
              example: '507f1f77bcf86cd799439011',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Todo deleted',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Todo deleted successfully.',
                    },
                  },
                },
              },
            },
          },
          '404': {
            description: 'Todo not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          '401': {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
    },
    '/api/todos/{id}/toggle': {
      patch: {
        tags: ['Todos'],
        summary: 'Toggle todo completion',
        description: 'Toggle the completion status of a todo',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Todo ID',
            schema: {
              type: 'string',
              example: '507f1f77bcf86cd799439011',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Todo toggled',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Todo marked as completed.',
                    },
                    data: {
                      type: 'object',
                      properties: {
                        todo: {
                          $ref: '#/components/schemas/Todo',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          '404': {
            description: 'Todo not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          '401': {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
    },
  },
};
