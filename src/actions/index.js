
export function addAllTodo(todos) {
  return { type: 'ADD_ALL_TODO', todos}
}


export function changeFilter(filter) {
  return { type: 'CHANGE_FILTER', filter}
}
