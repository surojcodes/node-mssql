require('dotenv').config();

const config = {
  user: process.env.SQLSRV_USERNAME, // sql user
  password: process.env.SQLSRV_PASSWORD, //sql user password
  server: 'localhost',
  database: 'Stuff',
  options: {
    trustServerCertificate: true, //without this you get self-signed certificate error
    instancename: process.env.SQLSRV_INSTANCE, // SQL Server instance name
  },
  port: 1433,
};

module.exports = config;
