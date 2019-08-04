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
import { TextField } from '../../shared/FormFieldsAndIcons'
import { CheckCircle } from '../../shared/FormFieldsAndIcons'
import { CheckCircleOutline } from '../../shared/FormFieldsAndIcons'
import { allTodosDone } from '../../shared/TodoListUtils'

const useStyles = makeStyles({
  card: {
    margin: '3rem',
    flexGrow: 2
  },
  cardDone: {
    margin: '3rem',
    backgroundColor: blue[50],
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

const getDueDateIndication = (todoInfo) => {
  const daysLeft = checkDueDate(todoInfo.date)
  if (todoInfo.done)
    return 'Done'
  if (daysLeft === 0) {
    return 'Due today'
  } else if (daysLeft < 0) {
    if (daysLeft === -1)
      return 'Was due ' + Math.abs(daysLeft) + ' day ago'
    return 'Was due ' + Math.abs(daysLeft) + ' days ago'
  } else if (daysLeft > 0) {
    if (daysLeft === 1)
      return 'Due in ' + daysLeft + ' day'
    return 'Due in ' + daysLeft + ' days'
  }
  return 'Set due date:'
}

const checkDueDate = (date) => {
  const currDate = new Date(date)
  const today = new Date()
  return currDate.getDate() - today.getDate()
}

export const ToDoListForm = ({ toDoList, saveToDoList }) => {
  const classes = useStyles()

  const [todos, setTodos] = useState(toDoList.todos)

  const allDone = allTodosDone(toDoList.todos)

  return (
    <Card className={allDone ? classes.cardDone : classes.card}>
      <CardContent>
        <Typography variant='headline' component='h2'>
          {toDoList.title}
        </Typography>
        <form className={classes.form}>
          {todos.map((todoInfo, index) => (
            <div key={index} className={classes.todoLine}>
              <Checkbox
                checked={todoInfo.done}
                icon={<CheckCircleOutline/>}
                checkedIcon={<CheckCircle/>}
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
                label={getDueDateIndication (todoInfo)}
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
