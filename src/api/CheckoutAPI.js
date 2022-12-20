const development = false
const WORKOUT_URL = development ? 'http://localhost:8000/' : 'https://api.workouttoday.co/'

const stripeCheckout = async (checkoutObj) => {
  console.log(checkoutObj)
  try {
  let response = await fetch(`${WORKOUT_URL}accounts/create-checkout-session/`, {
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': `Token ${checkoutObj.userKey}`
    },
    'body': JSON.stringify(checkoutObj.subscriptionType)
  })
    let data = await response.json()
    return data
  }
  catch(err) {
    console.error(err)
  }
}

const createCustomerPortal = async (userObj) => {
  console.log(userObj)
  try {
  let response = await fetch(`${WORKOUT_URL}accounts/api/v1/create-portal-session/`, {
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    },
    'body': JSON.stringify(userObj)
  })
    let data = await response.json()
    return data
  }
  catch(err) {
    console.error(err)
  }
}


export {
  stripeCheckout,
  createCustomerPortal
}
