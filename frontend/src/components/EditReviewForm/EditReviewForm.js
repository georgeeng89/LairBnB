import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { editReview } from "../../store/review";

// 8. Replace import of action creator with thunk creator

// import { createSpot } from "../../store/spot";
// import { editSpot } from "../../store/spot";

import "./EditReviewForm.css";

const EditReviewForm = ({ user, review, id, spotId, setModal }) => {

  // console.log('MY SPOT FROM EDIT SPOT ----> ', spot)

  const sessionUser = useSelector((state) => state.session.user);
  const userId = sessionUser.id

  const dispatch = useDispatch();
  const history = useHistory();

  const [myReview, setReview] = useState(review);



  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedReview = {
      id,
      review: myReview,
      userId,
      spotId
    };

    dispatch(editReview(updatedReview))

    // history.push(`/lairs`);

    setModal(false)

    // reset();
  };

  return (
    <div className="edit-review-container">

      <h1>Edit Review</h1>

      <form onSubmit={handleSubmit}>

        {/* <ul className="errors-list">
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul> */}

        <input type="hidden" name="spotId" value={spotId} />

        <textarea
          type="text"
          onChange={(e) => setReview(e.target.value)}
          value={myReview}
          placeholder={myReview}
          name="review"
          required
        />



        <button type="submit">Submit</button>
      </form>
    </div>
  );

};

export default EditReviewForm;
