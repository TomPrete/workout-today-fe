import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate, Link, useSearchParams } from "react-router-dom";

import { login } from '../../api/UserAuthAPI';
import { UserAuthContext } from '../../contexts/UserAuthContext';


import NavLogo from '../../assets/workout_today_logo.png'

import jwt_decode from "jwt-decode";
import Alert from '../alert/Alert';

const Login = () => {
  const { user, dispatch } = useContext(UserAuthContext);
  const [ successMessage, setSuccessMessage ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(false)
  let navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get('success')) {
      setSuccessMessage("You've successfully subscribed to Workout Today!")
    }
  }, [])

  const handleLogin = async (evt) => {
    evt.preventDefault()
    let userObj = {
      'username': evt.target.username.value.toLowerCase(),
      'password': evt.target.password.value
    }
    setIsLoading(true)
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
        dispatch({ type: 'GET_USER_SUCCESS', user })
      }
      if (response['refresh']) {
        localStorage.setItem('refresh_token', response['refresh'])
      }
      navigate('/today')
    } else {
      let user = response
      dispatch({ type: 'GET_USER_FAILURE', user })
    }
  }

  return (
    <div>
      {
        successMessage
        &&
        <Alert message={successMessage} type='success' />
      }
      <div className="box mx-4 my-6">
        <img src={NavLogo} />
        <h1 className="title">Login</h1>
        {
          user.user &&
          <Navigate to="/today" replace={true} />
        }
        {
          user.error
          &&
          <p className="help is-danger">{user.message}</p>
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
            <Link to='/account/reset-password'>Forgot your password?</Link>
          </div>
          <button className={`button is-primary ${isLoading ? 'is-loading' : ''}`} type='submit'>Login</button>
        </form>
        <p>Don't have an account, <Link to='/signup'>Sign Up</Link> here.</p>
      </div>
    </div>
  );
};

export default Login;
