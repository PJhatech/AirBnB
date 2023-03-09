import {csrfFetch} from "./csrf";
const GET_SPOTS = "session/GET_SPOTS";
const SPOT_INDEX = "session/INDEX";
const CREATE_SPOT = "session/CREATE_SPOT";
const CREATE_IMAGE = "session/CREATE_IMAGE";
const UPDATE_SPOT = "sessin/UPDATE_SPOT";
const CREATE_REVIEW = "session/CREATE_IMAGE";
const DELETE_SPOT = "session/DELETE_SPOT";
// const SPOT_IMAGES = "session/SPOT_IMAGES";

//Action
const getAllSpots = (spotList) => {
	return {
		type: GET_SPOTS,
		spotList,
	};
};

const spotIndex = (spot) => {
	return {
		type: SPOT_INDEX,
		spot,
	};
};

const addSpot = (spot) => {
	return {
		type: CREATE_SPOT,
		spot,
	};
};

// const getSpotImages = (getSpotImages) => {
// 	return {
// 		type: SPOT_IMAGES,
// 		getSpotImages,
// 	};
// };

const createImage = (createImage) => {
	return {
		type: CREATE_IMAGE,
		createImage,
	};
};

const createReview = (createReview) => {
	return {
		type: CREATE_REVIEW,
		createReview
	}
}

const updateSpot = (updateSpot) => {
	return {
		type: UPDATE_SPOT,
		updateSpot
	}
}

const deleteSpot = (spotId) => {
	return {
		type: DELETE_SPOT,
		spotId
	}
}

//Thunk
export const spotsThunk = () => async (dispatch) => {
	const response = await fetch("/api/spots");
	const allSpots = await response.json();
	console.log(allSpots,"<-------3----->")
	dispatch(getAllSpots(allSpots));
	// return allSpots;
};

export const spotIndexThunk = (id) => async (dispatch) => {
	const response = await fetch(`/api/spots/${id}`);
	const spot = await response.json();

	dispatch(spotIndex(spot[0]));
	return spot;
};

export const createSpotThunk = (newSpot) => async (dispatch) => {
	const response = await csrfFetch("/api/spots", {
		method: "POST",
		body: JSON.stringify(newSpot),
	});

	if (response.ok) {
		console.log("HELLO")
		const spot = await response.json();
		dispatch(addSpot(spot));
		return spot;
	}
};

export const updateSpotThunk = (putData, spotId) => async (dispatch) => {
	const response = await csrfFetch(`/api/spots/${spotId}`, {
		method: "PUT",
		body: JSON.stringify(putData)
	});

	if (response.ok) {
		const put = await response.json();
		dispatch(updateSpot(put));
		return put
	}
}

export const getUserSpots = (user) => async (dispatch) => {
	const response = await csrfFetch("/api/spots")
	const data = await response.json();
	const filterSpots = Object.values(data);
	const ownedSpots = filterSpots.filter(spot => spot.ownerId === user.user.id)
	const ownedSpotObj = {};
	ownedSpots.map(spot => ownedSpotObj[spot.id] = spot)

	if (ownedSpots) {
		await dispatch(getAllSpots(ownedSpots))
	}
	return ownedSpotObj
}

// export const getImageThunk = (id) => async (dispatch) => {
//    const response = await fetch(`/api/spots/${id}/images`);
//    const images = await response.json();
//    dispatch(getSpotImages(images))
//    return images
// };

export const createImageThunk = (imageArr, spotId) => async (dispatch) => {
	let res;
   imageArr.forEach(async (image) => {
      console.log(image, "<--------5------>")
		const spotImageObj = {
			url: image,
			preview: true,
			imageableId: spotId
		};
		const response = await csrfFetch(`/api/spots/${spotId}/images`, {
				method: "POST",
				header: {"Content-Type": "application/json"},
				body: JSON.stringify(spotImageObj),
			}
		);
		console.log(response, "<-------3------>");

		if (response.ok) {
			const imageData = await response.json();
			console.log(imageData, "<-------4------>");
			dispatch(createImage(imageData));
			res = imageData;
		}
	});
	return res;
};

export const createReviewThunk = (reviewData) => async (dispatch) => {
	const response = await csrfFetch(`api/spot/${reviewData.spotId}/reviews`, {
		method: "POST",
		header: { "Content-Type": "application/json" },
		body: JSON.stringify(reviewData)
	})

	if (response.ok) {
		const reviewData = await response.json();
		dispatch(createReview(reviewData));
		return reviewData
	}
}

export const deleteSpotThunk = (spotId) => async (dispatch) => {
	const response = await csrfFetch(`/api/spots/${spotId}`, {
		method: "DELETE",
	});

	if (response.ok) {
		dispatch(deleteSpot(response));
		return response;
	}
};

//State & Reducer
const initialState = {};

const spotReducer = (state = initialState, action) => {
	let newState = {}
	switch (action.type) {
		case GET_SPOTS:
			return action.spotList.reduce((state, spot) => {
				state[spot.id] = spot
				return state
			},{});
			// return {...action.spotList};
		case SPOT_INDEX:
			return {...state, [action.spot.id]:  action.spot};
		case CREATE_SPOT:
				{
				 newState = {
					...state,
					[action.spot.id]: action.spot,
				};
				return newState;
			}
			return {
				...state,
				[action.spot.id]: {
					...state[action.spot.id],
					...action.spot,
				},
			};
		case UPDATE_SPOT:
				newState = {
					...state,
					[action.updateSpot.id]: action.updateSpot,
				}
				return newState

		case CREATE_IMAGE:
			return { ...state, ...action.createImage };
		case CREATE_REVIEW:
			return { ...state, ...action.createReview }
		case DELETE_SPOT:
			 newState = {...state};
			delete newState[action.spotId];
			return newState;
		// case SPOT_IMAGES:
		//    return { ...state, ...action.getSpotImages }
		default:
			return state;
	}
};

export default spotReducer;
