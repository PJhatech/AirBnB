import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { spotReviewThunk } from "../../store/reviews";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteReviewModal from "../DeleteReviewModal";

export default function SpotReview({spot}) {
	const dispatch = useDispatch();
	const reviewList = useSelector((state) => state.reviews);
	// const reviewList = Object.values(reviews)


	console.log(reviewList)
	const [showMenu, setShowMenu] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);
	const closeMenu = () => setShowMenu(false);

	useEffect(() => {
		dispatch(spotReviewThunk(spot.id)).then(() => setIsLoaded(true));
	}, [dispatch]);
	// console.log(selectorReviews, "<--------5------->");

	return (
		<>
			{isLoaded && (
				<div>
					<h1>Spot Review</h1>
					<div>
						{Object.values(
							reviewList).map((reviews) => (
								<>
									{reviews.review}
									<OpenModalMenuItem
										itemText="Delete"
										onItemClick={closeMenu}
										modalComponent={
											<DeleteReviewModal
												reviewId={reviews.id}
												spotId={spot.id}
											/>
										}
									/>
								</>
							))}
					</div>
				</div>
			)}
		</>
	);
}
