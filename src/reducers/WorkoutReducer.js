export const workoutReducer = (state, action) => {
  switch(action.type) {
    case 'GET_EXERCISES':
      return action.workout['exercises']
    default:
      return state
  }
}
