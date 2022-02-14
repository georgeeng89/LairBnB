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
                <div className='spots-container'>

                  <div>
                  <img className='spots-image' src="http://pm1.narvii.com/6611/1d286aa9237b8ee8891c0026b3021e031049433e_00.jpg"/>
                  </div>
                  <NavLink className='nav-link' key={spot?.name} to={`/lair/${spot?.id}`}>

                    <div className='spots-inner-container'>
                      <div className='spots-info spot-image' > </div>
                      {/* <div className='spots-info' >{`Hosted by: ${spot?.User?.username}`}</div> */}
                      <div className="spots-info"> {'Name: '}{spot?.name}</div>
                      <div className="spots-info">{spot?.address && `Address: ${spot?.address}`}</div>
                      <div className="spots-info">{spot?.price && `Price: $${spot?.price}`}</div>
                    </div>

                  </NavLink>
                </div>
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
