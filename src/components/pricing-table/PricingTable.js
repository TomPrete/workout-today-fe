import React, { useState, useContext } from 'react';
import './PricingTableStyles.css';
import WTInitials from '../../assets/workout_initials.png'
import Button from '../button/Button';
import CheckMark from '../../assets/circle-check-regular.svg';
import { stripeCheckout } from '../../api/CheckoutAPI';

const PricingTable = (props) => {
  const [isMonthly, setIsMonthly] = useState(true)

  const toggleSubscriptionDuration = (duration) => {
    if (isMonthly !== duration) {
      setIsMonthly(duration)
    }
  }

  const submitSubscription = async (subscriptionType) => {
    console.log("ISE MONTHLY :", subscriptionType)
    const checkoutObj = {
        subscriptionType: subscriptionType ? 'monthly' : 'yearly',
        userKey: localStorage.getItem('access_token'),
        isToken: true
      }
      let checkoutResponse = await stripeCheckout(checkoutObj)
      window.location.href = checkoutResponse.stripe_url
    }

  return (
    <div >
      <div className='subscription-tab-container'>
        <div className='subscription-tab-toggle'>
          <div
            className={`subscription-tab-duration ${isMonthly ? 'active-toggle' : ''}`}
            onClick={() => toggleSubscriptionDuration(true)}
            >
          Monthly
          </div>
          <div className={`subscription-tab-duration ${!isMonthly ? 'active-toggle' : ''}`} onClick={() => toggleSubscriptionDuration(false)}>Yearly</div>
        </div>
      </div>
      <div className="card m-2 pricing-table-container">
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              {
                !isMonthly
                &&
                <span className="tag is-success">Best Deal</span>
              }
              <p className="title is-4">Workout Today</p>
              <p className="subtitle is-6">Workout Today and get the most of every workout.</p>
            </div>
            <div className="media-right">
              <figure className="image is-96x96">
                <img src={WTInitials} alt="workout-today-initials-logo" />
              </figure>
            </div>
          </div>
          <div >
            <div className='subscription-amount-container'>
              <span className='subscription-amount'>${isMonthly ? '2' : '19'}</span>
              <div className='subscription-amount-duration'>
                <div>
                  per
                  <br />
                  {isMonthly ? 'month' : 'year'}
                </div>
              </div>
            </div>
            <div className='subscribe-button-container'>
              <Button
                className='subscribe-button is-fullwidth'
                title='Subscribe'
                onClick={() => submitSubscription(isMonthly)}
              />
            </div>
            <div className='feature-list-container'>
              This includes:
            </div>
              <ul className='feature-list'>
                <li className='list-item'>
                  <img src={CheckMark} alt="workout-today-initials-logo" className='feature-checkmark-icon'/>
                  All free features including...
                </li>
                <li className='list-item'>
                  <img src={CheckMark} alt="workout-today-initials-logo" className='feature-checkmark-icon'/>
                  Access to all past Daily Workouts
                </li>
                <li className='list-item'>
                  <img src={CheckMark} alt="workout-today-initials-logo" className='feature-checkmark-icon'/>
                  Access to all past Ab Workouts
                </li>
                <li className='list-item'>
                  <img src={CheckMark} alt="workout-today-initials-logo" className='feature-checkmark-icon'/>
                  Record exercise repetitions and weights used
                </li>
                <li className='list-item'>
                  <img src={CheckMark} alt="workout-today-initials-logo" className='feature-checkmark-icon'/>
                  Bookmark your favorite workouts
                </li>
                <li className='list-item'>
                  <img src={CheckMark} alt="workout-today-initials-logo" className='feature-checkmark-icon'/>
                  <span>
                    Workouts consist of Chest, Shoulders, Triceps, Biceps, Back, Legs, Core, and Cardio workouts
                  </span>
                </li>
              </ul>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingTable;
