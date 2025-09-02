
type TodoListProps = {
  todos: string[];
};
function TodoList({todos}:TodoListProps) {
  return (
          <>
               { todos.length > 0 ? (
                    <div className="container mx-auto translate-y-32  bg-white rounded">
                              <ul>
                              {todos.map((todo, index) => {
                                   const capitalized = todo.charAt(0).toUpperCase() + todo.slice(1)
                                  return <li key={index} className="p-4 font-semibold text-lg border-b last:border-b-0 text-navy-850">{capitalized}</li>
                                   })}
                              </ul>
                         </div>): null}
          </>
  )
}

export default TodoList