import React, { useContext } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { UserAuthContext } from '../../contexts/UserAuthContext';
import BottomNavBar from '../navbar/BottomNavBar';
import { logoutUser } from '../../api/UserAuthAPI';
import { createCustomerPortal } from '../../api/CheckoutAPI';
const development = false

const backendUrl = development ? 'http://localhost:8000/' : 'https://api.workouttoday.co/'

const AccountHome = () => {
  const { user } = useContext(UserAuthContext)
  let navigate = useNavigate();

  const handleLogout = async () => {
    let response = await logoutUser()
    if (response.message === 'success') {
      navigate('/login')
    } else {
      navigate('/today')
    }
  }

  const handleBillingInfo = async () => {
    let userObj = {
      'email': user.user.email
    }
    let response = await createCustomerPortal(userObj)
    console.log("RESP: ", response)
  }

  if (user.user) {
    return (
      <div>
      <div>Account Home</div>
      <div>Hi { user.user.username }!</div>
      {
        !user.user.is_premium
        &&
        <div className="card-container m-5">
            <div onClick={() => navigate('/pricing')} className="card">
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-4">Upgrade Your Account</p>
                    <p className="subtitle is-6">test</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
      }
      {
        user.user.is_premium
        &&
        <div>
        <div>
          Manage Subscription
        </div>
        <button id="checkout-and-portal-button" onClick={handleBillingInfo}>
          Manage your billing information
        </button>
        </div>
      }
      <button onClick={handleLogout}>Log Out</button>
      {/*<BottomNavBar />*/}
      </div>
    );
  }
};

export default AccountHome;
