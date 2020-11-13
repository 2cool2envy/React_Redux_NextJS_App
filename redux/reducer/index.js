const iState = {
   year: '',
   data:[],
   filterData:[],
   isLaunchSuccess:null
}

const reducer = (state = iState, action) => {
   switch (action.type) {
      case 'YEAR_SELECTED': return { ...state, year: action.payload }
      case 'API_DATA': return { ...state, data: action.payload }
      case 'FILTERED_DATA': return { ...state, filterData: action.payload }
      case 'SUCCESS_LAUNCH_FILTER': return { ...state, isLaunchSuccess: action.payload }      
      case 'CAR': return { ...state, data2: 123 }
      case 'YEARS': return { ...state, years: action.payload }
      case 'RESET': return 0
      default: return state
   }
}
export default reducer;