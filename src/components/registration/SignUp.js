import React, { useContext } from 'react';
import { signUp } from '../../api/UserAuthAPI';
import { UserAuthContext } from '../../contexts/UserAuthContext';
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const { user, dispatch } = useContext(UserAuthContext)
  let navigate = useNavigate();

  const handleSignup = async (evt) => {
    evt.preventDefault()
    let userObj = {
      'email': evt.target.email.value,
      'username': evt.target.email.value,
      'password1': evt.target.password.value,
      'password2': evt.target.passwordTwo.value
    }
    dispatch({type: 'SIGNUP_USER_LOADING'})
    let user = await signUp(userObj)
    if (user['error']) {
      dispatch({type: 'SIGNUP_USER_FAILURE', user})
    } else {
      dispatch({type: 'SIGNUP_USER_SUCCESS', user})
      navigate('/login')
    }
  }

  return (
    <div>
      <h1>Sign Up</h1>
      {
        user.error
        &&
        <p className="help is-danger">{ user.message }</p>
      }
      <form onSubmit={handleSignup}>
        <h3>Email</h3>
        <input className={`input ${user.error && 'is-danger'}`} name='email' type="email" placeholder="Email" />
        <h3>Password</h3>
        <input className={`input ${user.error && 'is-danger'}`} name='password' type="password" placeholder="password" />
        <h3>Password confirmation</h3>
        <input className={`input ${user.error && 'is-danger'}`} name='passwordTwo' type="password" placeholder="password (again)" />
        <button className="button is-primary" type='submit'>Sign Up</button>
      </form>
      <p>Already have an account, <Link to='/login'>Login</Link> here.</p>
    </div>
  );
};

export default SignUp;
