export const workoutReducer = (state, action) => {
  switch(action.type) {
    case 'GET_EXERCISES_SUCCESS':
      return {
        'exercises': action.workout['exercises'],
        'target': action.workout['workout_target'],
        'rounds': action.workout['rounds'],
        'ab_exercises': action.workout['ab_exercises'],
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
