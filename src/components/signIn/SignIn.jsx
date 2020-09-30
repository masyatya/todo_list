import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import Loader from '../loader';
import { fetchToken } from '../../api';
import { setHasError, setIsLoading } from '../../store/loading';
import { setToken } from '../../store/token';
import * as selectors from '../../store';

export const SignIn = ({ history }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectors.getIsLoading);
  const hasError = useSelector(selectors.getHasError);
  const token = useSelector(selectors.getToken);

  const errorInput = classnames({ 'error-input': hasError })
  const errorText = classnames({ 'error-text': hasError })

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    dispatch(setIsLoading(false));
    dispatch(setHasError(false));
  }, []);

  const handleLogin = (event) => {
    dispatch(setIsLoading(true));

    event.preventDefault();

    if(!login || !password) {
      dispatch(setHasError(true))
      dispatch(setIsLoading(false));
      return;
    }

    const res = fetchToken(login, password)

    res.then(response => {
      dispatch(setToken(response.data.token));
      history.push('/profile');
    })
    .catch(error => {
      dispatch(setHasError(true));
      setPassword('');
      dispatch(setToken(''));
    });

    dispatch(setIsLoading(false));
  };

  if(token !== '') {  
    history.push('/profile');
  };

  return (
    <div className="container">
      {isLoading && <Loader />}
      <form className="form form-sign" onSubmit={handleLogin}>
        <h2 className="form__heading">Sign In</h2>
        <div className='form__row'>
          <div className="form__item">
            <label htmlFor="username" className={`form__label ${errorText}`}>
              Username
            </label>
            <input 
              value={login}
              type="text" 
              id='username' 
              className={`form__input ${errorInput}`}
              onChange={event => {
                setLogin(event.target.value);
                dispatch(setHasError(false));
              }}
            />
          </div>
          <div className="form__item">
            <label htmlFor="password" className={`form__label ${errorText}`}>
              Password
            </label>
            <input 
              value={password}
              type="password" 
              id='password' 
              className={`form__input ${errorInput}`}
              onChange={event => {
                setPassword(event.target.value);
                dispatch(setHasError(false));
              }}
            />
          </div>
        </div>
        
        <div className="form__buttons">
          <button type="submit" className="button form__button">Sign In</button>
          <p className='form__or'>OR</p>
          <NavLink to='/sign-up'><button className="button button__pink">Sign Up</button></NavLink>
        </div>
      </form>
    </div>
  )
}