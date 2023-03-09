import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { updateSpotThunk, getUserSpots } from "../../store/spots";
import { useParams } from "react-router-dom";

const UpdateSpot = () => {
	const dispatch = useDispatch();
	const ownerSpot = useSelector((state) => state.spots);
	const userSpots = Object.values(ownerSpot);
	const user = useSelector((state) => state.session);
	const spotOwner = userSpots.Owner;
	const {spotId} = useParams()
	const [loaded, setLoaded] = useState(false);
	const history = useHistory();

	const [address, setAddress] = useState(userSpots.address);
	const [city, setCity] = useState(userSpots.city);
	const [state, setState] = useState(userSpots.state);
	const [country, setCountry] = useState(userSpots.country);
	const [lat, setLat] = useState(userSpots.lat);
	const [lng, setLng] = useState(userSpots.lng);
	const [name, setName] = useState(userSpots.name);
	const [description, setDescription] = useState(userSpots.description);
	const [price, setPrice] = useState(userSpots.price);
	const [url, setImageUrl] = useState(userSpots.url);
	const [preview, setPreview] = useState(userSpots.preview);
	const [previewImage, setPreviewImage] = useState(userSpots.previewImage);

	const updateAddress = (e) => setAddress(e.target.value);
	const updateCity = (e) => setCity(e.target.value);
	const updateState = (e) => setState(e.target.value);
	const updateCountry = (e) => setCountry(e.target.value);
	const updateLat = (e) => setLat(e.target.value);
	const updateLng = (e) => setLng(e.target.value);
	const updateName = (e) => setName(e.target.value);
	const updateDescription = (e) => setDescription(e.target.value);
	const updatePrice = (e) => setPrice(e.target.value);
	const updateUrl = (e) => setImageUrl(e.target.value);
	const updatePreview = (e) => setPreview(e.target.value);
	const updatePreviewImage = (e) => setPreviewImage(e.target.value);

	useEffect(() => {
	   dispatch(getUserSpots(user)).then(() => setLoaded(true));;
	}, [dispatch]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const putData = {
			address,
			city,
			state,
			country,
			lat,
			lng,
			lat,
			description,
			price,
			previewImage,
		};

		if (user) {
			// const spotId = userSpots.id
			console.log(user, "<----------2---------->")
			dispatch(updateSpotThunk(putData, spotId))
			history.push(`/spots/${spotId}`)
			dispatch(getUserSpots(user))
		}
	};

	return (
		<div>
			<h1>Update your Spot</h1>
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
				<h2>Describe your Place to guests</h2>
				<p>
					Mention the best features of your space, any special amentities
					like fast wif or parking, and what you love about the
					neighborhood.
				</p>
				<input
					type="text"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder="In the heart of NYC, experience the life of a typical New Yorker
									with Times Square and the Empire State at your doorstep!"
					min="30"
					required
				/>
				<h2>Create a title for your spot</h2>
				<p>
					Catch guests' attention with a spot title that highlights what
					makes your place special
				</p>
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Bachelor's Apt in Heart of NYC"
					required
				/>
				<h2>Set a base price for your spot</h2>
				<p>
					Competitive pricing can help your listing stand out and rank
					higher in search results.
				</p>
				$
				<input
					type="number"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					min="1"
					placeholder="Price per night (USD)"
					required
				/>
				<h2>Liven up your spot with photos</h2>
				<p>Submit a link to at least one photo to publish your spot.</p>
				<input
					type="text"
					value={previewImage}
					onChange={(e) => setImageUrl(e.target.value)}
					placeholder="Image Url"
				/>
				<button type="submit">Create Spot</button>
			</form>
		</div>
	);
};

export default UpdateSpot;
