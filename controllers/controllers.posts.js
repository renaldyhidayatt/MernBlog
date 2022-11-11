const fs = require('fs');
const Post = require('../models/Post');
const Filter = require('bad-words');
const validateMongodbById = require('../utils/utils.validateByid');
const User = require('../models/User');
const cloudinaryUploadImg = require('../utils/utils.cloudinary');
const blockUser = require('../utils/utils.blockUser');

const createPost = async (req, res) => {
  const { _id } = req.user;

  blockUser(req.user);

  const filter = new Filter();

  const isProfane = filter.isProfane(req.body.title, req.body.description);

  if (isProfane) {
    await User.findByIdAndUpdate(_id, {
      isBlocked: true,
    });
    throw new Error(
      'Creating Failed because it contains profane words and you have been blocked'
    );
  }

  if (
    req?.user?.accountType === 'Starter Account' &&
    req?.user?.postCount >= 2
  ) {
    throw new Error(
      'Starter account can only create two posts. Get more followers.'
    );
  }

  const localPath = `public/images/posts/${req.file.filename}`;

  const imgUploaded = await cloudinaryUploadImg(localPath);
  try {
    const post = await Post.create({
      ...req.body,
      user: _id,
      image: imgUploaded?.url,
    });

    await User.findByIdAndUpdate(
      _id,
      {
        $inc: { postCount: 1 },
      },
      {
        new: true,
      }
    );

    fs.unlinkSync(localPath);
    res.json(post);
  } catch (error) {
    res.json(error);
  }
};

const getAllPosts = async (req, res) => {
  const hasCategory = req.query.category;
  try {
    if (hasCategory) {
      const posts = await Post.find({ category: hasCategory })
        .populate('user')
        .populate('comments')
        .sort('-createdAt');

      res.json(posts);
    } else {
      const posts = await Post.find({})
        .populate('user')
        .populate('comments')
        .sort('-createdAt');
      res.json(posts);
    }
  } catch (error) {
    res.json(error);
  }
};

const findByIdPost = async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const post = await Post.findById(id)
      .populate('user')
      .populate('disLikes')
      .populate('likes')
      .populate('comments');

    await Post.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 1 },
      },
      { new: true }
    );
    res.json(post);
  } catch (error) {
    res.json(error);
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  validateMongodbById(id);

  try {
    const post = await Post.findByIdAndUpdate(
      id,
      {
        ...req.body,
        user: req.user?._id,
      },
      {
        new: true,
      }
    );
    res.json(post);
  } catch (error) {
    res.json(error);
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  validateMongodbById(id);
  try {
    const post = await Post.findOneAndDelete(id);
    res.json(post);
  } catch (error) {
    res.json(error);
  }
};

const toggleAddLikeToPost = async (req, res) => {
  const { postId } = req.body;
  const post = await Post.findById(postId);

  const loginUserId = req?.user?._id;

  const isLiked = post?.isLiked;

  const alreadyDisliked = post?.disLikes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );

  if (alreadyDisliked) {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { disLikes: loginUserId },
        isDisLiked: false,
      },
      { new: true }
    );
    res.json(post);
  }

  if (isLiked) {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(post);
  } else {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { likes: loginUserId },
        isLiked: true,
      },
      { new: true }
    );
    res.json(post);
  }
};

const toggleAddDislikeToPost = async (req, res) => {
  const { postId } = req.body;
  const post = await Post.findById(postId);
  const loginUserId = req?.user?._id;

  const isDisLiked = post?.isDisLiked;

  const alreadyLiked = post?.likes?.find(
    (userId) => userId.toString() === loginUserId?.toString()
  );

  if (alreadyLiked) {
    const post = await Post.findOneAndUpdate(
      postId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(post);
  }

  if (isDisLiked) {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { disLikes: loginUserId },
        isDisLiked: false,
      },
      { new: true }
    );
    res.json(post);
  } else {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { disLikes: loginUserId },
        isDisLiked: true,
      },
      { new: true }
    );
    res.json(post);
  }
};

module.exports = {
  createPost,
  getAllPosts,
  findByIdPost,
  updatePost,
  deletePost,
  toggleAddDislikeToPost,
  toggleAddLikeToPost,
};
