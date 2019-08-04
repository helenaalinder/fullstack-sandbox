export const allTodosDone = (todos) => {
  if (todos === null || todos.length === 0)
    return false
  for (let i = 0; i < todos.length; i++) {
    if (!todos[i].done)
      return false
  }
  return true
}