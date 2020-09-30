import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import Loader from '../loader';
import { fetchRegister } from '../../api'; 
import { setHasError, setIsLoading } from '../../store/loading';
import * as selectors from '../../store';

export const SignUp = ({ history }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectors.getIsLoading);
  const hasError = useSelector(selectors.getHasError);

  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
  });

  useEffect(() => {
    dispatch(setIsLoading(false));
    dispatch(setHasError(false));
  }, []);

  const errorInput = classnames({ 'error-input': hasError })
  const errorEmail = classnames({ 'error-input': user.email && hasError })

  const handleChange = (event) => {
    const key = event.target.id;
    const value = event.target.value;
    dispatch(setHasError(false));
    setUser(prev => ({ ...prev, [key]: value }));
  }

  const handleRegister = (event) => {
    event.preventDefault();
    dispatch(setIsLoading(true));

    if ('username' in user && 'password' in user) {
      const res = fetchRegister(user);
      res.then(() => {
          history.push('/');
        })
        .catch(() => {
          dispatch(setHasError(true));
        });
    } else {
      dispatch(setHasError(true));
    }
    
    dispatch(setIsLoading(false));
  }

  return (
    <div className="container">
      {isLoading && <Loader />}
      <form 
        className='form form-sign' 
        onSubmit={handleRegister}
      >
        <h2 className='form__heading'>Registration Form</h2>
        <div className='form__row'>
          <div className="form__item">
            <label htmlFor="first_name" className='form__label'>
              First Name
            </label>
            <input 
              value={user.first_name}
              type="text" 
              id='first_name' 
              className='form__input'
              onChange={handleChange}
            />
          </div>
          <div className="form__item">
            <label htmlFor="last_name" className='form__label'>
              Last Name
            </label>
            <input 
              value={user.last_name}
              type="text" 
              id='last_name' 
              className='form__input'
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='form__row'>
          
          <div className="form__item form__email">
            <label htmlFor="email" className='form__label'>
              Email
              </label>
            <input 
              value={user.email}
              type="text" 
              id='email' 
              className={`form__input form__input--email ${errorEmail}`}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='form__row'>
          <div className="form__item">
            <label 
              htmlFor="username" 
              className='form__label required'
            >
              Username
            </label>
            <input 
              value={user.username}
              type="text" 
              id='username' 
              className={`form__input ${errorInput}`}
              onChange={handleChange}
            />
          </div>
          <div className="form__item">
            <label 
              htmlFor="password" 
              className='form__label required'
            >
              Password
            </label>
            <input 
              value={user.password}
              type="password" 
              id='password' 
              className={`form__input ${errorInput}`}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form__buttons">
          <button type="submit" className='button button__pink'>Sign Up</button>
          <p className='form__or'>OR</p>
          <NavLink to='/'><button className="button form__button">Sign In</button></NavLink>
        </div>
      </form>
    </div>
  )
}

