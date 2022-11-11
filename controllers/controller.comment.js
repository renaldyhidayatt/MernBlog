const Comment = require('../models/Comment');
const blockUser = require('../utils/utils.blockUser');
const validateMongodbById = require('../utils/utils.validateByid');

const createComment = async (req, res) => {
  const user = req.user;

  blockUser(user);

  const { postId, description } = req.body;

  try {
    const comment = await Comment.create({
      post: postId,
      user,
      description,
    });
    res.json(comment);
  } catch (error) {
    res.json(error);
  }
};

const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({}).sort('-created');
    res.json(comments);
  } catch (error) {
    res.json(error);
  }
};

const findByIdComments = async (req, res) => {
  const { id } = req.params;
  validateMongodbById(id);
  try {
    const comment = await Comment.findById(id);
    res.json(comment);
  } catch (error) {
    res.json(error);
  }
};

const updateComment = async (req, res) => {
  const { id } = req.params;
  validateMongodbById(id);
  try {
    const update = await Comment.findByIdAndUpdate(
      id,
      {
        user: req?.user,
        description: req?.body?.description,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(update);
  } catch (error) {
    res.json(error);
  }
};

const deleteComment = async (req, res) => {
  const { id } = req.params;
  validateMongodbById(id);
  try {
    const comment = await Comment.findByIdAndDelete(id);
    res.json(comment);
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  createComment,
  getAllComments,
  findByIdComments,
  updateComment,
  deleteComment,
};
