const express = require('express');
const validateJWT = require('./middleware/auth/validateJWT');
const { login, UserController } = require('./controllers');
const validateUser = require('./middleware/validateUser');
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
app.get('/user', validateJWT, validateUser, UserController.getAll);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
