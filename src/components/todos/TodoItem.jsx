import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';
import { fetchEditTodo } from '../../api';
import { setIsLoading, setHasError } from '../../store/loading';
import { setUpdateTodos } from '../../store/todos';
import * as selectors from '../../store';

export const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  const token = useSelector(selectors.getToken);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const [newBody, setNewBody] = useState(todo.body);
  const [newStatus, setNewStatus] = useState(todo.status);

  const handleEdit = (newTodo, checked) => {
    dispatch(setIsLoading(true));

    try {
      const res = fetchEditTodo(newTodo, todo.id, token);

      res.then(() => {
        dispatch(setUpdateTodos(+Date.now()));
        if(checked) {
          setNewStatus(!newStatus)
        }
      })
    } catch(error) {
      dispatch(setHasError(true));
    }

    dispatch(setIsLoading(false));
    setIsEditing(false);
  }

  return (
    <li
      className={classnames({ 
        'todo__item': true,
        'completed': todo.status
      })}
    >
      <div className='round'>
        <input 
          type='checkbox' 
          id={todo.id} 
          checked={newStatus}
          onChange={() => handleEdit({ status: !newStatus }, true)}
        />
        <label htmlFor={todo.id}></label>
      </div>
      {isEditing ? (
        <>
          <div className='todo__edit'>
            <input 
              type="text" 
              className='todo__input-edit'
              value={newTitle}
              onChange={event => setNewTitle(event.target.value)}
            />
            <input 
              type="text" 
              className='todo__input-edit todo__input-edit--descr'
              value={newBody}
              onChange={event => setNewBody(event.target.value)}
            />
            <button 
              className='button button__edit button__edit--green'
              onClick={() => {
                handleEdit({ title: newTitle, body: newBody });
              }}
            >
              &#10004;
            </button>
          </div>
          <button 
            className='button button__edit'
            onClick={() => {
              setIsEditing(false);
              setNewTitle(todo.title);
              setNewBody(todo.body);
            }}
          >
            &#10005;
          </button>
        </>
      ) : (
        <>
          <p className='todo__title'>{todo.title}</p>
          <p className='todo__description'>{todo.body}</p>
          <button 
            className='button button__edit'
            onClick={() => {
              setIsEditing(true);
            }}
          >
            edit
          </button>
        </>
      )}
    </li>
  );
};