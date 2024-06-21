const { CategoryService } = require('../services');

const create = async (req, res) => {
  const { name } = req.body;

  const newCategory = await CategoryService.create({ name });

  return res.status(201).json(newCategory);
};

const getAll = async (req, res) => {
  const allCategories = await CategoryService.getAll();

  return res.status(200).json(allCategories);
};

module.exports = {
  create,
  getAll,
};