const express = require('express');
const {
  createComment,
  getAllComments,
  findByIdComments,
  updateComment,
  deleteComment,
} = require('../controllers/controller.comment');
const authMiddleware = require('../middleware/authMiddleware');

const commentRoutes = express.Router();

commentRoutes.post('/', authMiddleware, createComment);
commentRoutes.get('/', getAllComments);
commentRoutes.get('/:id', authMiddleware, findByIdComments);
commentRoutes.put('/:id', authMiddleware, updateComment);
commentRoutes.delete('/:id', authMiddleware, deleteComment);

module.exports = commentRoutes;
