import React from "react";
import {useState} from "react";
import { createReviewThunk, spotReviewThunk } from "../../store/reviews";
import {useDispatch, useSelector} from "react-redux";
import {useModal} from "../../context/Modal";
import {useParams} from "react-router-dom";

function PostReviewModal(spotId) {
   const dispatch = useDispatch();
   const { closeModal } = useModal();
   const [review, setReview] = useState('')
   const [stars, setStars] = useState(1)

   const updateReview = (e) => setReview(e.target.value);
	const updateStars = (e) => setStars(e.target.value);

   const handleSubmit = async (e) => {
      e.preventDefault();

      const payload = {
			review,
			stars,
			spotId,
      };
      const newReview = dispatch(createReviewThunk(payload))
      closeModal()
      await dispatch(spotReviewThunk(spotId))
      return newReview
    };

   return (
        <div>
            <h1>How was your stay?</h1>
            <textarea value={review} onChange={updateReview}></textarea>
         <input type="number"
            placeholder="How Many Stars?"
            value={stars}
            onChange={updateStars}
            min={1}
            max={5} />
            <button type='submit' onClick={handleSubmit}>Submit Your Review</button>
        </div>
    );

}

export default PostReviewModal
