
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import EditSpot from '../EditSpot/EditSpot';
import { destroySpot } from '../../store/spot';
import { getSpotId } from '../../store/spot';

import { getSpot } from '../../store/spot';

import { getReviews } from '../../store/review';

import Reviews from '../Reviews/Review';

import AddReview from '../AddReview/AddReview';

import './SpotDetails.css'

const SpotDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [showForm, setShowForm] = useState(false)

  const user = useSelector(state => state.session.user);
  const currSpot = useSelector((state) => state.spot.list[id]);

  const spots = useSelector((state) => state.spot.list);

  useEffect(() => {
    dispatch(getSpotId(id))
    // .then(data => { if (!data) history.push('/404') });
    // dispatch(getSpot())
    dispatch(getReviews())

  }, [dispatch]);


  const handleDelete = async (e) => {
    e.preventDefault()
    await dispatch(destroySpot(currSpot.id))
    return history.push('/lairs')
  }


  return (
    <div className='container-outer'>


      <div className='spot-details-page'>

        <div>
          <img className='lair-image' src="http://pm1.narvii.com/6611/1d286aa9237b8ee8891c0026b3021e031049433e_00.jpg" />
        </div>

        <div>
          <h2>Lair Details</h2>
        </div>

        {currSpot && (
          <div className='spot-detail-outer'>
            <div className='spot-detail-container'>

              {/* {console.log('currSpot ------> ', currSpot)}
            {console.log('my spots -------> ', spots)}
            {console.log('spotuser -------> ', currSpot.User)}
            {console.log('userid?? -------> ', user?.id)}
            {console.log('SPOT ID', currSpot.id)} */}

              {/* <div className='spot-detail-userId'> userId of post   {currSpot.userId}</div> */}

              <div>

                <div className='spot-detail-user'> Hosted By: {currSpot?.User?.username}</div>
                <div className='spot-detail-name'>Name of Lair: {currSpot.name}</div>
                <div className='spot-detail-address'>Address: {currSpot.address}</div>
                <div className='spot-detail-price'>Cost Per Night: ${currSpot.price}</div>

              </div>
              <br></br>
              <div>
                {console.log('currSpot -----> ', currSpot)}
                {user && currSpot?.userId !== user?.id && (

                  // <button>Add Review</button>
                  <AddReview spot={currSpot} user={user} />

                )}

              </div>
              {user?.id === currSpot.userId && (
                <>
                  <EditSpot user={user} spot={currSpot} />

                  <button id='delete-spot-button' onClick={handleDelete}>Delete</button>
                  <br></br>
                </>
              )}


            </div>

            <div className='review-container'>
              <h3>Reviews:</h3>
              <Reviews id={currSpot?.id} />

            </div>

          </div>

        )}

      </div>
    </div>
  )
}

export default SpotDetail;
