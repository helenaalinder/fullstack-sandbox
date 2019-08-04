import React, { Fragment, useState, useEffect } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ReceiptIcon from '@material-ui/icons/Receipt'
import Typography from '@material-ui/core/Typography'
import { ToDoListForm } from './ToDoListForm'
import { CheckCircle } from '../../shared/FormFieldsAndIcons'
import { allTodosDone } from '../../shared/TodoListUtils'
import axios from 'axios'

const getPersonalTodos = () => {
  return fetch('/getTodoLists')
          .then(response => {
            return response.json()
          })
          .catch(err => {
            console.log('Failed to fetch todo lists, err', err)
          })
}

export const ToDoLists = ({ style }) => {
  const [toDoLists, setToDoLists] = useState({})
  const [activeList, setActiveList] = useState()

  useEffect(() => {
    getPersonalTodos()
      .then(setToDoLists)
  }, [])

  if (!Object.keys(toDoLists).length) return null
  return <Fragment>
    <Card style={style}>
      <CardContent>
        <Typography
          variant='headline'
          component='h2'
        >
          My ToDo Lists
        </Typography>
        <List>
          {Object.keys(toDoLists).map((key) => <ListItem
            key={key}
            button
            onClick={() => setActiveList(key)}
          >
            <ListItemIcon>
              <ReceiptIcon />
            </ListItemIcon>
            <ListItemText primary={toDoLists[key].title} />
            {allTodosDone (toDoLists[key].todos) ? <CheckCircle/> : ''}
          </ListItem>)}
        </List>
      </CardContent>
    </Card>
    {toDoLists[activeList] && <ToDoListForm
      key={activeList} // use key to make React recreate component to reset internal state
      toDoList={toDoLists[activeList]}
      saveToDoList={(id, todos) => {
        const listToUpdate = toDoLists[id]
        setToDoLists({
          ...toDoLists,
          [id]: { ...listToUpdate, todos }
        })
        const form = {
          id: id,
          todos: JSON.stringify(todos)
        }
        axios.post('/saveTodos', form)
          .then(response => {
            console.log ('Save successful, server responded with: ', response.data)
          })
          .catch(err => {
            return console.log ('Save failed, error: ', err)
          })
      }}
    />}
  </Fragment>
}
