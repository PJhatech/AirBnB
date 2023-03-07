import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {spotsThunk} from "../../store/spots";
import "./Spot.css";

function SpotList() {
	const dispatch = useDispatch();
	const selectorSpots = useSelector((state) => state.spots);
	const spotList = Object.values(selectorSpots);

	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		dispatch(spotsThunk()).then(() => setIsLoaded(true));
	}, [dispatch]);

	return (
		<>
			{isLoaded && (
				<div>
					<h1>spotList</h1>
					<div className="spots">
						{spotList.map((spotList) => (
							<div key={spotList.id}>
								<NavLink exact to={`/spots/${spotList.id}`}>
									<img src={spotList.previewImage} alt={spotList.city}/>
									{spotList.city} {spotList.state} {spotList.price}
								</NavLink>
							</div>
						))}
					</div>
				</div>
			)}
		</>
	);
}

export default SpotList;
