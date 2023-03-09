import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import { userReviewsThunk } from "../../store/reviews";
import { getUserSpots, spotIndexThunk } from "../../store/reviews";

function ManageReviews() {
   const {id} = useParams()
   const dispatch = useDispatch();
   const review = useSelector(state => state.reviews[id]);
   const userReviews = useSelector((state) => state.reviews);
	const reviews = Object.values(userReviews);
   const user = useSelector(state => state.session);

   let reviewOwner;
   if (review) {
      reviewOwner = review.userId;
   }

   const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
		dispatch(userReviewsThunk(user.id)).then(() =>
			setIsLoaded(true)
		);
  }, [dispatch]);

//    const handleClick = async (e) => {
//       e.preventDefault()
//       dispatch(userReviewsThunk(userReviews.ownerId))
//    }

   return (
      <>
         <div>
            <h1>Manage Reviews</h1>
         </div>
         <div>
			{isLoaded && reviews.map((review) => (
               {review}
                  ))}
         </div>
      </>
   )

}

export default ManageReviews
