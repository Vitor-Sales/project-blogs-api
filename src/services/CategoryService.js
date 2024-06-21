const { Category } = require('../models');

const create = async (categoryNameData) => {
  const newCategory = await Category.create(categoryNameData);
  
  return newCategory;
};

const getAll = async () => {
  const allCategories = await Category
    .findAll({
      order: [
        ['name', 'DESC'],
      ], 
    });
  return allCategories;
};

module.exports = {
  create,
  getAll,
};