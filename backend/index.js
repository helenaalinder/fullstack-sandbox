const express = require('express')
const body_parser = require ('body-parser')
const app = express()

const PORT = 3001

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))

let todoLists = {
  '0000000001': {
    id: '0000000001',
    title: 'First List',
    todos: []
  },
  '0000000002': {
    id: '0000000002',
    title: 'Second List',
    todos: []
  }
}

const allowLocalhostOrigin = (res) => {
  res.setHeader ('Access-Control-Allow-Origin','http://localhost:3000')
}

app.get('/getTodoLists', (req, res) => {
  allowLocalhostOrigin(res)
  res.json (todoLists)
})
