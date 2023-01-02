export const exerciseReducer = (state, action) => {
  switch(action.type) {
    case 'CHANGE_PRIMARY_EXERCISE':
      return {
        ...state,
        'exerciseIdx': action.newIdx,
        'abIdx': state.abIdx,
      }
    case 'CHANGE_AB_EXERCISE':
      return {
        ...state,
        'exerciseIdx': state.exerciseIdx,
        'abIdx': action.newIdx,
      }
    default:
      return state
  }
}
