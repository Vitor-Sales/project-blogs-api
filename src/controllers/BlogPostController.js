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

const getAll = async (_req, res) => {
  const allPosts = await BlogPostService.getAll();

  return res.status(200).json(allPosts);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const post = await BlogPostService.getById(id);

  if (!post) {
    return res.status(404).json({ message: 'Post does not exist' });
  }
  return res.status(200).json(post);
};

const update = async (req, res) => {
  const { id } = req.params;
  const postData = req.body;
  const { user } = req;

  const updatedPost = await BlogPostService.update(id, postData, user.id);

  if (updatedPost === false) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  return res.status(200).json(updatedPost);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};