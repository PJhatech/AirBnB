import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {getUserSpots, deleteSpotThunk} from "../../../store/spots";
import { useModal } from "../../../context/Modal";
import "./DeleteSpot.css"

function DeleteSpot(spot) {
	const dispatch = useDispatch();
	const {closeModal} = useModal();

	const userSpot = Object.values(spot);
	const user = useSelector((state) => state.session);
	const spotOwner = spot.Owner;

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(deleteSpotThunk(spot.prop.id))
		.then(dispatch(getUserSpots(user)))
	};

	return (
			<div className="delete-container">
				<h1>Confirm Delete</h1>
				<p>
					Are you sure you want to delete this spot? This action cannot be
					reversed.
				</p>
				<button className="button-class-submit" type="submit" onClick={handleSubmit}>
					Yes(Delete Spot)
				</button>
				<button className="button-class-cancel"  onClick={closeModal}>
					No(Keep Spot)
				</button>
			</div>
	);
}

export default DeleteSpot;
