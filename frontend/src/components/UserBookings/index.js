import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useHistory, useParams } from 'react-router-dom';
import { deleteSingleBooking, getUserBookings } from '../../store/booking';
import { getSpot } from '../../store/spot';

import './UserBookings.css'

const UserBookings = () => {

  const sessionUser = useSelector((state) => state.session.user);
  const userId = sessionUser.id
  const dispatch = useDispatch();
  // const { id } = useParams();
  const history = useHistory()

  const spot = useSelector((state) => state.spot.list);
  const spotValue = Object.values(spot)

  const bookings = useSelector((state) => state.booking)
  const bookingsList = Object.values(bookings)
  const myList = bookingsList.filter(booking => booking.userId === userId)



  console.log('BOOKINGS ======>', bookingsList)

  bookingsList.forEach(booking => console.log('THIS IS MY BOOKING', booking.Spot))

  const [showForm, setShowForm] = useState(false);

  const handleDelete = async (e) => {
    await dispatch(deleteSingleBooking(e.target.id));
  }

  const handleImage = (e) => {
    e.target.src = '/static/human-lair.jpg'
  }

  useEffect(() => {

    dispatch(getSpot());
    dispatch(getUserBookings(userId));

  }, [dispatch]);

  if (!spot) {
    return null;
  }

  // if(userId !== parseInt(id)){
  //   history.push('/lairs')
  // }



  return (
    <>
      <div className='bookings-header'>
        My Bookings
      </div>

      {myList.length === 0 && (
        <>

          <div className='no-reservations-container'>

            <div className='no-reservations'>
              <div className='no-reservations-text'>
                You do not have any reservations at this time.
              </div>
              <br></br>
              <a className='no-reservations-text' href='lairs'>
                Check out some of our Lairs!
              </a>

            </div>

          </div>


        </>
      )}


      <div className='user-bookings-container'>
        {bookingsList.length > 0 && bookingsList?.map(booking => {
          if (sessionUser.id === booking.userId) {

            return <div key={booking?.id} className='spot-container'>
              <div>
                <div>
                  {booking?.Spot?.name}
                </div>
                <a className='booking-image' href={`lair/${booking?.Spot?.id}`}>
                  <img className='booking-image' src={booking?.Spot?.url} onError={handleImage}/>
                </a>

                <div className='booking-details'>
                  <div>
                    <div>
                      {booking?.Spot?.address}
                    </div>
                    <div>
                      Check-In: {booking?.startDate.split('T')[0]}
                    </div>
                    <div>
                      Check-Out: {booking?.endDate.split('T')[0]}
                    </div>
                  </div>
                  <div>
                    <button id={booking.id} className='cancel-booking' onClick={handleDelete}>Cancel Reservation</button>
                  </div>
                </div>
              </div>


            </div>

          }
        }


        )}



      </div>


    </>
  );
};

export default UserBookings;
