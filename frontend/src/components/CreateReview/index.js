import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {createReviewThunk} from "../../store/spots";

const CreateReviewForm = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const [review, setReview] = useState();
	const [stars, setStars] = useState();

	useEffect(() => {
		dispatch(spotsThunk());
	}, [dispatch]);
	const handleSubmit = async (e) => {
		e.preventDefault();
		const reviewData = {userId, spotId, review, stars};
		const newReview = await dispatch(createReviewThunk(reviewData));
	};
	history.push(`spots/${spotId}/${newReview.id}`);

	return (
		<div>
			<h1>How was your stay?</h1>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={review}
					onChange={(e) => setReview(e.target.value)}
					placeholder="Leave your review here..."
					required
				/>
				<input
					class="rating"
					type="rating"
					value={stars}
					onChange={(e) => setReview(e.target.value)}
					placeholder="stars"
					min=".5"
					max="5"
					required
            />
            <button type="submit">Submit Your Review</button>
			</form>
		</div>
	);
};

export default CreateReviewForm
