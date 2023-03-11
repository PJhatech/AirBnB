import {csrfFetch} from "./csrf";

const SPOT_REVIEW = "session/SPOT_REVIEW";
const CREATE_REVIEW = "session/CREATE_REVIEW";
const DELETE_REVIEW = "session/DELETE_REVIEW";

//Action
const getReviews = (spotReviews) => {
	return {
		type: SPOT_REVIEW,
		spotReviews,
	};

};

const createReview = (newReview) => {
	return {
		type: CREATE_REVIEW,
		newReview
	};
};

const deleteReview = (deleteReview) => {
	return {
		type: DELETE_REVIEW,
		deleteReview
	}
}

//Thunk
export const spotReviewThunk = (spotId) => async (dispatch) => {
	const response = await fetch(`/api/spots/${spotId}/reviews`);
	const review = await response.json();
	dispatch(getReviews(review));
};

export const userReviewsThunk = (userId) => async (dispatch) => {
	const response = await csrfFetch(`api/reviews/${userId}`);
	const reviews = await response.json();
	dispatch(getReviews(reviews));
};

export const createReviewThunk = (payload) => async (dispatch) => {
	let {review, stars, spotId} = payload
	const response = await csrfFetch(`/api/spots/${spotId.spotId}/reviews`, {
		method: "POST",
		body: JSON.stringify({review, stars})
	});
	const reviewData = await response.json();
	dispatch(createReview(reviewData));
	return reviewData
};

export const deleteReviewThunk = (payload) => async (dispatch) => {
	const response = await csrfFetch(`/api/reviews/${payload}`, {
		method: "DELETE",
		body: JSON.stringify(),
	});

	console.log(response, "<-----------1------------->")
	const deletedReview = await response.json();
	dispatch(deleteReview(deletedReview))
}

const initialState = {};

const reviewReducer = (state = initialState, action) => {
	let newState = {};
	switch (action.type) {
		case SPOT_REVIEW:
			newState =[...action.spotReviews.Reviews]
			newState.forEach(review => newState[review.id] = review)
			// console.log(newState)
			return newState
		case CREATE_REVIEW:
			// newState = {...state};
			newState[action.newReview.id] = action.newReview;
			return newState
		case DELETE_REVIEW:
			newState = { ...state };
			delete newState[action.id];
			return newState;
		default:
			return state;
	}
};

export default reviewReducer;
