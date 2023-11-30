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
const findTodo = async (req, id) => {
  try {
    const result = await req.app.locals.db.query(
      `SELECT * from ${tableName} where id = ${id}`
    );
    if (!result || result.recordset.length === 0) return 0;
    else return 1;
  } catch (err) {
    console.log('Error while fetching todos:', err);
    return 0;
  }
};
const updateTodo = async (req, res) => {
  const id = req.params.id;
  const todoExists = await findTodo(req, id);
  if (!todoExists) {
    return res.status(400).json({
      success: false,
      data: `Todo with id ${id} not found.`,
    });
  }
  const { title, description } = req.body;
  let sql = `UPDATE ${tableName} SET updatedAt=GETDATE(), `;
  if (title) sql += `title='${title}'`;
  if (description) sql += `,description='${description}' `;
  sql += ` WHERE id = ${id}`;
  console.log(sql);
  try {
    const result = await req.app.locals.db.query(sql);
    if (result.rowsAffected[0] === 1) {
      res.status(201).json({
        success: true,
        data: `Todo with id ${id} updated.`,
      });
    } else {
      throw new Error('Error while updating todos');
    }
  } catch (err) {
    console.log('Error while updating todos:', err);
    res.status(500).json({
      success: false,
      data: 'Error updating todos',
    });
  }
};
const deleteTodo = async (req, res) => {
  const id = req.params.id;
  const todoExists = await findTodo(req, id);
  if (!todoExists) {
    return res.status(400).json({
      success: false,
      data: `Todo with id ${id} not found.`,
    });
  }
  try {
    const result = await req.app.locals.db.query(`
      DELETE FROM ${tableName}
      WHERE id = ${id}
    `);
    if (result.rowsAffected[0] === 1) {
      res.status(201).json({
        success: true,
        data: `Todo with id ${id} deleted.`,
      });
    } else {
      throw new Error('Error while deleting todos');
    }
  } catch (err) {
    console.log('Error while deleting todos:', err);
    res.status(500).json({
      success: false,
      data: 'Error deleting todos',
    });
  }
};

module.exports = { getTodos, getTodo, createTodo, updateTodo, deleteTodo };
