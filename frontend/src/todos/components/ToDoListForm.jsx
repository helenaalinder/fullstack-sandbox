import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import Typography from '@material-ui/core/Typography'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { TextField } from '../../shared/FormFields'

const useStyles = makeStyles({
  card: {
    margin: '1rem'
  },
  todoLine: {
    display: 'flex',
    alignItems: 'center'
  },
  textField: {
    flexGrow: 1
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

  const handleSubmit = event => {
    event.preventDefault()
    saveToDoList(toDoList.id, { todos })
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant='headline' component='h2'>
          {toDoList.title}
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          {todos.map((todoInfo, index) => (
            <div key={index} className={classes.todoLine}>
              <Typography className={classes.standardSpace} variant='title'>
                {index + 1}
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={todoInfo.done}
                    color='primary'
                    onChange={() => {
                      setTodos([ // immutable update
                        ...todos.slice(0, index),
                        {title: todos[index].title, done: !todos[index].done},
                        ...todos.slice(index + 1)
                      ])
                    }}
                  />
                }
              />
              <TextField
                label='What to do?'
                value={todoInfo.title}
                onChange={event => {
                  setTodos([ // immutable update
                    ...todos.slice(0, index),
                    {title: event.target.value, done: todos[index].done},
                    ...todos.slice(index + 1)
                  ])
                }}
                className={classes.textField}
              />
              <Button
                size='small'
                color='secondary'
                className={classes.standardSpace}
                onClick={() => {
                  setTodos([ // immutable delete
                    ...todos.slice(0, index),
                    ...todos.slice(index + 1)
                  ])
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
                setTodos([...todos, {title: '', done: false}])
              }}
            >
              Add Todo <AddIcon />
            </Button>
            <Button type='submit' variant='contained' color='primary'>
              Save
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
