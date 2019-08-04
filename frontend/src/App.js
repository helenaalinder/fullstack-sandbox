import React, { Component } from 'react'
import './App.css'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { ToDoLists } from './todos/components/ToDoLists'

const MainAppBar = () => {
  return <AppBar position='static' color='primary'>
    <Toolbar>
      <Typography variant='title' color='inherit'>
        Things to do
      </Typography>
    </Toolbar>
  </AppBar>
}

const mainWrapperStyle = { display: 'flex', flexDirection: 'column' }
const centerContentWrapper = { display: 'flex', justifyContent: 'center' }
const contentWrapperStyle = { display: 'flex', flexDirection: 'column', flexGrow: 1,
                              alignItems: 'center' }
const MainWrapper = ({ children }) => {
  return <div style={mainWrapperStyle}>
    <MainAppBar />
    <div style={centerContentWrapper}>
      <div style={contentWrapperStyle}>
        {children}
      </div>
    </div>
  </div>
}

class App extends Component {
  render () {
    return <MainWrapper>
      <ToDoLists
        style={{ width: '25rem', margin: '3rem', flexGrow: 1 }}
      />
    </MainWrapper>
  }
}

export default App
