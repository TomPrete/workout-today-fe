import React, { useContext, useReducer, useEffect } from 'react';
import { userAuthReducer } from '../../reducers/UserAuthReducer';
import { Navigate, useNavigate, Link } from "react-router-dom";
import { UserAuthContext } from '../../contexts/UserAuthContext';
import BottomNavBar from '../navbar/BottomNavBar';
import MobileHeader from '../mobile-header/MobileHeader';
import Loading from '../loading/Loading';
import { logoutUser } from '../../api/UserAuthAPI';
import { createCustomerPortal } from '../../api/CheckoutAPI';
import UserAvatarWhite from '../../assets/user-white.svg';
import './AccountHome.css';
import Button from '../button/Button';
import NavBar from '../navbar/NavBar';

const development = false

const backendUrl = development ? 'http://localhost:8000/' : 'https://api.workouttoday.co/'

const AccountHome = () => {
  const { user } = useContext(UserAuthContext)
  const [userState, dispatch] = useReducer(userAuthReducer)
  let navigate = useNavigate();

  const handleLogout = async () => {
    let response = await logoutUser()
    dispatch({type: 'LOGOUT_USER_SUCCESS'})
    if (response['message'] == 'success') {
      window.location.href = '/login'
    } else {
      window.location.href = '/today'
    }
  }

  const handleBillingInfo = async () => {
    let userObj = {
      'email': user.user.email
    }
    let portalResponse = await createCustomerPortal(userObj)
    if (portalResponse.stripe_url) {
      window.location.href = portalResponse.stripe_url
    }
  }

  if (user.loading) {
    return (
      <Loading />
    )
  }

  if (user.user) {
    return (
      <div>
        <NavBar />
        <MobileHeader title="Account" />
        <div className='account-container'>
          <img src={UserAvatarWhite} alt='user-avatar' className='user-avatar-icon' />
        </div>
        {
          !user.user.is_premium
          &&
          <div className="card-container m-5">
              <div onClick={() => navigate('/pricing')} className="card upgrade-card">
                <div className="card-content">
                  <div className="media">
                    <div className="media-content">
                      <p className="title is-4">Go Premium</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        }
        <table className="table is-striped is-hoverable is-fullwidth">
          <tbody>
            <tr>
              <th>Username</th>
              <td>{ user.user.username }</td>
            </tr>
            <tr>
              <th>Subscription</th>
              <td>
                <span className={`tag ${ user.user.is_premium ? 'is-success' : 'is-light' } is-medium`}>
                { user.user.is_premium ? 'Premium' : 'Free' }
              </span>
              </td>
            </tr>
            <tr>
              <th>Password</th>
              <td><Link to='/account/update-password'>Update Password</Link></td>
            </tr>
          </tbody>
        </table>
        {
          user.user.is_premium
          &&
          <Button
            className="checkout-and-portal is-rounded"
            onClick={handleBillingInfo}
            title="Manage your subscription information"
            />
        }
        <Button
          className="is-danger is-outlined mx-5 my-2 is-rounded"
          onClick={handleLogout}
          title="Log out"
          />
        <div >If you have any questions please contact me at <a href="mailto:tom@workouttoday.co">tom@workouttoday.co</a>.</div>
        {
          user.user
          &&
          <BottomNavBar />
        }
      </div>
    );
  }

};

export default AccountHome;
