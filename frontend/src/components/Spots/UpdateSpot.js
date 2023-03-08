import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {spotIndexThunk, spotsThunk, updateSpotThunk} from "../../store/spots";

const UpdateSpot = ({ spot }) => {
   const dispatch = useDispatch();
   const history = useHistory();

   const [address, setAddress] = useState(spot.address);
   const [city, setCity] = useState(spot.city);
   const [state, setState] = useState(spot.state);
   const [country, setCountry] = useState(spot.country);
   const [lat, setLat] = useState(spot.lat);
   const [lng, setLng] = useState(spot.lng);
   const [name, setName] = useState(spot.name);
   const [description, setDescription] = useState(spot.description);
   const [price, setPrice] = useState(spot.price);
   const [url, setImageUrl] = useState(spot.url);
   const [preview, setPreview] = useState(spot.preview);
   const [previewImage, setPreviewImage] = useState(spot.previewImage);

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
      dispatch(spotsThunk());
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

      if (spot.id) {
         await dispatch(updateSpotThunk(putData, spot.id)).then(() =>
         dispatch(spotIndexThunk(spot.id)));
      }
      history.push(`/spots/${spot.id}`);
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
            <button type="submit">Update</button>
			</form>
		</div>
	);
}

export default UpdateSpot
