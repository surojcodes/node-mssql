const express = require('express');
const sql = require('mssql');
const config = require('./dbconfig');
require('dotenv').config();

const {
  getTodo,
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require('./todos.controller');

const appPool = new sql.ConnectionPool(config);
const app = express();

//TODO Routes
app.post('/api/todos', createTodo);
app.get('/api/todos', getTodos);
app.get('/api/todos/:id', getTodo);
app.patch('/api/todos/:id', updateTodo);
app.delete('/api/todos/:id', deleteTodo);

//All other routes give 404
app.all('*', (req, res) => {
  res.sendStatus(404);
});

appPool
  .connect()
  .then((pool) => {
    app.locals.db = pool;
    console.log('Database connected!');
    app.listen(process.env.PORT, () =>
      console.log('Server listening on 3000...')
    );
  })
  .catch((err) => {
    console.log(err);
  });
