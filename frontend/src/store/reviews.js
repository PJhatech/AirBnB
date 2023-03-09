import { csrfFetch } from "./csrf";

const REVIEWS = "session/REVIEWS"
const CREATE_REVIEW = "session/CREATE_IMAGE";


//Action
const getReviews = (review, reviewList) => {
   return {
      type: REVIEWS,
		review,
		reviewList
   }
}

const createReview = (createReview) => {
	return {
		type: CREATE_REVIEW,
		createReview,
	};
};

//Thunk
export const userReviewsThunk = (current) => async (dispatch) => {
	const response = await csrfFetch(`api/reviews/${current}`);
   const reviews = await response.json();
   dispatch(getReviews(reviews));
}

export const reviewIndexThunk = (spotId) => async (dispatch) => {
	const response = await fetch(`/api/${spotId}/reviews`);
	const review = await response.json();

	dispatch(getReviews(review[0]));
	return review;
};

export const createReviewThunk = (reviewData) => async (dispatch) => {
	const response = await csrfFetch(`api/reviews/${reviewData.spotId}/reviews`, {
		method: "POST",
		header: {"Content-Type": "application/json"},
		body: JSON.stringify(reviewData),
	});

	if (response.ok) {
		const reviewData = await response.json();
		dispatch(createReview(reviewData));
		return reviewData;
	}
};

const initialState = {};

const reviewReducer = (state = initialState, action) => {
   let newState = {};
   switch (action.type) {
		case REVIEWS:
			return action.reviews.reduce((state, reviews) => {
				state[reviews.id] = reviews;
				return state;
			}, {});
		case CREATE_REVIEW:
			return {...state, ...action.createReview};
		default:
			return state;
	}
}

export default reviewReducer;
