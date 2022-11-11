const express = require('express');
const categoryRoute = express.Router();

const {
  createCategory,
  getAllCategory,
  findByIdCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/controllers.categories');
const authMiddleware = require('../middleware/authMiddleware');

categoryRoute.post('/', authMiddleware, createCategory);
categoryRoute.get('/', getAllCategory);
categoryRoute.get('/:id', findByIdCategory);
categoryRoute.put('/:id', authMiddleware, updateCategory);
categoryRoute.delete('/:id', authMiddleware, deleteCategory);

module.exports = categoryRoute;
