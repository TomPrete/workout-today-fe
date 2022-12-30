import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { checkResetPasswordAbility, resetPasswordConfirm } from '../../api/UserAuthAPI';
import MobileHeader from '../mobile-header/MobileHeader';
import Alert from '../alert/Alert';
import './PasswordResetStyles.css';
import Loading from '../loading/Loading';

const PasswordResetSuccess = () => {
  const { uuid } = useParams();
  const [message, setMessage] = useState(undefined);
  const [ success, setSuccess ] = useState(false);
  const [error, setError] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkResetPassword = async () => {
      let payload = {
        uuid: uuid
      }
      setLoading(true)
      let response = await checkResetPasswordAbility(payload)
      if (response.error) {
        setError(true)
        setIsExpired(true)
        setMessage(response.message)
      }
      setLoading(false)
    }
    checkResetPassword()
  }, [])

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    let payload = {
      uuid: uuid,
      password: evt.target.password.value,
      passwordTwo: evt.target.passwordTwo.value,
    }
    if (evt.target.password.value !== evt.target.passwordTwo.value) {
      setError(true)
      setMessage("Your password and confirmation password do not match.")
      return
    }
    setLoading(true)
    let response = await resetPasswordConfirm(payload)
    if (response.error) {
      setError(true)
    } else {
      setSuccess(true)
    }
    setMessage(response.message)
    setLoading(false)
  }

  const removeErrors = () => {
    if (error) {
      setError(false)
    }
  }

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    )
  }

  return (
    <div>
    <MobileHeader title='Reset Password' />
      <div className='reset-password-container'>
        {
          error
          &&
          <Alert type='error' message={message} />
        }
        {
          isExpired
          &&
          <div>
            Click the link to request a new reset password Link. <Link to='/account/reset-password'>Reset Password</Link>
          </div>
        }
        {
          success
          &&
          <div>
            <Alert type='success' message={message} />
            <div>
              Go Login to page <Link to='/login'>Login</Link>
            </div>

          </div>
        }
        {
          !isExpired
          &&
          !success
          &&
          <div>
          <div>
            <div>Create a new password</div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">New Password</label>
              <p className="control has-icons-left">
                <input className={`input ${error && 'is-danger'}`} name='password' type="password" placeholder="Password" onChange={removeErrors} required />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
              <p className="help">8 characters minimum</p>
            </div>
            <div className="field">
              <label className="label">New Password confirmation</label>
              <p className="control has-icons-left">
                <input className={`input ${error && 'is-danger'}`} name='passwordTwo' type="password" placeholder="Password (again)" onChange={removeErrors} required />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <button className={`button is-success is-fullwidth ${loading ? 'is-loading' : ''}`} type='submit'>
                  Create New Password
                </button>
              </p>
            </div>
          </form>
          </div>
        }
      </div>
    </div>
  );
};

export default PasswordResetSuccess;
