const express = require('express');
const {
  createPost,
  getAllPosts,
  findByIdPost,
  updatePost,
  deletePost,
  toggleAddDislikeToPost,
  toggleAddLikeToPost,
} = require('../controllers/controllers.posts');
const { photoUpload, postImgResize } = require('../utils/utils.upload');
const authMiddleware = require('../middleware/authMiddleware');

const postRoute = express.Router();

postRoute.post(
  '/',
  authMiddleware,
  photoUpload.single('image'),
  postImgResize,
  createPost
);

postRoute.put('/likes', authMiddleware, toggleAddLikeToPost);
postRoute.put('/dislikes', authMiddleware, toggleAddDislikeToPost);
postRoute.get('/', getAllPosts);
postRoute.get('/:id', findByIdPost);
postRoute.put('/:id', authMiddleware, updatePost);
postRoute.delete('/:id', authMiddleware, deletePost);

module.exports = postRoute;
