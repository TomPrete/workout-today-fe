export const userAuthReducer = (state, action) => {
  switch(action.type) {
    case 'GET_USER_SUCCESS':
      return {
        'user': action.user,
      }
    case 'GET_CURRENT_OR_REFRESH_USER_FAILURE':
      return {
        'user': null,
        'error': false,
        'loading': false,
        'errorMessage': action.user.message
      }
    case 'GET_USER_FAILURE':
      console.log("FAILURE: ", action)
      return {
        'user': null,
        'error': true,
        'loading': false,
        'errorMessage': action.user.message
      }
    case 'GET_USER_LOADING':
      return {
        'user_loading': true
      }
    case 'LOGOUT_USER_SUCCESS':
      return {
        'user': null
      }
    default:
      return state
  }
}
