import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import { spotIndexThunk, deleteSpotThunk } from "../../../store/spots";
// import {CreateReviewForm} from "../CreateReviewForm/index.js";
import OpenModalButton from "../../OpenModalButton";
import SpotReview from "../../Reviews/index"
import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import PostReviewModal from "../../PostReviewModal";
import "./SpotIndex.css"

function SpotIndex() {
	const {id} = useParams();
	const dispatch = useDispatch();
	const spot = useSelector((state) => state.spots[id]);
	const closeMenu = () => setShowMenu(false);

	let spotOwner;
	if (spot) {
		spotOwner = spot.Owner;
	}
	const [isLoaded, setIsLoaded] = useState(false);

	const [hide, setHide] = useState(true);
	const [showMenu, setShowMenu] = useState(false);

	const showButton = () => setHide(false);

	useEffect(() => {
		dispatch(spotIndexThunk(id)).then(() => setIsLoaded(true));
	}, [dispatch]);



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
								{spot.description}
								{spot.price} {spot.AvgRating}
								{console.log(spot)}
								<div>
									<SpotReview key={spot.id} spot={spot} />
								</div>
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
			<div className="post-button">
				<OpenModalMenuItem
					itemText="Post Your Review"
					onItemClick={closeMenu}
					modalComponent={<PostReviewModal spotId={id} />}
				/>
			</div>
		</>
	);
}

export default SpotIndex;
