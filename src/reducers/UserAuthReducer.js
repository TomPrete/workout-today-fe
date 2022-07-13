export const userAuthReducer = (state, action) => {
  switch(action.type) {
    case 'GET_USER_SUCCESS':
      return {
        'user': action.user,
      }
    case 'GET_USER_FAILURE':
      console.log("FAILURE", action.user)
      return {
        'user': {},
        'error': true,
        'loading': false,
        'errorMessage': action.user
      }
    case 'GET_USER_LOADING':
      return {
        'user_loading': true
      }
    default:
      return state
  }
}
