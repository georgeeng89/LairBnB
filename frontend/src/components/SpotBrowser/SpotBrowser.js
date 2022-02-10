import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';

// import PokemonDetail from './PokemonDetail';
// import CreatePokemonForm from './CreatePokemonForm';

import Fab from './Fab';
import { getSpot } from '../../store/spot';
import './SpotBrowser.css'

const SpotBrowser = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();

  const spot = useSelector((state) => state.spot.entries);
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

          <Fab hidden={showForm} onClick={() => setShowForm(true)} />
          <div className='lairs-welcome'>
            <h2>
              Stay at a Lair
            </h2>
          </div>

          <div className='spots-container-outer' >
            {spotValue?.map((spot) => {
              return (
                <div className='spots-container'>

                  <NavLink key={spot.name} to={`/spot/${spot.id}`}>

                    {/* <div
                  className="nav-entry-image"
                  style={{ backgroundImage: `url('${pokemon.imageUrl}')` }}
                ></div> */}

                    <div className='spots-inner-container'>
                      <div className="spots-info">{'Name: '}{spot.name}</div>
                      <div className="spots-info">{spot.address && `Address: ${spot.address}`}</div>
                      <div className="spots-info">{spot.price && `Price: ${spot.price}`}</div>
                    </div>


                  </NavLink>
                </div>
              );
            })}
          </div>

        </nav>
      </div>

      {/* {showForm ? (
        <CreatePokemonForm hideForm={() => setShowForm(false)} />
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
