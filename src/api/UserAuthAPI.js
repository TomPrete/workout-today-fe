const development = true
// const URL = development ? "http://localhost:8000/api/v1/accounts/register/" : "https://workout-today-backend.herokuapp.com/api/v1/accounts/register/"
const URL = development ? "http://localhost:8000/accounts/v1/token/" : "https://workout-today-backend.herokuapp.com/api/v1/accounts/register/"

const signUpURL = 'http://localhost:8000/api/v1/accounts/register/'

const signUp = async (userObj) => {
  console.log(userObj)
  try {
    let response = await fetch(signUpURL, {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json'
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

const login = async (userObj) => {
  console.log(userObj)
  try {
    let response = await fetch('http://localhost:8000/accounts/v1/token/', {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json'
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

const getCurrentUser = async (token) => {
  try {
    let response = await fetch('http://127.0.0.1:8000/accounts/v1/current_user/', {
      'method': 'GET',
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    let data = await response.json()
    return data
  }
  catch(err) {
    console.error(err)
  }
}

const getCurrentUserRefreshToken = async (refreshToken) => {
  try {
    let response = await fetch('http://127.0.0.1:8000/accounts/v1/token/refresh/', {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json',
      },
      'body': JSON.stringify(refreshToken)
    })
    let data = await response.json()
    return data
  }
  catch(err) {
    console.error(err)
  }
}

export {
  signUp,
  login,
  getCurrentUser,
  getCurrentUserRefreshToken
}
