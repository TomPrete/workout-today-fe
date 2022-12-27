import React, { useContext } from 'react';
import { signUp } from '../../api/UserAuthAPI';
import { stripeCheckout } from '../../api/CheckoutAPI';
import { UserAuthContext } from '../../contexts/UserAuthContext';
import { Link, useNavigate, useSearchParams, Navigate } from "react-router-dom";
import NavLogo from '../../assets/workout_today_logo.png';
import './registration.css';

const SignUp = () => {
  const { user, dispatch } = useContext(UserAuthContext)
  let [searchParams, setSearchParams] = useSearchParams();

  let navigate = useNavigate();

  const handleSignup = async (evt) => {
    evt.preventDefault()
    let userObj = {
      'email': evt.target.email.value,
      'username': evt.target.email.value,
      'password1': evt.target.password.value,
      'password2': evt.target.passwordTwo.value
    }
    dispatch({ type: 'SIGNUP_USER_LOADING' })
    let user = await signUp(userObj)
    console.log("USER: ", user)
    if (user['error']) {
      dispatch({ type: 'SIGNUP_USER_FAILURE', user })
    } else {
      dispatch({ type: 'SIGNUP_USER_SUCCESS', user })
      console.log("USER: ", user)
      if (routeToPurchase()) {
        let checkoutObj = {
          subscriptionType: routeToPurchase(),
          userKey: user.key
        }
        let checkoutResponse = await stripeCheckout(checkoutObj)
        window.location.href = checkoutResponse.stripe_url
      } else {
        navigate('/login')
      }
    }
  }

  const routeToPurchase = () => {
    let params = searchParams.get('subscription')
    if (params) {
      return params
    }
    return false
  }
  console.log(searchParams.get('subscription'))
  return (
    <div className="box m-6">
      <img src={NavLogo} />
      <h1 className="title">Sign Up</h1>
      {
        user.user &&
        <Navigate to="/today" replace={true} />
      }
      {
        user.error
        &&
        <p className="help is-danger">{user.message}</p>
      }
      <form onSubmit={handleSignup}>
        <div className="field">
          <label className="label">Email</label>
          <p className="control has-icons-left has-icons-right">
            <input className={`input ${user.error && 'is-danger'}`} name="email" type="email" placeholder="Email" />
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
          <p className="help">8 characters minimum</p>
        </div>
        <div className="field">
          <label className="label">Password confirmation</label>
          <p className="control has-icons-left">
            <input className={`input ${user.error && 'is-danger'}`} name='passwordTwo' type="password" placeholder="Password (again)" />
            <span className="icon is-small is-left">
              <i className="fas fa-lock"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control">
            <button className="button is-success" type='submit'>
              Sign Up
            </button>
          </p>
        </div>
      </form>
      <p>Already have an account, <Link to='/login'>Login</Link> here.</p>
    </div>
  );
};

export default SignUp;
