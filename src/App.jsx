import React from 'react';
import { Route } from 'react-router-dom';
import SignUp from './components/signUp';
import SignIn from './components/signIn';
import Profile from './components/profile';

function App() {
  return (
    <div className="App">
      <Route path='/sign-up' exact component={SignUp} />
      <Route path='/' exact component={SignIn} />
      <Route path='/Profile' component={Profile} />
    </div>
  );
}

export default App;
