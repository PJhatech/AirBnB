import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {spotIndexThunk, deleteSpotThunk} from "../../store/spots";
// import {CreateReviewForm} from "../CreateReviewForm/index.js";
import OpenModalButton from "../OpenModalButton";

function SpotIndex() {
	const {id} = useParams();
	const dispatch = useDispatch();
	const spot = useSelector((state) => state.spots[id]);
	// const spotOwner = spot?.Owner;
	let spotOwner;
	if (spot) {
		spotOwner = spot.Owner;
	}
	const [isLoaded, setIsLoaded] = useState(false);

	const [hide, setHide] = useState(true);
	const showButton = () => setHide(false);

	useEffect(() => {
		dispatch(spotIndexThunk(id)).then(() => setIsLoaded(true));
	}, [dispatch]);

	// if (!spot?.Owner) {
	// 	return null;
	// }
	console.log(spot, "<------1------->");
	return (
		<>
			{isLoaded && (
				<div>
					<div>
						<div>
							<div>
								{spot.name}
								<br />
								{spot.city},{spot.state},{spot.country}
							</div>
							<br />
							<img src={spot.previewImage} alt={spot.city} />
							<br />
							<div>
								Hosted by
								{spotOwner ? spotOwner.firstName : null}
								{spotOwner ? spot.Owner.lastName : null}
								{spot.price} {spot.AvgRating}
							</div>
							{/* <div>
								<OpenModalButton
								buttonText="Post Your Review"
								modalComponent={<CreateReviewForm spot={spot} />}
								/>
							</div> */}
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default SpotIndex;
