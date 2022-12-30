export const workoutReducer = (state, action) => {
  // console.log("ACTION: ", action)
  switch(action.type) {
    case 'GET_EXERCISES_SUCCESS':
      return {
        ...state,
        'exercises': action.workout['exercises'],
        'target': action.workout['workout_target'],
        'rounds': action.workout['rounds'],
        'workoutId': action.workout['workout_id'],
        'ab_exercises': action.workout['ab_exercises'],
        'error': false,
        'loading': false
      }
    case 'GET_EXERCISES_FAILURE':
      return {
        'exercises': [],
        'error': true,
        'loading': false
      }
    case 'GET_PAST_WORKOUTS_SUCCESS':
      return {
        ...state,
        'pastWorkouts': action.pastWorkouts,
        'loading': false
      }
    case 'GET_EXERCISES_LOADING':
      return {
        'loading': true
      }
    case 'GET_FAVORITE_WORKOUTS_SUCCESSS':
      return {
        ...state,
        favoriteWorkouts: action.payload.favoriteWorkouts,
        totalFavoriteWorkotus: action.payload.totalFavoriteWorkotus,
        loading: false
      }
    default:
      return state
  }
}
