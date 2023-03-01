import React, { useEffect } from "react";
import { NavLink, Route } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import spotReducer, { spotsThunk, thunkSpots } from "../../store/spots";
import "./spot.css";


function GetSpots() {
   const dispatch = useDispatch()
   const selectorSpots = useSelector(state => state.spots)
   const getSpots = Object.values(selectorSpots);

   useEffect(() => {
      dispatch(spotsThunk())
   }, [dispatch])


   return (
		<div>
			<h1>spots</h1>
			<div className="spots">
				{getSpots && getSpots.map(({id, city, state, price, previewImage}) => (
               <div >
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

export default GetSpots;
