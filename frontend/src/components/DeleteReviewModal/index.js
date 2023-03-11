import React from "react";
import {useState} from "react";
import {deleteReviewThunk, spotReviewThunk} from "../../store/reviews";
import {useDispatch, useSelector} from "react-redux";
import {useModal} from "../../context/Modal";
import {useParams} from "react-router-dom";

function DeleteReviewModal(reviewId, spotId) {
	const dispatch = useDispatch();
	const {closeModal} = useModal();


	const handleSubmit = (e) => {
		e.preventDefault();
      dispatch(deleteReviewThunk(reviewId))
         .then(dispatch(spotReviewThunk(spotId)))
         .then(closeModal).catch();
	};

	return (
		<div>
         Are You Sure You Want To Delete?
         <button type="submit" onClick={handleSubmit}>
            Confirm
         </button>
		</div>
	);
}

export default DeleteReviewModal;
