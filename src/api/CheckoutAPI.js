const development = false
const WORKOUT_URL = development ? 'http://localhost:8000/' : 'https://workout-today-backend.herokuapp.com/'

const stripeCheckout = async (checkoutObj) => {
  console.log(checkoutObj)
  try {
  let response = await fetch(`${WORKOUT_URL}accounts/create-checkout-session/`, {
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json'
    },
    'body': JSON.stringify(checkoutObj)
  })
    let data = await response.json()
    return data
  }
  catch(err) {
    console.error(err)
  }
}


export {
  stripeCheckout
}
