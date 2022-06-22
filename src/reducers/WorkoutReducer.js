export const workoutReducer = (state, action) => {
  switch(action.type) {
    case 'GET_EXERCISES_SUCCESS':
      return {
        'exercises': action.workout['exercises'],
        'error': false,
      }
    case 'GET_EXERCISES_FAILURE':
      return {
        'exercises': [],
        'error': true,
      }
    default:
      return state
  }
}
