
export const counterReducer=(state = { value: 0 }, action)=>{
  switch (action.type) {
    case 'firstData':
      return  action.data 
    default:
      return state
  }
}