const { BlogPostService } = require('../services');

const create = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { user } = req;

  const newPost = await BlogPostService.create(user.id, title, content, categoryIds);
  if (newPost.status === 'NOT_FOUND') {
    return res.status(400).json(newPost.data);
  }
  return res.status(201).json(newPost);
};

const getAll = async (req, res) => {
  const allPosts = await BlogPostService.getAll();

  return res.status(200).json(allPosts);
};

module.exports = {
  create,
  getAll,
};