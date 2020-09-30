import React from 'react';
import { useSelector } from 'react-redux';
import * as selectors from '../../store';
import { TodoItem } from './TodoItem';

export const TodoList = () => {
  const todos = useSelector(selectors.getTodos);

  return (
    <ul className='todo__list'>
      {todos.map(todo => (
      <TodoItem 
        key={todo.id} 
        todo={todo}
      />
      ))}
    </ul>
  );
}