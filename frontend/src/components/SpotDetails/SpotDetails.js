
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import EditSpot from '../EditSpot/EditSpot';
import { destroySpot } from '../../store/spot';
import { getSpotId } from '../../store/spot';
import { createOneBooking, deleteSingleBooking, getAllBookings } from '../../store/booking';

import { getSpot } from '../../store/spot';

import { getReviews } from '../../store/review';

import Reviews from '../Reviews/Review';

import AddReview from '../AddReview/AddReview';

import './SpotDetails.css'

const SpotDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [showReviews, setShowReviews] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [startDate, setStartDate] = useState(new Date().toISOString().substring(0, 10))
  const [endDate, setEndDate] = useState(new Date(new Date().getTime() + (3 * 24 * 60 * 60 * 1000)).toISOString().substring(0, 10))
  const [notBooked, setNotBooked] = useState(true)
  const [errors, setErrors] = useState([]);

  const user = useSelector(state => state.session.user);
  const currSpot = useSelector((state) => state.spot.list[id]);
  const spots = useSelector((state) => state.spot.list);
  const bookings = useSelector((state) => state.booking)
  const bookingsList = Object.values(bookings)


  const alreadyBooked = bookingsList?.filter(el => el?.spotId === currSpot?.id && el?.userId === user?.id)

  useEffect(() => {

    dispatch(getAllBookings())

    dispatch(getSpotId(id))
      .then(data => {
        if (!data) {
          history.push('/PageNotFound')
        }
      });

    dispatch(getReviews())

  }, [dispatch]);







  const capitalizeFirstLetter = (string) => {
    return string?.charAt(0).toUpperCase() + string?.slice(1);
  }

  const dateDifference = (start, end) => {
    const startDate = new Date(start)
    const endDate = new Date(end)
    const diffTime = Math.abs(endDate - startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    await dispatch(destroySpot(currSpot.id))
    return history.push('/lairs')
  }

  const handleCancel = async (e) => {

    await dispatch(deleteSingleBooking(e.target.id));

  }

  const handleImage = (e) => {
    e.target.src = '/static/human-lair.jpg'
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const errArr = [];
    const now = Date.now();

    // if (!sessionUser) {
    //     return setErrors(['Log in to book this spot.']);
    // }

    // const checkinTime = (new Date(checkIn)).getTime();
    // const checkoutTime = (new Date(checkOut)).getTime();

    // if (checkinTime > checkoutTime || now > checkinTime) errArr.push('Enter a valid check-in and check-out times.');

    setErrors(errArr);

    if (!errArr.length) {
      const newBooking = {
        spotId: currSpot.id,
        userId: user.id,
        startDate,
        endDate
      }

      dispatch(createOneBooking(newBooking));

      // alert("Reservation Successful!")

      return history.push('/bookings')
    }



  }


  return (
    <div className='container-outer'>


      <div className='spot-details-page'>

        <div className='name-price'>

          <div>
            <div className='spot-detail-name'>{capitalizeFirstLetter(currSpot?.name)}</div>

            <div className='spot-detail-address'>{currSpot?.address} {currSpot?.city}, {currSpot?.state} {currSpot?.country}</div>

          </div>

          <div>
            <div className='spot-detail-price'>${currSpot?.price} /night</div>
          </div>
        </div>

        <div className='lair-image-container'>
          <img className='lair-image' src={currSpot?.url} onError={handleImage} />
        </div>
        {user?.id === currSpot?.userId && (
          <div className='edit-delete-lair'>
            <EditSpot user={user} spot={currSpot} />
            {/* PLACEHOLDER */}
            <button id='delete-spot-button' onClick={handleDelete}>Remove Lair</button>
            <br></br>
          </div>
        )}


        {currSpot && (
          <div className='spot-detail-outer'>

            <div className='hosted-by'>
              <div>Lair hosted by {currSpot?.User?.username}</div >
            </div>

            <div className='spot-detail-container'>

              {/* {console.log('currSpot ------> ', currSpot)}
            {console.log('my spots -------> ', spots)}
            {console.log('spotuser -------> ', currSpot.User)}
            {console.log('userid?? -------> ', user?.id)}
            {console.log('SPOT ID', currSpot.id)} */}

              {/* <div className='spot-detail-userId'> userId of post   {currSpot.userId}</div> */}

              <div className='lair-details-container'>


                <div className='spot-details-all'>

                  <div className='description-about'>About this space</div>
                  <div className='spot-detail-description'>{currSpot.description}</div>

                </div>

                {alreadyBooked.length > 0 && (

                  <div>
                    <div>You have already reserved this lair.</div>
                    <button id={alreadyBooked[0]?.id} className='cancel-booking' onClick={handleCancel}>Cancel Reservation</button>
                  </div>
                )}


                {console.log('WHAT IS THIS BOOKED ======>', alreadyBooked)}

                {!user && (
                  <div>
                    Please log-in to Book this spot.
                  </div>
                )}

                {user && alreadyBooked.length === 0 && user?.id !== currSpot.userId && (

                  <div className='booking-container'>
                    <div className='booking-form'>
                      <form onSubmit={handleSubmit}>
                        <div className='booking-form-inner'>

                          <div className='book-me'>
                            Book Me!
                          </div>

                          <div className='calendar-date'>
                            <div className='input-date'>
                              <div className='check-in-text'>CHECK-IN</div>
                              <input
                                name='startDate'
                                type='date'
                                value={startDate}
                                onChange={e => setStartDate(e.target.value)}
                                min={new Date().toISOString().substring(0, 10)}
                                required
                              ></input>
                            </div>
                            <div className='input-date'>
                              <div className='check-in-text'>CHECKOUT</div>
                              <input
                                name='endDate'
                                type='date'
                                value={endDate}
                                onChange={e => setEndDate(e.target.value)}
                                min={new Date(new Date().getTime() + (1 * 24 * 60 * 60 * 1000)).toISOString().substring(0, 10)}
                                required
                              ></input>
                            </div>
                          </div>

                          <div className='reserve-button-container'>

                            <button className='reserve-button'>Reserve</button>
                          </div>

                          <div className='total-cost'>
                            <div className='total-cost-inner'>

                              <div className='price-per-night'>${currSpot?.price} x {dateDifference(startDate, endDate)} nights</div>
                              <div id='total'>Total: ${currSpot?.price * dateDifference(startDate, endDate)}</div>
                            </div>

                          </div>

                        </div>

                      </form>

                    </div>
                  </div>

                )}



              </div>
              <br></br>
              <div className='add-review-container'>
                {console.log('currSpot -----> ', currSpot)}
                {user && currSpot?.userId !== user?.id && (

                  <AddReview spot={currSpot} user={user} />

                )}

              </div >



            </div>
            {showReviews && <h3>Reviews:</h3>}

            <div className='review-container'>

              {!showReviews && <h3>No Reviews</h3>}

              <Reviews setReview={setShowReviews} id={currSpot?.id} />
            </div>

          </div>

        )}

      </div>
    </div>
  )
}

export default SpotDetail;
