const tableName = 'todos';
const createTodo = async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({
      success: false,
      data: `Please provide both title and description`,
    });
  }
  try {
    const result = await req.app.locals.db.query(`
    INSERT INTO ${tableName} (title,description,createdAt,updatedAt)
    VALUES ('${title}','${description}',GETDATE(),GETDATE());
    `);
    if ((result.rowsAffected[0] = 1)) {
      res.status(201).json({
        success: true,
        data: 'Todo created',
      });
    }
  } catch (err) {
    console.log('Error while creating todo:', err);
    res.status(500).json({
      success: false,
      data: 'Error creating todo',
    });
  }
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
const getTodo = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await req.app.locals.db.query(
      `SELECT * from ${tableName} where id = ${id}`
    );
    if (!result || result.recordset.length === 0) {
      res.status(400).json({
        success: false,
        data: `Todo with id ${id} not found.`,
      });
    } else {
      res.status(200).json({
        success: true,
        data: result.recordset,
      });
    }
  } catch (err) {
    console.log('Error while fetching todos:', err);
    res.status(500).json({
      success: false,
      data: 'Error fetching todos',
    });
  }
};
const updateTodo = (req, res) => {
  res.send('Update a todo');
};
const deleteTodo = (req, res) => {
  res.send('Delete a todo');
};

module.exports = { getTodos, getTodo, createTodo, updateTodo, deleteTodo };
