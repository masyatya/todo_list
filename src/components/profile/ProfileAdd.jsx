import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAddTodo } from '../../api';
import { setUpdateTodos } from '../../store/todos'; 
import { setIsLoading, setHasError } from '../../store/loading';
import * as selectors from '../../store';

export const ProfileAdd = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectors.getToken);

  const [newTodo, setNewTodo] = useState({
    id: '',
    title: '',
    body: '',
  });

  const handleChange = (event) => {
    const key = event.target.id;
    const value = event.target.value;

    setNewTodo(prev => ({ ...prev, [key]: value }));
  }
  
  const handleAdd = () => {
    setNewTodo(prev => ({ ...prev, id: +new Date() }));
    dispatch(setIsLoading(true));

    try {
      const res = fetchAddTodo(newTodo, token);

      res.then(() => {
        dispatch(setUpdateTodos(+Date.now()));
      });
      setNewTodo({ id: '', title: '', body: '' });
    } catch(error) {
      dispatch(setHasError(true));
    }

    dispatch(setIsLoading(false));
  }

  return (
    <div className="profile__add">
      <input 
        value={newTodo.title}
        id='title'
        type="text" 
        className="form__input form__input-add" 
        placeholder="Title"
        onChange={handleChange}
      />
      <textarea 
        value={newTodo.body}
        id='body'
        className="form__input form__textarea" 
        placeholder="Description"
        onChange={handleChange}
      ></textarea>
      <button 
        className="button"
        onClick={handleAdd}
      >
        Add Todo
      </button>
    </div>
  );
};