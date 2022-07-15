import React, { useContext } from 'react';
import { login } from '../../api/UserAuthAPI';
import { UserAuthContext } from '../../contexts/UserAuthContext';
import { Navigate } from "react-router-dom";

const Login = () => {
  const { user } = useContext(UserAuthContext)

  const handleLogin = async (evt) => {
    evt.preventDefault()
    let userObj = {
      'username': evt.target.username.value,
      'password': evt.target.password.value
    }
    let response = await login(userObj)
    if (response['access']) {
      localStorage.setItem('access_token', response['access'])
    }
    if (response['refresh']) {
      localStorage.setItem('refresh_token', response['refresh'])
    }
  }
  console.log('user: ', user.user)
  return (
    <div>
      <h1>Login</h1>
      {
        user.user &&
        <Navigate to="/today" replace={true} />
      }
      <form onSubmit={handleLogin}>
        <h3>UserName</h3>
        <input className="input input" name='username' type="text" placeholder="Username" />
        <h3>Password</h3>
        <input className="input input" name='password' type="password" placeholder="password" />
        <button className="button is-primary" type='submit'>Login</button>
      </form>
    </div>
  );
};

export default Login;
