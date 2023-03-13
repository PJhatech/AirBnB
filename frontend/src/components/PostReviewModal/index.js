import React from "react";
import {useState} from "react";
import { createReviewThunk, spotReviewThunk } from "../../store/reviews";
import {useDispatch, useSelector} from "react-redux";
import {useModal} from "../../context/Modal";
import { useParams } from "react-router-dom";
import "./PostReviewModal.css"

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
      return newReview
      // await dispatch(spotReviewThunk(spotId))
    };

   return (
      <div className="review-container">
            <h1>How was your stay?</h1>
            <textarea className="text-area" value={review} onChange={updateReview}></textarea>

            <div className="star-rating">
                <input type="radio" name="stars" id="star-a" value={5} onClick={updateStars} />
                <label htmlFor="star-a"></label>

                <input type="radio" name="stars" id="star-b" value={4} onClick={updateStars} />
                <label htmlFor="star-b"></label>

                <input type="radio" name="stars" id="star-c" value={3} onClick={updateStars} />
                <label htmlFor="star-c"></label>

                <input type="radio" name="stars" id="star-d" value={2} onClick={updateStars} />
                <label htmlFor="star-d"></label>

                <input type="radio" name="stars" id="star-e" value={1} onClick={updateStars} />
                <label htmlFor="star-e"></label>
            </div>



            {/* <input type="number" placeholder="How Many Stars?" value={stars} onChange={updateStars} min={1} max={5} /> */}
            <button type='submit' onClick={handleSubmit} className='button-class'>Submit Your Review</button>
        </div>





      //   <div>
      //       <h1>How was your stay?</h1>
      //       <textarea value={review} onChange={updateReview}></textarea>
      //    <input type="number"
      //       placeholder="How Many Stars?"
      //       value={stars}
      //       onChange={updateStars}
      //       min={1}
      //       max={5} />
      //       <button type='submit' onClick={handleSubmit}>Submit Your Review</button>
      //   </div>
    );

}

export default PostReviewModal
