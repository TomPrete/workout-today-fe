export const userAuthReducer = (state, action) => {
  switch (action.type) {
    case 'GET_USER_SUCCESS':
      return {
        'user': action.user,
      }
    case 'GET_CURRENT_OR_REFRESH_USER_FAILURE':
      return {
        'user': null,
        'error': false,
        'loading': false,
        'message': action.user.message
      }
    case 'GET_USER_FAILURE':
      console.log("FAILURE: ", action)
      return {
        'user': null,
        'error': true,
        'loading': false,
        'message': action.user.message
      }
    case 'GET_USER_LOADING':
      return {
        'loading': true
      }
    case 'SIGNUP_USER_LOADING':
      return {
        'loading': true
      }
    case 'LOGOUT_USER_SUCCESS':
      return {
        'user': null
      }
    case 'SIGNUP_USER_SUCCESS':
      return {
        'user': null,
        'error': false,
        'loading': false,
        'message': action.user.message,
      }
    case 'SIGNUP_USER_FAILURE':
      return {
        'user': null,
        'error': true,
        'loading': false,
        'message': action.user.message,
      }
    default:
      return state
  }
}
