import React, {useEffect, useState} from "react";
import {useParams, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createSpotThunk, spotsThunk} from "../../store/spots";
import ImageSpots from "./test";

const CreateSpotForm = () => {
	const {payload} = useParams();
	const dispatch = useDispatch();
	const history = useHistory();

	const [address, setAddress] = useState();
	const [city, setCity] = useState();
	const [state, setState] = useState();
	const [country, setcountry] = useState();
	const [lat, setLat] = useState();
	const [lng, setLng] = useState();
	const [name, setName] = useState();
	const [description, setDiscription] = useState();
	const [price, setPrice] = useState();

	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		dispatch(spotsThunk()).then(() => setIsLoaded(true));
	}, [dispatch]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(createSpotThunk(payload));
		history.push(`/spots/${payload.id}`);
	};

	console.log(handleSubmit, "<---------1--------->");
	return (
		<div>
			<h1>Create a new Spot</h1>
			<h3>Where's your place located?</h3>
			<p>
				Guest will only get your exact address once they booked a
				reservation.
			</p>
			<form onSubmit={handleSubmit}>
				<input type="text" value={country} placeholder="Country" required />
				<input type="text" value={address} placeholder="Address" required />
				<input type="text" value={city} placeholder="City" required />
				<input type="text" value={state} placeholder="STATE" required />
				<input type="number" value={lat} placeholder="Latitude" />
				<input type="number" value={lng} placeholder="Longitude" required />
				<input
					type="text"
					value={description}
					placeholder="Please write at least 30 characters"
					min="30"
					required
				/>
				<input
					type="text"
					value={name}
					placeholder="Name of your spot"
					required
				/>
				<input
					type="number"
					value={price}
					min=""
					placeholder="Price per night (USD"
					required
				/>
				<button type="submit">Create a Spot</button>
			</form>

			<ImageSpots />

		</div>
	);
};

export default CreateSpotForm;
