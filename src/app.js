const express = require('express');
const validateJWT = require('./middleware/auth/validateJWT');
const { 
  login,
  UserController, 
  CategoryController, 
  BlogPostController,
} = require('./controllers');
const validateUser = require('./middleware/validateUser');
const validateCategory = require('./middleware/validateCategory');
const validatePost = require('./middleware/validatePost');
// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

// ...

app.post('/login', login);

app.post('/user', validateUser, UserController.create);
app.get('/user', validateJWT, UserController.getAll);
app.get('/user/:id', validateJWT, UserController.getById);

app.post('/categories', validateJWT, validateCategory, CategoryController.create);
app.get('/categories', validateJWT, CategoryController.getAll);

app.post('/post', validatePost, validateJWT, BlogPostController.create);
app.get('/post', validateJWT, BlogPostController.getAll);
app.get('/post/:id', validateJWT, BlogPostController.getById);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
