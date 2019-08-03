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
import request from 'request'

const getTodoListsOptions = {
  url: 'http://localhost:3001/getTodoLists'
}

const saveTodosOptions = (id, todos) => {
  return {
    url: 'http://localhost:3001/saveTodos',
    form: {
      id: id,
      todos: JSON.stringify(todos)
    }
  }
}

const getPersonalTodos = () => {
  return new Promise(resolve => {
    request.get(getTodoListsOptions, (err, res, body) => {
      if (err) {
        console.log('Fetch failed, error: ', err)
        resolve ({})
      }
      resolve (JSON.parse(body))
    })
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
          </ListItem>)}
        </List>
      </CardContent>
    </Card>
    {toDoLists[activeList] && <ToDoListForm
      key={activeList} // use key to make React recreate component to reset internal state
      toDoList={toDoLists[activeList]}
      saveToDoList={(id, { todos }) => {
        const listToUpdate = toDoLists[id]
        setToDoLists({
          ...toDoLists,
          [id]: { ...listToUpdate, todos }
        })
        request.post(saveTodosOptions(id, todos), (err, res, body) => {
          if (err)
            return console.log ('Save failed, error: ', err)
          console.log ('Save successful, server responded with: ', body)
        })
      }}
    />}
  </Fragment>
}
