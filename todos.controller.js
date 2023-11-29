const tableName = 'todos';
const createTodo = (req, res) => {
  res.send('Create a Todo');
};
const getTodos = async (req, res) => {
  try {
    const result = await req.app.locals.db.query(
      `SELECT TOP 5 * FROM ${tableName}`
    );
    const todos = result.recordset;
    res.status(200).json({
      success: true,
      data: todos,
    });
  } catch (err) {
    console.log('Error while fetching todos:', err);
    res.status(500).json({
      success: false,
      data: 'Error fetching todos',
    });
  }
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
