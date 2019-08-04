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

app.get('/getTodoLists', (req, res) => res.json (todoLists))

app.post('/saveTodos', (req, res) => {
  const id = req.body.id
  const todosToSave = JSON.parse(req.body.todos)
  todoLists[id].todos = todosToSave
  res.sendStatus (201)
})
