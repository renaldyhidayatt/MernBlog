const Category = require('../models/Category');

const createCategory = async (req, res) => {
  try {
    const category = await Category.create({
      user: req.user._id,
      title: req.body.title,
    });
    res.json(category);
  } catch (error) {
    res.json(error);
  }
};

const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find({})
      .populate('user')
      .sort('-createdAt');
    res.json(categories);
  } catch (error) {
    res.json(error);
  }
};

const findByIdCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id)
      .populate('user')
      .sort('-createdAt');
    res.json(category);
  } catch (error) {
    res.json(error);
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndUpdate(
      id,
      {
        title: req?.body?.title,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(category);
  } catch (error) {
    res.json(error);
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndDelete(id);

    res.json(category);
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  createCategory,
  getAllCategory,
  findByIdCategory,
  updateCategory,
  deleteCategory,
};
