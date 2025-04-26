import * as React from 'react';
import { Checkbox } from '../checkbox';
import { TodosContext } from '../../todo-context';
import './todo-list.scss';

export const TodoList = () => {
  const { todos, setTodos } = React.useContext(TodosContext);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filter, setFilter] = React.useState('all');
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.label.toLowerCase()
      .includes(searchTerm.toLowerCase());

    if (filter === 'completed') {
      return matchesSearch && todo.checked;
    }
    if (filter === 'incomplete') {
      return matchesSearch && !todo.checked;
    }
    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredTodos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTodos = filteredTodos.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    if (paginatedTodos.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const toggleCheck = (id) => {
    setTodos(todos.map((todo) => (
      todo.id === id ? { ...todo, checked: !todo.checked } : todo
    )));
  };

  return (
    <section className="todo-list">
      <div className="controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setSearchTerm('');
                e.target.blur();
              }
            }}
          />
        </div>
        <div className="filter-buttons">
          <button
            type="button"
            className={filter === 'all' ? 'active' : ''}
            onClick={() => {
              setFilter('all');
              setCurrentPage(1);
            }}
          >
            All
          </button>
          <button
            type="button"
            className={filter === 'incomplete' ? 'active' : ''}
            onClick={() => {
              setFilter('incomplete');
              setCurrentPage(1);
            }}
          >
            Incomplete
          </button>
          <button
            type="button"
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => {
              setFilter('completed');
              setCurrentPage(1);
            }}
          >
            Completed
          </button>
        </div>
      </div>

      <div className="todo-list-content">
        {paginatedTodos.length ? (
          paginatedTodos.map((todoItem) => (
            <Checkbox
              key={todoItem.id}
              label={todoItem.label}
              checked={todoItem.checked}
              onClick={() => toggleCheck(todoItem.id)}
              onDelete={() => handleDelete(todoItem.id)}
            />
          ))
        ) : (
          <div className="no-todos">
            {searchTerm ? 'No matching tasks found' : 'No tasks to display'}
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination-controls">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          <span>
            {currentPage}
            {' of '}
            {totalPages}
          </span>
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};
