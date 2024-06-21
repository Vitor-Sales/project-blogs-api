const express = require('express');
const validateJWT = require('./middleware/auth/validateJWT');
const { login, UserController, CategoryController } = require('./controllers');
const validateUser = require('./middleware/validateUser');
const validateCategory = require('./middleware/validateCategory');
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

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
