import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {spotIndexThunk} from "../../store/spots";


function SpotIndex() {
	const {id} = useParams();
	const dispatch = useDispatch();
	const spot = useSelector((state) => state.spots);
	const spotPreviewImage = spot.previewImage;
	// const image = Object.values(spotPreviewImage)
	const spotOwner = spot.Owner
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		dispatch(spotIndexThunk(id)).then(() => setIsLoaded(true));
	}, [dispatch]);

	// console.log(spotPreviewImage)
	if(!spot.Owner){
		return null
	}

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
								{spotOwner ? spotOwner.firstName  : null}
								{spotOwner ? spot.Owner.lastName : null}
								{spot.price } {spot.AvgRating}


							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default SpotIndex;
