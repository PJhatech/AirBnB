const GET_SPOTS = "session/GET_SPOTS";
const SPOT_INDEX = "session/INDEX";
const CREATE_SPOT = "session/CREATE_SPOT"
const CREATE_IMAGE = "session/CREATE_IMAGE"
// const SPOT_IMAGES = "session/SPOT_IMAGES";


//Action
const getAllSpots = (spotList) => {
	return {
      type: GET_SPOTS,
      spotList
	};
};

const spotIndex = (spot) => {
	return {
      type: SPOT_INDEX,
      spot
	};
};

const addSpot = (spot) => {
   return {
      type: CREATE_SPOT,
      spot
   }
}

// const getSpotImages = (getSpotImages) => {
// 	return {
// 		type: SPOT_IMAGES,
// 		getSpotImages,
// 	};
// };

const createImage = (createImage) => {
   return {
      type: CREATE_IMAGE,
      createImage
   }
}

//Thunk
export const spotsThunk = () => async (dispatch) => {
   const response = await fetch("/api/spots");
   const allSpots = await response.json();
   dispatch(getAllSpots(allSpots));
   return allSpots
}

export const spotIndexThunk = (id) => async (dispatch) => {
   const response = await fetch(`/api/spots/${id}`);
   const spot = await response.json();

   dispatch(spotIndex(spot[0]));
   return spot
}

export const createSpotThunk = (newSpot) => async (dispatch) => {
   const response = await fetch("/api/spots", {
		method: "POST",
      header: { "Content-Type": "application/json" },
      body: JSON.stringify(newSpot)
   });

   if (response.ok) {
      const spot = await response.json();
      dispatch(addSpot(spot));
      console.log(spot, '<-------2----->')
   }
}

// export const getImageThunk = (id) => async (dispatch) => {
//    const response = await fetch(`/api/spots/${id}/images`);
//    const images = await response.json();
//    dispatch(getSpotImages(images))
//    return images
// };

export const createImageThunk = (spotImage) => async (dispatch) => {
   const response = await fetch(`/api/spots/${spotImage.imageableId}/images`, {
      method: "POST",
      header: { "Content-Type": "application/json" },
      body: JSON.stringify()
   });

   if (response.ok) {
      const image = await response.json();
      dispatch(createImage(image));
      return image
   }
}

//State & Reducer
const initialState = {}

const spotReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_SPOTS:
         return { ...state, ...action.spotList };
      case SPOT_INDEX:
         return { ...state, ...action.spot };
      case CREATE_SPOT:
         if (!state[action.spot.id]) {
            const newState = {
               ...state,
               [action.spot.id]: action.spot
            };
            const spots = newState.spotList.map(id => newState[id]);
            spots.push(action.spot);
            console.log(newState)
            return newState
         };
         return {
            ...state,
            [action.spot.id]: {
               ...state[action.spot.id],
               ...action.spot
            }
         };
       let createReportState = { ...state }
         createReportState[action.newReport.id] = action.newReport
         return createReportState
         case CREATE_IMAGE:
            return {...state, ...action.createImage}
            // case SPOT_IMAGES:
            //    return { ...state, ...action.getSpotImages }
      default:
         return state
   }
}

export default spotReducer
