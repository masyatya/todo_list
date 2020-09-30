import React from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from '../../store/token';

export const ProfileHeader = ({ history }) => {
  const dispatch = useDispatch();
  const handleSignOut = () => {
    dispatch(setToken(''));
    history.push('/');
  }

  return (
    <div className="profile__header">
      <h1 className='profile__heading'>TODOS</h1>
      <button 
        className="profile__button"
        onClick={handleSignOut}
      >
        Sign Out
      </button>
    </div>
  );
};