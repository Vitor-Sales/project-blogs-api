const { BlogPost, Category, PostCategory, User } = require('../models');

const categoriesExists = async (categoriesIds) => {
  const allCategoriesExists = await Promise.all(categoriesIds
    .map((category) => Category.findByPk(category))); 

  return allCategoriesExists.includes(null);
};

const createPostCategory = async (postId, categoryIds) => {
  await Promise.all(categoryIds.map((categoryId) => PostCategory.create({ postId, categoryId })));
};

const create = async (userId, title, content, categoryIds) => {
  const newPost = await BlogPost.create({ userId, title, content, categoryIds });
  const allCategoriesExists = await categoriesExists(categoryIds);

  if (allCategoriesExists) {
    return { 
      status: 'NOT_FOUND', 
      data: { message: 'one or more "categoryIds" not found' },
    };
  }
  await createPostCategory(newPost.id, categoryIds);

  return newPost;
};

const getAll = async () => {
  const allPosts = await BlogPost.findAll({
    include: [
      { model: Category, as: 'categories', through: { attributes: [] } },
      { model: User, as: 'user', attributes: { exclude: ['password'] } }, 
    ],
  });

  return allPosts;
};

const getById = async (postId) => {
  const post = await BlogPost.findByPk(postId, {
    include: [
      { model: Category, as: 'categories', through: { attributes: [] } },
      { model: User, as: 'user', attributes: { exclude: ['password'] } }, 
    ],
  });
  return post;
};
const update = async (id, postData, tokenId) => {
  const post = await getById(id);
  console.log('tokenId', tokenId);
  console.log('userId', post.userId);
  if (post.userId !== tokenId) {
    return false;
  }
  await BlogPost.update(postData, { where: { id } });
  const updatedPost = await getById(id);
  return updatedPost;
};
module.exports = { create, getAll, getById, update };