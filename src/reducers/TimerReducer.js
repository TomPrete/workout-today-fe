export const timerReducer = (state, action) => {
  switch(action.type) {
    case 'UPDATE_TIME':
      return {
        'startSeconds': state.startSeconds,
        'workoutSeconds': action.workoutSeconds,
        'exerciseSeconds': action.exerciseSeconds,
        'isPaused': false
      }
    case 'PAUSE_TIME':
      return {
        'workoutSeconds': action.workoutSeconds,
        'exerciseSeconds': action.exerciseSeconds,
        'isPaused': true
      }
    case 'RESET_TIME':
      return {
        'workoutSeconds': action.workoutSeconds,
        'exerciseSeconds': action.exerciseSeconds,
        'isPaused': false
      }
    default:
      return state
  }
}
