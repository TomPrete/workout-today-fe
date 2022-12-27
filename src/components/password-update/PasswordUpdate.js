import React, { useContext }  from 'react';
import MobileHeader from '../mobile-header/MobileHeader';
import { UserAuthContext } from '../../contexts/UserAuthContext';
import './PasswordUpdateStyles.css';
import BottomNavBar from '../navbar/BottomNavBar';

const PasswordUpdate = () => {
  const { user, dispatch } = useContext(UserAuthContext)

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(evt)
  }

  return (
    <div>
      <MobileHeader title='Update Password' />
      <div className='update-password-container'>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Current Password</label>
            <p className="control has-icons-left has-icons-right">
              <input className={`input ${user.error && 'is-danger'}`} name="currentPassword" type="password" placeholder="Current Password" />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <label className="label">New Password</label>
            <p className="control has-icons-left">
              <input className={`input ${user.error && 'is-danger'}`} name='password' type="password" placeholder="Password" />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </p>
            <p className="help">8 characters minimum</p>
          </div>
          <div className="field">
            <label className="label">New Password confirmation</label>
            <p className="control has-icons-left">
              <input className={`input ${user.error && 'is-danger'}`} name='passwordTwo' type="password" placeholder="Password (again)" />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <button className="button is-success is-fullwidth" type='submit'>
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
