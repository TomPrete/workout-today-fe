import React, { useContext } from 'react';
import { UserAuthContext } from '../../contexts/UserAuthContext';
import { createCustomerPortal } from '../../api/CheckoutAPI';
import BottomNavBar from '../navbar/BottomNavBar';
import MobileHeader from '../mobile-header/MobileHeader';
import './PricingPageStyles.css';
import NavBar from '../navbar/NavBar';
import PricingTable from '../pricing-table/PricingTable';

const PricingPage = () => {
  const { user } = useContext(UserAuthContext)

  const handleCreateBillingSession = async () => {
    let response = await createCustomerPortal(user)
    console.log(response)
  }

  console.log("User: ", user)
  if (user.user) {
    return (
      <div>
        <MobileHeader title='Pricing' />
        <div className='stripe-pricing-table'>
          <PricingTable />
        </div>

        {
          user.user.is_premium
          &&
          <div>
            <h2>Manage Billing</h2>
            <form onSubmit={handleCreateBillingSession} >
              <button type='submit'>Manage Billing</button>
            </form>
          </div>
        }
        <BottomNavBar />
      </div>
    );
  }
};

export default PricingPage;
