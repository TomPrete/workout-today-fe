export const timerReducer = (state, action) => {
  switch(action.type) {
    case 'UPDATE_TIME':
      return {
        'startSeconds': state.startSeconds,
        'workoutSeconds': action.workoutSeconds,
        'exerciseSeconds': state.exerciseSeconds,
        'isPaused': state.isPaused
      }
    case 'PAUSE_TIME':
      return {
        'startSeconds': state.startSeconds,
        'workoutSeconds': state.workoutSeconds,
        'exerciseSeconds': state.exerciseSeconds,
        'isPaused': true
      }
    case 'UNPAUSE_TIME':
      return {
        'startSeconds': state.startSeconds,
        'workoutSeconds': state.workoutSeconds,
        'exerciseSeconds': state.exerciseSeconds,
        'isPaused': false
      }
    case 'RESET_TIME':
      return {
        'workoutSeconds': action.workoutSeconds,
        'exerciseSeconds': action.exerciseSeconds,
        'isPaused': true
      }
    default:
      return state
  }
}
