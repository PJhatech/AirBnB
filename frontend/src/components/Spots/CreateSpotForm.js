import React, {useEffect, useState} from "react";
import {useParams, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createImageThunk, createSpotThunk, spotsThunk} from "../../store/spots";
import ImageSpots from "./test";

const CreateSpotForm = () => {
	const {imageableId, imageableType} = useParams();
	const dispatch = useDispatch();
	const history = useHistory();

	const [address, setAddress] = useState();
	const [city, setCity] = useState();
	const [state, setState] = useState();
	const [country, setCountry] = useState();
	const [lat, setLat] = useState();
	const [lng, setLng] = useState();
	const [name, setName] = useState();
	const [description, setDiscription] = useState();
	const [price, setPrice] = useState();
	const [url, setImageUrl] = useState();
	const [preview, setPreview] = useState(); //previewImage
	const [ownerId, setOwnerId] = useState();

	// console.log(imageableIxd, "<--------1------->")
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		dispatch(spotsThunk()).then(() => setIsLoaded(true));
	}, [dispatch]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newSpot = {
			address,
			city,
			state,
			country,
			lat,
			lng,
			name,
			description,
			price,
			// ownerId,
		};

		const spotImage = {url, preview, imageableId, imageableType};
		dispatch(createSpotThunk(newSpot));
		console.log(spotImage, "<---------1--------->");
		dispatch(createImageThunk(spotImage));
		history.push(`/spots/${newSpot.id}`);
	};

	return (
		<div>
			<h1>Create a new Spot</h1>
			<h3>Where's your place located?</h3>
			<p>
				Guest will only get your exact address once they booked a
				reservation.
			</p>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={country}
					onChange={(e) => setCountry(e.target.value)}
					placeholder="Country"
					required
				/>
				<input
					type="text"
					value={address}
					onChange={(e) => setAddress(e.target.value)}
					placeholder="Address"
					required
				/>
				<input
					type="text"
					value={city}
					onChange={(e) => setCity(e.target.value)}
					placeholder="City"
					required
				/>
				<input
					type="text"
					value={state}
					onChange={(e) => setState(e.target.value)}
					placeholder="STATE"
					required
				/>
				<input
					type="number"
					value={lat}
					onChange={(e) => setLat(e.target.value)}
					placeholder="Latitude"
				/>
				<input
					type="number"
					value={lng}
					onChange={(e) => setLng(e.target.value)}
					placeholder="Longitude"
				/>
				<input
					type="text"
					value={description}
					onChange={(e) => setDiscription(e.target.value)}
					placeholder="Please write at least 30 characters"
					min="30"
					required
				/>
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Name of your spot"
					required
				/>
				<input
					type="number"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					min=""
					placeholder="Price per night (USD)"
					required
				/>
				<input type="text" value={url} placeholder="Image Url" />
				<input type="text" value={preview} placeholder="Preview Url" />
				<button type="submit">Create a Spot</button>
			</form>
		</div>
	);
};

export default CreateSpotForm;
