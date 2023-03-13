import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {spotsThunk} from "../../../store/spots";
import "./SpotList.css"

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
					<div className="spots-container">
						{spotList.map((spotList) => (
							<div key={spotList.id}>
								<NavLink exact to={`/spots/${spotList.id}`}>
									<div className="spot-grid">
										<img
											src={spotList.previewImage}
											alt={spotList.city}
										/>
									</div>
									<div className="pekabo">
										{spotList.city}, {spotList.state} <br />$
										{spotList.price} night
										{spotList.AvgRating|| "NEW"}
										<i className="fa-solid fa-star" />
									</div>
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
