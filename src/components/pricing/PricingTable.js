import React, { useContext } from 'react';
import { UserAuthContext } from '../../contexts/UserAuthContext';
import { createCustomerPortal } from '../../api/CheckoutAPI';


const PricingTable = () => {
  const { user } = useContext(UserAuthContext)

  const handleCreateBillingSession = async () => {
    let response = await createCustomerPortal(user)
    console.log(response)
  }

  console.log("User: ", user)
  if (user.user) {
    return (
      <div>
        <stripe-pricing-table
          pricing-table-id="prctbl_1M6jIJCxk3VOyNJU9MvLgoUm"
          publishable-key="pk_test_51LTVzmCxk3VOyNJU9sL4qhXFp3Lt0r8UuqkVidXWrNzsMbMf32kpVQEHtkCU0aMzsCYOubVBq36aruZUBMXLm5an00WUPaQd4a"
          customer-email={user.user.email}
          >
        </stripe-pricing-table>

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
      </div>
    );
  }
};

export default PricingTable;
