import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useParams} from "react-router-dom";
import {spotIndexThunk} from "../../store/spots";

function SpotIndex() {
	const {id} = useParams();
	const dispatch = useDispatch();
	const spotIndexSelector = useSelector((state) => state.spots);
	const spot = Object.values(spotIndexSelector);

	useEffect(() => {
		dispatch(spotIndexThunk(id));
	}, [dispatch]);

	// console.log(spot, "<===========1===========>");
	return (
		<div>
			{spot.map(({name, city, state, country, previewImage, Owner, price, numReviews }) => (
				<div>
					<div>
						{name}
						<br />
						{city},
						{state},
                  {country}
                  <br/>
                  <img src={previewImage} alt={city} />
                  <br/>
                  Hosted by {Owner.firstName} {Owner.lastName}
                  <div>
                     ${price}  avgReviews{numReviews}
                  </div>

					</div>
				</div>
			))}
		</div>
	);
}

export default SpotIndex;
