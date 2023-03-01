const GET_SPOTS = "session/GET_SPOTS";


const spotActionCreator = (getSpots) => {
	return {
      type: GET_SPOTS,
      getSpots
	};
};


export const spotsThunk = () => async (dispatch) => {
	const response = await fetch("/api/spots");
   const getSpots = await response.json();
   console.log(getSpots)
   dispatch(spotActionCreator(getSpots));
   return response
};


const initialState = {}

const spotReducer = (state = initialState, action) => {

   switch (action.type) {
      case GET_SPOTS:
         return {...state, ...action.getSpots}
      default:
         return state
   }
}

export default spotReducer
