import React, { useContext } from 'react';
import { login } from '../../api/UserAuthAPI';
import { UserAuthContext } from '../../contexts/UserAuthContext';
import { Navigate, useNavigate, Link } from "react-router-dom";
import NavLogo from '../../assets/workout_today_logo.png'
import jwt_decode from "jwt-decode";

const Login = () => {
  const { user, dispatch } = useContext(UserAuthContext)
  let navigate = useNavigate();

  const handleLogin = async (evt) => {
    evt.preventDefault()
    let userObj = {
      'username': evt.target.username.value,
      'password': evt.target.password.value
    }
    let response = await login(userObj)
    if (response['message'] === 'success') {
      if (response['access']) {
        localStorage.setItem('access_token', response['access'])
        let decoded = jwt_decode(response['access'])
        let user = {
          email: decoded['email'],
          username: decoded['username'],
          is_premium: decoded['is_premium'],
          id: decoded['id']
        }
        dispatch({type: 'GET_USER_SUCCESS', user})
      }
      if (response['refresh']) {
        localStorage.setItem('refresh_token', response['refresh'])
      }
      navigate('/today')
    } else {
      dispatch({type: 'GET_USER_FAILURE', user})
    }
  }
  return (
    <div className="box m-6">
      <img src={NavLogo} />
      <h1 className="title">Login</h1>
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
        <div className="field">
          <label className="label">Email</label>
          <p className="control has-icons-left has-icons-right">
            <input className={`input ${user.error && 'is-danger'}`} name="username" type="email" placeholder="Username" />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <p className="control has-icons-left">
            <input className={`input ${user.error && 'is-danger'}`} name='password' type="password" placeholder="Password" />
            <span className="icon is-small is-left">
              <i className="fas fa-lock"></i>
            </span>
          </p>
        </div>
        <button className="button is-primary" type='submit'>Login</button>
      </form>
      <p>Don't have an account, <Link to='/signup'>Sign Up</Link> here.</p>
    </div>
  );
};

export default Login;
