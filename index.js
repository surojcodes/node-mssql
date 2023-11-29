const express = require('express');
const sql = require('mssql');
const config = require('./dbconfig');
require('dotenv').config();

const appPool = new sql.ConnectionPool(config);
const app = express();

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
