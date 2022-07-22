import React, { useContext } from 'react';
import { login } from '../../api/UserAuthAPI';
import { UserAuthContext } from '../../contexts/UserAuthContext';
import { Navigate, useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { user, dispatch } = useContext(UserAuthContext)
  let navigate = useNavigate();

  const handleLogin = async (evt) => {
    evt.preventDefault()
    let userObj = {
      'username': evt.target.username.value,
      'password': evt.target.password.value
    }
    let user = await login(userObj)
    console.log("RESPONSE: ", user)
    if (user['message'] === 'success') {
      if (user['access']) {
        localStorage.setItem('access_token', user['access'])
      }
      if (user['refresh']) {
        localStorage.setItem('refresh_token', user['refresh'])
      }
      navigate('/today')
    } else {
      dispatch({type: 'GET_USER_FAILURE', user})
    }
  }
  return (
    <div>
      <h1>Login</h1>
      {
        user.user &&
        <Navigate to="/today" replace={true} />
      }
      {
        user.error
        &&
        <p className="help is-danger">{ user.message }</p>
      }
      <form onSubmit={handleLogin}>
        <h3>UserName</h3>
        <input className={`input ${user.error && 'is-danger'}`} name='username' type="text" placeholder="Username" />
        <h3>Password</h3>
        <input className={`input ${user.error && 'is-danger'}`}  name='password' type="password" placeholder="password" />
        <button className="button is-primary" type='submit'>Login</button>
      </form>
      <p>Don't have an account, <Link to='/signup'>Sign Up</Link> here.</p>
    </div>
  );
};

export default Login;
