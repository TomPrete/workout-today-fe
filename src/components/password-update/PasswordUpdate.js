import React, { useContext, useState }  from 'react';
import { useNavigate } from "react-router-dom";
import MobileHeader from '../mobile-header/MobileHeader';
import { UserAuthContext } from '../../contexts/UserAuthContext';
import { updatePassword } from '../../api/UserAuthAPI';
import './PasswordUpdateStyles.css';
import BottomNavBar from '../navbar/BottomNavBar';
import Alert from '../alert/Alert';

const PasswordUpdate = () => {
  const { user, dispatch } = useContext(UserAuthContext);
  const [ error, setError ] = useState(false);
  const [ success, setSuccess ] = useState(false);
  const [ message, setMessage ] = useState(undefined);
  const [ loading, setLoading ] = useState(false);
  let navigate = useNavigate();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (evt.target.password.value !== evt.target.passwordTwo.value) {
      setError(true)
      return setMessage('New Password and New Password confirmation must match')
    }
    setLoading(true)
    const infoObj = {
      currentPassword: evt.target.currentPassword.value,
      password: evt.target.password.value,
      passwordTwo: evt.target.passwordTwo.value
    }
    let response = await updatePassword(infoObj)
    if (response.error) {
      setError(true)
      setMessage(response.message)
      setLoading(false)
    } else {
      setError(false)
      setMessage(response.message);
      setSuccess(true)
      evt.target.currentPassword.value = '';
      evt.target.password.value = '';
      evt.target.passwordTwo.value = '';
      setTimeout(() => {
        navigate('/account')
      }, 2000)
    }
  }

  return (
    <div>
      <MobileHeader title='Update Password' />
      <div className='update-password-container'>
        {
          error
          &&
          <Alert type='error' message={message} />
        }
        {
          success
          &&
          <Alert type='success' message={message} />
        }
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Current Password</label>
            <p className="control has-icons-left has-icons-right">
              <input className={`input ${user.error && 'is-danger'}`} name="currentPassword" type="password" placeholder="Current Password" required />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <label className="label">New Password</label>
            <p className="control has-icons-left">
              <input className={`input ${user.error && 'is-danger'}`} name='password' type="password" placeholder="Password" required />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </p>
            <p className="help">8 characters minimum</p>
          </div>
          <div className="field">
            <label className="label">New Password confirmation</label>
            <p className="control has-icons-left">
              <input className={`input ${user.error && 'is-danger'}`} name='passwordTwo' type="password" placeholder="Password (again)" required />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <button className={`button is-success is-fullwidth ${loading ? 'is-loading' : ''}`} type='submit'>
                Update Password
              </button>
            </p>
          </div>
        </form>
      </div>
      <BottomNavBar />
    </div>
  );
};

export default PasswordUpdate;
