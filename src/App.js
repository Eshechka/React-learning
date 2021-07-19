import React, {useEffect} from 'react';
import TodoList from './Todo/TodoList.js';
import Loader from './Loader.js';
import AddTodo from './Todo/AddTodo.js';
import Modal from './Modal/Modal.js';
import ContextRemove from './contextRemove.js';

function App() {
  let [todos, setTodos] = React.useState([]);
  let [loading, setLoading] = React.useState([true]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(response => response.json())
      .then(todos => {
        setTimeout(() => {
          setTodos(todos);
          setLoading(false);
        }, 2000);
      });
  }, []);
    
  function createItem(value) {
    todos = todos.concat([
      {
        id: todos[todos.length - 1].id + 1, 
        completed: false,
        title: value
      }
    ]);
    setTodos(todos);
  }

  function deleteItem(id) {
    todos = todos.filter(todo => {
        return todo.id !== id;
      });
      setTodos(todos);
  }

  function toggleTodo(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
      setTodos(todos);
  }

  return (
    <ContextRemove.Provider 
      value={{ 
        deleteItem: deleteItem
      }}>
    <div className="wrapper">
    {!loading && <Modal></Modal>}
      <h1>react tutorial</h1>
      {loading && <Loader></Loader>}
      {!loading && <AddTodo
        onCreate={createItem} 
      ></AddTodo>}
      {todos.length ? 
      <TodoList
        todos={todos}
        onToggle={toggleTodo}
      ></TodoList> :
      <p>У вас нет todos</p>
    }
    </div>
    </ContextRemove.Provider>
  );
}

export default App;
