import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

export const ProfileError = () => (
  <div className="container">
    <div className="profile">
      <p className='profile__error'>
        Please, <Link to='/#'>login</Link> to use this page 
      </p>
    </div>
  </div>
)