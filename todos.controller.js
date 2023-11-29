const createTodo = (req, res) => {
  res.send('Create a Todo');
};
const getTodos = (req, res) => {
  res.send('Get all todos');
};
const getTodo = (req, res) => {
  res.send('Get a todo');
};
const updateTodo = (req, res) => {
  res.send('Update a todo');
};
const deleteTodo = (req, res) => {
  res.send('Delete a todo');
};

module.exports = { getTodos, getTodo, createTodo, updateTodo, deleteTodo };
