import * as React from 'react';
import { TodosContext } from '../../todo-context';
import './todo-form.scss';

export const TodoForm = () => {
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const { todos, setTodos } = React.useContext(TodosContext);
  const [task, setTask] = React.useState('');

  const handleAddTodo = () => {
    if (task.trim() === '') {
      return;
    }

    const newTodo = {
      id: todos.length > 0 ? Math.max(...todos.map((todo) => todo.id)) + 1 : 0,
      label: task.trim(),
      checked: false,
    };

    setTodos([...todos, newTodo]);
    setTask('');
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      handleAddTodo();
    }
  };

  return (
    <section className="todo-form">
      <input
        ref={inputRef}
        aria-label="Add new task"
        placeholder="Enter new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyUp={handleKeyUp}
      />
      <button type="button" onClick={handleAddTodo}>
        Add task
      </button>
    </section>
  );
};
