
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import EditSpot from '../EditSpot/EditSpot';


import './SpotDetails.css'

const SpotDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [showForm, setShowForm] = useState(false)

  const user = useSelector(state => state.session.user);

  const currSpot = useSelector((state) => state.spot.list[id]);

  const spots = useSelector((state) => state.spot.list)



  return (
    <div className='spot-details-page'>
      <h2>Lair Details</h2>

      {currSpot && (
        <div className='spot-detail-outer'>
          <div className='spot-detail-container'>

            {console.log('mySpot obj ------> ', currSpot)}
            {console.log('my spots -------> ', spots)}
            {console.log('spotuser -------> ', currSpot.User)}
            {console.log('userid?? -------> ', user.id)}
            {console.log('SPOT ID', currSpot.id)}

            <div className='spot-detail-userId'> userId of post   {currSpot.userId}</div>
            <div className='spot-detail-name'>name of spot: {currSpot.name}</div>
            <div className='spot-detail-address'>address {currSpot.address}</div>
            <div className='spot-detail-user'> posted by:   {currSpot?.User?.username}</div>
            <div className='spot-detail-price'>price of spot: {currSpot.price}</div>


            {user.id === currSpot.userId && (
              <>
                <EditSpot user={user} spot={currSpot}/>

                {/* {showForm && (
                  <EditSpot />
                )} */}

                <button>Delete</button>
              </>
            )}


          </div>


        </div>
      )}

    </div>
  )
}

export default SpotDetail;
