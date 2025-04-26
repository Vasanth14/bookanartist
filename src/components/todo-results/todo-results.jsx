import * as React from 'react';
import { TodosContext } from '../../todo-context';
import './todo-results.scss';

export const TodoResults = () => {
  const { todos } = React.useContext(TodosContext);

  const calculateChecked = () => todos.filter((todo) => todo.checked).length;

  return (
    <section className="todo-results">
      <p>
        <span>
          Done:
          {' '}
          {calculateChecked()}
        </span>
      </p>
    </section>
  );
};
