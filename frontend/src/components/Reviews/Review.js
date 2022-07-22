
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import React, { useState } from 'react'
import { useDispatch } from "react-redux"

import './Reviews.css'

import { destroyReview, getReviews } from '../../store/review';
import AddReview from '../AddReview/AddReview';
import EditReview from '../EditReview/EditReview';



const Reviews = ({ setReview }) => {
  const { id } = useParams()
  const parseId = parseInt(id, 10)

  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user)

  const reviews = useSelector((state) => state.reviewState.reviews)

  const reviewArr = Object.values(reviews);

  // const comments = useSelector(state => state.commentState.comments)
  // const commentsValues = Object.values(comments)
  // console.log(commentsValues, '<=============================')

  // const [showComments, setShowComments] = useState(false)


  const reviewSpots = reviewArr?.filter((review) => review.spotId === parseId)

  if (reviewSpots.length < 1) {
    setReview(false)
  } else if (reviewSpots.length > 0) {
    setReview(true)
  }

  const handleDelete = async (e) => {

    await dispatch(destroyReview(e.target.id))
    await dispatch(getReviews())
  }

  return (
    <div className='review-page-container'>

      {reviewSpots?.map(({ User, userId, review, id, spotId }) => (

        <div className='review-container-outer' key={id}>
          <div className='review-container-inner'>

            <p className='review-username'>{User?.username}</p>
            <p className='review-content'>{review}</p>

            {(userId === user?.id) && (

              <div className='add-review-container'>

                <EditReview user={User} review={review} id={id} spotId={spotId} />

                <button className='delete-review-button' onClick={handleDelete} id={id}>Delete Review</button>

              </div>
            )}

            {/* <div >
              <div>


              </div>
            </div> */}


          </div>
        </div>
      ))}
    </div>

  )
}

export default Reviews
