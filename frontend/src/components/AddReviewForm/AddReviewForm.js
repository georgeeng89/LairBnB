import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { postReview } from "../../store/review";

import "./AddReviewForm.css";

const AddReviewForm = ({ user, spot, setModal}) => {

  console.log('MY ADD REVIEW FORM SPOT----> ', spot)
  console.log('MY ADD REVIEW FORM USER----> ', user)

  const sessionUser = useSelector((state) => state.session.user);
  const userId = sessionUser.id

  const dispatch = useDispatch();
  const history = useHistory();

  const [errors, setErrors] = useState([]);

  const [review, setReview] = useState('');
  const [spotId, setSpotId] = useState(spot.id);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const newReview = {
      review,
      userId,
      spotId
    }


    //   // 8. Dispatch the return value of the thunk creator instead (the thunk)
    dispatch(postReview(newReview))

    //     .catch(async (res) => {
    //     const data = await res.json();
    //     if (data && data.errors) setErrors(data.errors);
    //   });

    // history.push(`/lairs/`);
    setModal(false)

    //   // reset();
  };




  return (
    <div className="edit-spot-container">
      <h1>Add a Review</h1>
      <form onSubmit={handleSubmit}>

        <ul className="errors-list">
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>

        <input type="hidden" name="spotId" value={spot.id} />

        <textarea
          type="text"
          onChange={(e) => setReview(e.target.value)}
          value={review}
          placeholder="Describe your experience..."
          name="review"
          className="review-text"
          required
        />

        <button type="submit" className="sign-in review">Submit</button>
      </form>
    </div>
  );
};

export default AddReviewForm;
