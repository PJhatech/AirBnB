
const GET_SPOTS = "session/GET_SPOTS";
const SPOT_INDEX = "session/INDEX"


//Action
const getAllSpots = (spotList) => {
	return {
      type: GET_SPOTS,
      spotList
	};
};

const spotIndex = (spotIndex) => {
	return {
      type: SPOT_INDEX,
      spotIndex
	};
};


//Thunk
export const spotsThunk = () => async (dispatch) => {
   const response = await fetch("/api/spots");
   const allSpots = await response.json();
   dispatch(getAllSpots(allSpots));
   return allSpots
}

export const spotIndexThunk = (id) => async (dispatch) => {
   const response = await fetch(`/api/spots/${id}`);
   const index = await response.json();

   dispatch(spotIndex(index[0]));
   return index
}


//State & Reducer
const initialState = {}

const spotReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_SPOTS:
         return { ...state, ...action.spotList };
      case SPOT_INDEX:
         console.log(action)
         return {...state, ...action.spotIndex};
      default:
         return state
   }
}

export default spotReducer
