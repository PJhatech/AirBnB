import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
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
				{getSpots && getSpots.map(({city, state, price, previewImage}) => (
               <div >
               <img src={previewImage} alt={city}/>
						{city}, {state} ${price}
					</div>
				))}
			</div>
		</div>
	);
}

export default GetSpots;
