export const modalReducer = (state, action) => {
  switch(action.type) {
    case 'OPEN_MODAL':
      return {
        'showModal': true,
      }
      case 'CLOSE_MODAL':
        return {
        'showModal': true,
      }
    default:
      return state
  }
}
