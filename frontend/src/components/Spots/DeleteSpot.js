import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {spotIndexThunk, deleteSpotThunk} from "../../store/spots";
import UpdateSpot from "./UpdateSpot";


function DeleteSpot() {
	const {id} = useParams();
	const dispatch = useDispatch();
	const spot = useSelector((state) => state.spots);
	const spotOwner = spot.Owner;
	const [isLoaded, setIsLoaded] = useState(false);

	const [hide, setHide] = useState(true);
	const showButton = () => setHide(false);

	useEffect(() => {
		dispatch(spotIndexThunk(id)).then(() => setIsLoaded(true));
	}, [dispatch]);

	if (!spot.Owner) {
		return null;
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (spotOwner) {
			await dispatch(deleteSpotThunk(spot.id));
		}
	};

	return (
		<>
			<button onClick={handleSubmit}>
				Delete
				{spot.id}
			</button>

		</>
	);
}
