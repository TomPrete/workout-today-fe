import React from 'react';
import { signUp } from '../../api/UserAuthAPI';

const SignUp = () => {

  const handleSignup = async (evt) => {
    evt.preventDefault()
    let userObj = {
      'email': evt.target.email.value,
      'username': evt.target.email.value,
      'password1': evt.target.password.value,
      'password2': evt.target.passwordTwo.value
    }
    let response = await signUp(userObj)
    console.log('response: ', response)

  }
  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <h3>Email</h3>
        <input className="input input" name='email' type="email" placeholder="Email" />
        <h3>Password</h3>
        <input className="input input" name='password' type="password" placeholder="password" />
        <h3>Password confirmation</h3>
        <input className="input input" name='passwordTwo' type="password" placeholder="password (again)" />
        <button className="button is-primary" type='submit'>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
