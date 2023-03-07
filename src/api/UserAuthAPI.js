const development = true
const LOGIN_URL = development ? "http://localhost:8000/accounts/v1/token/" : "https://api.workouttoday.co/accounts/v1/token/"

const SINGUP_URL = development ? 'http://localhost:8000/api/v1/accounts/register/' : 'https://api.workouttoday.co/api/v1/accounts/register/'

const CURRENT_USER_URL = development ? 'http://127.0.0.1:8000/accounts/v1/current_user/' : 'https://api.workouttoday.co/accounts/v1/current_user/'

const LOGOUT_URL = development ? 'http://localhost:8000/api/v1/accounts/logout/' : 'https://api.workouttoday.co/api/v1/accounts/logout/'

// const RESET_PASSWORD = development ? 'http://localhost:8000/api/v1/accounts/password/reset/' : 'https://api.workouttoday.co/api/v1/accounts/password/reset/'

const CHANGE_PASSWORD = development ? 'http://localhost:8000/accounts/v1/change-password/' : 'https://api.workouttoday.co/accounts/v1/change-password/'

const RESET_PASSWORD = development ? 'http://localhost:8000/accounts/v1/reset-password/' : 'https://api.workouttoday.co/accounts/v1/reset-password/'

const RESET_PASSWORD_CONFIRM = development ? 'http://localhost:8000/accounts/v1/reset-password/' : 'https://api.workouttoday.co/accounts/v1/reset-password/'

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
    } else if (data['email'] || data['username']) {
      return {
        'message': 'A user with that username/email already exists.',
        'error': true
      }
    } else if (data['password1']) {
      return {
        'message': "Password must contain letters (not be entirely numeric) and be at least 8 character long.",
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
        'message': 'Username or password is incorrect. Try again.'
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
    if (data['code'] === 'token_not_valid' || data['code'] === 'user_not_found' ) {
      return {
        'message': data.detail,
        'code': data.code,
        'status': 404
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
    if (data['code'] === 'token_not_valid' || data['code'] === 'user_not_found' ) {
      return {
        'message': data.detail,
        'code': data.code,
        'status': 404
      }
    }
    return data
  }
  catch(err) {
    console.error(err)
  }
}

const logoutUser = async () => {
  try {
    let response = await fetch(LOGOUT_URL, {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json',
      }
    })
    let data = await response.json()
    return {
      'message': 'success',
      'status': 200
    }
  }
  catch(err) {
    console.error(err)
  }
}

const updatePassword = async (payloadObj) => {
  try {
    let response = await fetch(CHANGE_PASSWORD, {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      },
      'body': JSON.stringify(payloadObj)
    })
    let data = await response.json()
    if (data.status === 500) {
      return {
        'message': "Password must contain letters, be at least 8 characters long, and must not be similar to username.",
        'error': true
      }
    }
    else if (data.status === 400) {
      return {
        'message': data.message,
        'error': true
      }
    } else {
      return data
    }
  }
  catch(err) {
    console.error(err)
  }
}

const checkResetPasswordAbility = async (payload = null) => {
  try {
    let response = await fetch(`${RESET_PASSWORD_CONFIRM}${payload['uuid']}/`, {
      'method': 'GET',
      'headers': {
        'Content-Type': 'application/json'
      }
    })
    let data = await response.json()
    if (data.message === 'expired') {
      return {
        'message': "Password reset link is expired",
        'error': true
      }
    } else {
      return {
        'message': data.message,
      }
    }
  }
  catch(err) {
    console.error(err)
  }
}

const resetPasswordConfirm = async (payload = null) => {
  try {
    let response = await fetch(`${RESET_PASSWORD_CONFIRM}${payload['uuid']}/`, {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify({password: payload.password, passwordTwo: payload.passwordTwo})
    })
    let data = await response.json()
    if (data.status === 500) {
      return {
        'message': "Password must contain letters (not be entirely numeric) and be at least 8 character long.",
        'error': true
      }
    } else
    if (data.status === 400) {
      return {
        'message': "There was an issue updating your password.",
        'error': true
      }
    } else {
      return {
        'message': data.message,
      }
    }
  }
  catch(err) {
    console.error(err)
  }
}

const resetPassword = async (payloadObj) => {
  try {
    let response = await fetch(RESET_PASSWORD, {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify(payloadObj)
    })
    let data = await response.json()
    if (data.status === 404) {
      return {
        'message': "An account associated with that email does not exist.",
        'error': true
      }
    } else if (data.status === 400) {
      return {
        'message': data.message,
        'error': true
      }
    } else {
      return {
        'message': 'Please check your email for reset instructions.'
      }
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
  getCurrentUserRefreshToken,
  updatePassword,
  resetPassword,
  checkResetPasswordAbility,
  resetPasswordConfirm
}
