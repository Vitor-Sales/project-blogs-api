const { CategoryService } = require('../services');

const create = async (req, res) => {
  const { name } = req.body;

  const newCategory = await CategoryService.create({ name });

  return res.status(201).json(newCategory);
};

module.exports = {
  create,
};