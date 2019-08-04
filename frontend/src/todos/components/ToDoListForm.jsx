import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { blue } from '@material-ui/core/colors';
import { orange } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import Typography from '@material-ui/core/Typography'
import Checkbox from '@material-ui/core/Checkbox'
import TextFieldMaterialUi from '@material-ui/core/TextField'
import { TextField } from '../../shared/FormFields'
import { allTodosDone } from '../../shared/TodoListUtils'
import { checkDueDate } from '../../shared/TodoListUtils'

const useStyles = makeStyles({
  card: {
    margin: '3rem',
    flexGrow: 2
  },
  cardDone: {
    margin: '3rem',
    backgroundColor: blue[100],
    flexGrow: 2
  },
  todoLine: {
    display: 'flex',
    alignItems: 'center'
  },
  textField: {
    flexGrow: 1
  },
  dateClose: {
    backgroundColor: orange[100]
  },
  dateOverdue: {
    backgroundColor: red[100]
  },
  standardSpace: {
    margin: '8px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  }
})

export const ToDoListForm = ({ toDoList, saveToDoList }) => {
  const classes = useStyles()

  const [todos, setTodos] = useState(toDoList.todos)

  const allDone = allTodosDone(toDoList.todos)

  return (
    <Card className={allDone ? classes.cardDone : classes.card}>
      <CardContent>
        <Typography variant='headline' component='h2'>
          {toDoList.title}{allDone ? ', all done!' : ''}
        </Typography>
        <form className={classes.form}>
          {todos.map((todoInfo, index) => (
            <div key={index} className={classes.todoLine}>
              <Typography className={classes.standardSpace} variant='title'>
                {index + 1}
              </Typography>
              <Checkbox
                checked={todoInfo.done}
                color='primary'
                onChange={() => {
                  const newTodos = [
                    ...todos.slice(0, index),
                    {title: todos[index].title, done: !todoInfo.done,
                    date: todos[index].date},
                    ...todos.slice(index + 1)
                  ]
                  setTodos(newTodos) // immutable update
                  saveToDoList(toDoList.id, newTodos)
                }}
              />
              <TextField
                label='What to do?'
                value={todoInfo.title}
                onChange={event => {
                  const newTodos = [
                    ...todos.slice(0, index),
                    {title: event.target.value, done: todos[index].done,
                      date: todos[index].date},
                    ...todos.slice(index + 1)
                  ]
                  setTodos(newTodos) // immutable update
                  saveToDoList(toDoList.id, newTodos)
                }}
                className={classes.textField}
              />
              <TextFieldMaterialUi
                label='Due date'
                type='date'
                defaultValue={todoInfo.date}
                onChange={event => {
                  const newTodos = [
                    ...todos.slice(0, index),
                    {title: todos[index].title, done: todos[index].done,
                      date: event.target.value},
                    ...todos.slice(index + 1)
                  ]
                  setTodos(newTodos) // immutable update
                  saveToDoList(toDoList.id, newTodos)
                }}
                InputLabelProps={{
                  shrink: true
                }}
                InputProps={{
                  className: todoInfo.done !== true &&
                              checkDueDate(todoInfo.date) > 0 ?
                              (checkDueDate(todoInfo.date) > 1 ?
                                classes.dateOverdue : classes.dateClose) : ''
                }}
              />
              <Button
                size='small'
                color='secondary'
                className={classes.standardSpace}
                onClick={() => {
                  const newTodos = [
                    ...todos.slice(0, index),
                    ...todos.slice(index + 1)
                  ]
                  setTodos(newTodos) //immutable delete
                  saveToDoList(toDoList.id, newTodos)
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
          ))}
          <CardActions>
            <Button
              type='button'
              color='primary'
              onClick={() => {
                const newTodos = [...todos, {title: '', done: false, date: ''}]
                setTodos(newTodos) //immutable update
                saveToDoList(toDoList.id, newTodos)
              }}
            >
              Add Todo <AddIcon />
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
