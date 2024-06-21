const { Category } = require('../models');

const create = async (categoryNameData) => {
  const newCategory = await Category.create(categoryNameData);
  
  return newCategory;
};

module.exports = {
  create,
};