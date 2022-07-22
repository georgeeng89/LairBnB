import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';

import Fab from './Fab';
import { getSpot } from '../../store/spot';
import './SpotBrowser.css'

const SpotBrowser = () => {

  const dispatch = useDispatch();
  const { spotId } = useParams();

  const spot = useSelector((state) => state.spot.list);
  const spotValue = Object.values(spot)

  const [showForm, setShowForm] = useState(false);

  const handleImage = (e) => {
    e.target.src = '/static/human-lair.jpg'
  }

  useEffect(() => {

    dispatch(getSpot());

  }, []);

  if (!spot) {
    return null;
  }

  return (
    <main>
      <div className='lairs-container'>

        <nav className='lairs-nav'>

          {/* <Fab hidden={showForm} onClick={() => setShowForm(true)} /> */}
          <div className='lairs-welcome'>
            <h2>
              Stay at a Lair
            </h2>
          </div>

          <div className='spots-container-outer' >

            {spotValue?.map((spot) => {
              return (
                <NavLink className='nav-link' key={spot?.name} to={`/lair/${spot?.id}`}>
                  <div className='spots-container'>

                      <div className="spots-info"> {spot?.name}</div>
                    <div>
                      <img className='spots-image' src={spot?.url} onError={handleImage}/>
                    </div>
                    {/* <NavLink className='nav-link' key={spot?.name} to={`/lair/${spot?.id}`}> */}

                    <div className='spots-inner-container'>
                      <div className='spots-info spot-image' > </div>

                      <div className="spots-info">{spot?.address && `${spot?.address}`}</div>
                      <div className="spots-info">{spot?.price && `$${spot?.price} /night`}</div>
                      {/* <div className='spots-info' >{`Hosted by: ${spot?.User?.username}`}</div> */}

                    </div>

                  </div>
                </NavLink>
              );
            })}
          </div>
          <div>

          </div>

        </nav>
      </div>

      {/* {showForm ? (
        <CreateForm hideForm={() => setShowForm(false)} />
      ) : (

        <p>
          HELLO FROM SPOT BROWSA
        </p>
        // WILL NEED TO ADD THIS BACK IN
        // <Route path="/spot/:spotId">
        //   <SpotDetail />
        // </Route>


      )} */}

    </main>
  );
};

export default SpotBrowser;
