import React, { useContext, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import MobileHeader from '../mobile-header/MobileHeader';
import { UserAuthContext } from '../../contexts/UserAuthContext';
import { resetPassword } from '../../api/UserAuthAPI';
import './PasswordResetStyles.css';
import BottomNavBar from '../navbar/BottomNavBar';
import Alert from '../alert/Alert';

const PasswordReset = () => {
  // const { user, dispatch } = useContext(UserAuthContext);
  const [message, setMessage] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const infoObj = {
      email: evt.target.username.value
    }
    setIsLoading(true)
    let response = await resetPassword(infoObj)
    if (response.error) {
      setError(true)
      setMessage(response.message)
    } else {
      setError(false)
      setMessage(response.message)
      evt.target.username.value = '';
    }
    setIsLoading(false)
  }

  const removeErrors = () => {
    if (error) {
      setError(false)
    }
  }

  return (
    <div>
      <MobileHeader title='Forgot Password' />
      <div className='reset-password-container'>
        {
          error
          &&
          <Alert type='error' message={message} />
        }
        {
          !error
          &&
          message
          &&
          <Alert type='success' message={message} />
        }
        <div>
          <div>Forgot Password?</div>
          <div>No worries, we'll email you reset instructions.</div>
        </div>
        <form onSubmit={handleSubmit} className="mx-4">
          <div className="field">
            <label className="label">Email</label>
            <p className="control has-icons-left has-icons-right">
              <input className='input' name="username" type="email" placeholder="Enter your email" required onChange={removeErrors} />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <button className={`button is-success is-fullwidth ${isLoading ? 'is-loading' : ''}`} type='submit'>
                Reset Password
              </button>
            </p>
          </div>
        </form>
      </div>
      <div>
        <Link to='/login'>Login</Link>
      </div>
    </div>
  );
};

export default PasswordReset;
