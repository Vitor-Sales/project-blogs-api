const { BlogPost, Category, PostCategory } = require('../models');

const categoriesExists = async (categoriesIds) => {
  const allCategoriesExists = await Promise.all(categoriesIds
    .map((category) => Category.findByPk(category)));
  // console.log('allCategoriesExists', allCategoriesExists);  
  // console.log('includes', allCategoriesExists.includes(undefined));  

  return allCategoriesExists.includes(null);
};

const createPostCategory = async (postId, categoryIds) => {
  await Promise.all(categoryIds.map((categoryId) => PostCategory.create({ postId, categoryId })));
};

const create = async (userId, title, content, categoryIds) => {
  const newPost = await BlogPost.create({ userId, title, content, categoryIds });
  const allCategoriesExists = await categoriesExists(categoryIds);
  // console.log('allCategoriesExists222', allCategoriesExists);
  if (allCategoriesExists) {
    return { 
      status: 'NOT_FOUND', 
      data: { message: 'one or more "categoryIds" not found' },
    };
  }
  await createPostCategory(newPost.id, categoryIds);
  // console.log('categoryIds: ', categoryIds);
  // console.log('newPost: ', newPost);

  return newPost;
};

module.exports = {
  create,
};