export const allTodosDone = (todos) => {
  if (todos === null || todos.length === 0)
    return false
  for (let i = 0; i < todos.length; i++) {
    if (!todos[i].done)
      return false
  }
  return true
}

export const checkDueDate = (date) => {
  const currDate = new Date(date)
  if(isTodayOrPassed(currDate))
    return 2
  else if(isTomorrow(currDate))
    return 1
  return 0
}

const isTodayOrPassed = (date) => {
  const today = new Date ()
  return date <= today
}

const isTomorrow = (date) => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate () + 1)
  return date.getFullYear() === tomorrow.getFullYear() &&
          date.getMonth() === tomorrow.getMonth() &&
          date.getDay() === tomorrow.getDay()
}