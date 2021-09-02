const initialState = {
    isLogin: false,
    items:{},
    loading: false,
    error: false
}
  
function reducer(state = initialState, action) {
    switch (action.type) {
      case 'SIGN_IN': { 
        localStorage.setItem("token_ecommerce", action.payload.token)
        return {
          ...state,
          items: action.payload,
          isLogin: true
        }
      }
      case 'SIGN_UP': {
        localStorage.setItem("token_ecommerce", action.payload.token)
        return {
          items: action.payload,
          isLogin: true
        }
      } 

      case 'LOGOUT': {
        return {

        }
      } 

      case 'RECOUVER_PASSWORD': {
        return {

        }
      } 
      default:
        return state
    }
  }

  export default reducer;