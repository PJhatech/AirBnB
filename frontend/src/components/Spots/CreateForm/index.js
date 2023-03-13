import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {
	createImageThunk,
	createSpotThunk,
	spotsThunk,
	spotIndexThunk,
} from "../../../store/spots";
import "./CreateForm.css"

const CreateSpotForm = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const [address, setAddress] = useState();
	const [city, setCity] = useState();
	const [state, setState] = useState();
	const [country, setCountry] = useState();
	const [lat, setLat] = useState();
	const [lng, setLng] = useState();
	const [name, setName] = useState();
	const [description, setDescription] = useState();
	const [price, setPrice] = useState();
	const [url, setImageUrl] = useState();
	const [preview, setPreview] = useState(); //previewImage
	const [previewImage, setPreviewImage] = useState();

	// useEffect(() => {
	// 	dispatch(spotsThunk());
	// }, [dispatch]);

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
			previewImage,
		};
		const createdSpot = await dispatch(createSpotThunk(newSpot));
		if (createdSpot) {
			const spotId = createdSpot.id;
			const imageArr = [url, preview];
			await dispatch(createImageThunk(imageArr, spotId));
			setPreviewImage(createdSpot.url);
		}
		history.push(`/spots/${createdSpot.id}`);
		dispatch(spotIndexThunk(createdSpot.id));
	};

	return (
		<div className="container">
			<div className="text-detail">
				<h1>Create a new Spot</h1>
				<h3>Where's your place located?</h3>
				<p>
					Guest will only get your exact address once they booked a
					reservation.
				</p>
			</div>
			<form onSubmit={handleSubmit}>
				<div className="display-control">
					Country
					<input
						type="text"
						value={country}
						onChange={(e) => setCountry(e.target.value)}
						placeholder="Country"
						required
					/>
					<br />
					Address
					<input
						type="text"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						placeholder="Address"
						required
					/>
				</div>
				<br />
				<div className="float">
				City
				<input
					className="display-control"
					type="text"
					value={city}
					onChange={(e) => setCity(e.target.value)}
					placeholder="City"
					required
				/>
				 State
				<input
					className="display-control"
					type="text"
					value={state}
					onChange={(e) => setState(e.target.value)}
					placeholder="STATE"
					required
				/>
				</div>
				<div className="float">

				Latitude
				<input
					type="number"
					value={lat}
					onChange={(e) => setLat(e.target.value)}
					placeholder="Latitude"
				/>
				Longitude
				<input
					type="number"
					value={lng}
					onChange={(e) => setLng(e.target.value)}
					placeholder="Longitude"
				/>
				</div>

				<br />
				<br />
				Description
				<input
					type="text"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
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
				<input
					type="text"
					value={url}
					onChange={(e) => setImageUrl(e.target.value)}
					placeholder="Image Url"
				/>
				<input
					type="text"
					value={preview}
					onChange={(e) => setPreview(e.target.value)}
					placeholder="Preview Url"
				/>
				<button type="submit">Create a Spot</button>
			</form>
		</div>
	);
};

export default CreateSpotForm;
