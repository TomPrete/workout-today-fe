const development = false
const LOGIN_URL = development ? "http://localhost:8000/accounts/v1/token/" : "https://api.workouttoday.co/accounts/v1/token/"

const SINGUP_URL = development ? 'http://localhost:8000/api/v1/accounts/register/' : 'https://api.workouttoday.co/api/v1/accounts/register/'

const CURRENT_USER_URL = development ? 'http://127.0.0.1:8000/accounts/v1/current_user/' : 'https://api.workouttoday.co/accounts/v1/current_user/'

const signUp = async (userObj) => {
  try {
    let response = await fetch(SINGUP_URL, {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify(userObj)
    })
    let data = await response.json()
    if (data['non_field_errors']) {
      return {
        'message': data['non_field_errors'][0],
        'error': true
      }
    }
    if (data['email'] || data['username']) {
      return {
        'message': 'A user with that username/email already exists.',
        'error': true
      }
    } else {
      data['message'] = 'success'
      return data
    }
  }
  catch(err) {
    console.error(err)
  }
}

const login = async (userObj) => {
  try {
    let response = await fetch(LOGIN_URL, {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify(userObj)
    })
    let data = await response.json()

    if (data['detail']) {
      return {
        'message': 'Username or password is incorrect.'
      }
    }
    else {
      data['message'] = 'success'
      return data
    }
  }
  catch(err) {
    console.error(err)
  }
}

const getCurrentUser = async (token) => {
  try {
    let response = await fetch(CURRENT_USER_URL, {
      'method': 'GET',
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    let data = await response.json()
    if (data['code'] === 'token_not_valid') {
      return {
        'message': 'token not valid',
        'status': 200
      }
    }
    return data
  }
  catch(err) {
    console.error(err)
  }
}

const getCurrentUserRefreshToken = async (refreshToken) => {
  try {
    let response = await fetch(`${LOGIN_URL}refresh/`, {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json',
      },
      'body': JSON.stringify(refreshToken)
    })
    let data = await response.json()
    if (data['code'] === 'token_not_valid') {
      return {
        'message': 'token not valid',
        'status': 200
      }
    }
    return data
  }
  catch(err) {
    console.error(err)
  }
}

const logoutUser = () => {
  try {
    localStorage.setItem('access_token', 'null')
    localStorage.setItem('refresh_token', 'null')
    return {
      'message': 'Logged out success',
      'status': 200
    }
  }
  catch(err) {
    console.error(err)
  }
}

export {
  signUp,
  login,
  logoutUser,
  getCurrentUser,
  getCurrentUserRefreshToken
}
