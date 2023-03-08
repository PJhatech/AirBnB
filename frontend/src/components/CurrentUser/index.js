import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {spotIndexThunk, getUserSpots} from "../../store/spots";
import CreateSpotForm from "../Spots/CreateSpotForm";

const CurrentUser = () => {
	const dispatch = useDispatch();
	const ownedSpots = useSelector((state) => state.spots);
	const user = useSelector((state) => state.session);
	const userSpots = Object.values(ownedSpots);
   const spotOwner = userSpots.Owner;
	const [loaded, setLoaded] = useState(false);
	const [hide, setHide] = useState(true);
	const showButton = () => setHide(false);

	useEffect(() => {
		dispatch(getUserSpots(user)).then(() => setLoaded(true));
	}, [dispatch]);

	return (
		<div>
			<div>
				<h1>Manage Your Spots</h1>
				<NavLink to="/spots">
					<button>Create a New Spot</button>
				</NavLink>
			</div>
			{loaded &&
				userSpots.map((spot) => (
					<div>
						<br />
						<img src={spot.previewImage} alt={spot.city} />
						<div>
							{spot.name}
							<br />
							{spot.city},{spot.state},{spot.country}
                     {spot.price}
						   <br/>
                     {spot.AvgRating}
						</div>
						<div>
						</div>
					</div>
				))}
		</div>
	);
};

export default CurrentUser;
