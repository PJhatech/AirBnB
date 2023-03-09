import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {getUserSpots, deleteSpotThunk} from "../../../store/spots";
import {useModal} from "../../../context/Modal";

function DeleteSpot(spot) {
	const dispatch = useDispatch();
	const {closeModal} = useModal();

	const userSpot = Object.values(spot);
	const user = useSelector((state) => state.session);
	const spotOwner = spot.Owner;

	// const [isLoaded, setLoaded] = useState(false);
	// const [hide, setHide] = useState(true);
	// const showButton = () => setHide(false);

	// const [spotUser, setSpotUser] = useState(userSpot);

	// useEffect(() => {
	// 	dispatch(getUserSpots(user)).then(() => setLoaded(true));
	// }, [dispatch]);

	// if (user) {
	// 	return null;
	// }

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(spot.prop);
		return dispatch(deleteSpotThunk(spot.prop.id));
	};

	return (
		<>
			<div>
				<h1>Confirm Delete</h1>
				<p>
					Are you sure you want to delete this spot? This action cannot be
					reversed.
				</p>
				<button type="submit" onClick={handleSubmit}>
					Yes(Delete Spot)
				</button>
			</div>
			{/* <h1>Delete Spot?</h1>
			<form onSubmit={handleSubmit}>
				<label>
					delete
					<input
						type="text"
						value={spotUser}
						onChange={(e) => setSpotUser(e.target.value)}
					/>
				</label>
				<button type="submit">Delete</button>
			</form> */}
			{/* <button onClick={handleSubmit}>
				Delete
				{userSpot}
			</button> */}
		</>
	);
}

export default DeleteSpot;
