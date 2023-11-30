# node-mssql
A simple CRUD nodejs API with SQL Server as database. Project uses mssql npm package.
- Demonstrates Create, read, update and delete in SQL Server using nodejs
- Also, demonstate using Stored procedures defined in SQL Server

## Get Started
- Create a `.env` file
- Fill values in the file. `.env.example` provided as sample
- Run npm run dev
- Create database, tables and SP in SQL server. Code is attached to the repo, named `table_sp_create.sql`

## Endpoints
- GET '/api/todos' => Get all todos
- POST '/api/todos' => Create a new todo
- GET '/api/todos/:id'=> Get a single todo with id
- PATCH '/api/todos/:id' => Update a todo with id
- DELETE '/api/todos/:id' => Delete a todo with id
- POST '/sp-api/todos'=> Create a todo using SP
