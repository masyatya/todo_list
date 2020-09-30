import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setQueryStore } from '../../store/todos';

export const ProfileSearch = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');

  const handleSearch = (event, a) => {
    event.preventDefault();

    if(a === '') {
      dispatch(setQueryStore(''));
    } else {
      dispatch(setQueryStore(query.trim()));
      setQuery(query.trim());
    }
  }

  return (
    <>
      <form 
        className="profile__search" 
        onSubmit={handleSearch}
      >
        <input 
          value={query}
          type="text" 
          className="form__input" 
          placeholder="Enter the title of todo"
          onChange={event => setQuery(event.target.value)}
        />
        <button 
          className="button"
          type='submit'
        >
          Search
        </button>
      </form>
      <p className='profile__notice'>If you want to see all todos, search with an empty string.</p>
    </>
  )
}