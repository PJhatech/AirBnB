import React, {useEffect} from "react";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {spotsThunk} from "../../store/spots";
import "./Spot.css";


function SpotList() {
	const dispatch = useDispatch();
	const selectorSpots = useSelector((state) => state.spots);
	const spotList = Object.values(selectorSpots);

	useEffect(() => {
		dispatch(spotsThunk());
	}, [dispatch]);
	return (
		<div>
			<h1>spots</h1>
			<div className="spots">
				{
					spotList.map(({id, city, state, price, previewImage}) => (
						<div>
							<NavLink exact to={`/spots/${id}`}>
								<img src={previewImage} alt={city} />
								{city}, {state} ${price}
							</NavLink>
						</div>
					))}
			</div>
		</div>
	);
}

export default SpotList;
