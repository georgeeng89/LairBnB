import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

// 8. Replace import of action creator with thunk creator

// import { createSpot } from "../../store/spot";
import { editSpot } from "../../store/spot";

import "./EditSpotForm.css";

const EditSpotForm = ({ user, spot, showModal }) => {

  // console.log('MY SPOT FROM EDIT SPOT ----> ', spot)

  const sessionUser = useSelector((state) => state.session.user);
  const userId = sessionUser.id

  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState(spot.name);
  const [address, setAddress] = useState(spot.address);
  const [city, setCity] = useState(spot.city);
  const [state, setState] = useState(spot.state);
  const [country, setCountry] = useState(spot.country);
  const [price, setPrice] = useState(spot.price);
  const [description, setDescription] = useState(spot.description);
  const [url, setUrl] = useState(spot.url);

  const [errors, setErrors] = useState([]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    const newSpot = {
      id: spot.id, name, address, city, state, country, price, userId, description, url
    };

    setErrors([]);

    // 8. Dispatch the return value of the thunk creator instead (the thunk)
    dispatch(editSpot(newSpot)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });

    showModal(false)

    // history.push(`/lairs`);

    // reset();
  };

  return (
    <div className="spot-form-container">

      <div className="input-box">

        <h1>Edit Lair</h1>
        <form onSubmit={handleSubmit}>

          <ul className="errors-list">
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>

          <input type="hidden" name="userId" value={userId} />

          <span className="edit-text">

            Name
          </span>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Name"
            name="name"
            required
          />
          <span className="edit-text">

            Address
          </span>
          <input
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            placeholder="Address"
            name="address"
            required
          />
          <span className="edit-text">

            City
          </span>
          <input
            type="text"
            onChange={(e) => setCity(e.target.value)}
            value={city}
            placeholder="City"
            name="city"
            required
          />
          <span className="edit-text">

            State
          </span>
          <input
            type="text"
            onChange={(e) => setState(e.target.value)}
            value={state}
            placeholder="State"
            name="state"
            required
          />
          <span className="edit-text">

            Country
          </span>
          <input
            type="text"
            onChange={(e) => setCountry(e.target.value)}
            value={country}
            placeholder="Country"
            name="country"
            required
          />
          <span className="edit-text">

            Price
          </span>
          <input
            type="text"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            placeholder="Price"
            name="price"
            required
          />
          <span className="edit-text">

            Description
          </span>
          <input
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder="Description"
            name="decription"
            required
          />
          <span className="edit-text">

            Image URL
          </span>
          <input
            type="text"
            onChange={(e) => setUrl(e.target.value)}
            value={url}
            placeholder="Url"
            name="url"
            required
          />


          <button type="submit">Submit</button>
        </form>

      </div>


    </div>
  );
};

export default EditSpotForm;
