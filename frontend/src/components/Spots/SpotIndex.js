import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {spotIndexThunk, deleteSpotThunk} from "../../store/spots";
import UpdateSpot from "./UpdateSpot";
// import {CreateReviewForm} from "../CreateReviewForm/index.js";
import OpenModalButton from "../OpenModalButton";

function SpotIndex() {
	const {id} = useParams();
	const dispatch = useDispatch();
	const spot = useSelector((state) => state.spots);
	const spotOwner = spot.Owner;
	const [isLoaded, setIsLoaded] = useState(false);

	const [hide, setHide] = useState(true);
	const showButton = () => setHide(false);

	useEffect(() => {
		dispatch(spotIndexThunk(id)).then(() => setIsLoaded(true));
	}, [dispatch]);

	if (!spot.Owner) {
		return null;
	}

	   const handleSubmit = async (e) => {
			e.preventDefault();
			if (spotOwner) {
				await dispatch(deleteSpotThunk(spot.id))
			}
		};


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
					{/* <div>
					<OpenModalButton
					buttonText="Post Your Review"
					modalComponent={<CreateReviewForm />}/>
				</div> */}
				</div>
			)}
			{/* <button onClick={() => showButton()}>
				Update
				<div hidden={hide}>
					<UpdateSpot spot={spot} />
				</div>
			</button> */}

			<button onClick={handleSubmit}>
				Delete
				{spot.id}
			</button>
			{/* <UpdateSpot spot={spot} />
				<button onClick={showButton}>
				</button> */}
		</>
	);
}

export default SpotIndex;
