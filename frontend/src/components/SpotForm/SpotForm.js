import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// 8. Replace import of action creator with thunk creator
// import { addArticle } from "../../store/articleReducer";
import { createSpot } from "../../store/spot";

import "./SpotForm.css";

const SpotForm = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState([]);


  const reset = () => {
    setName("");
    setAddress("");
    setCity("");
    setState("");
    setCountry("");
    setPrice("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSpot = { name, address, city, state, country, price, userId };

    setErrors([]);

    // 8. Dispatch the return value of the thunk creator instead (the thunk)
    dispatch(createSpot(newSpot)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
    reset();
  };

  const sessionUser = useSelector((state) => state.session.user);
  const userId = sessionUser.id

  return (
    <div className="input-box">
      <h1>Post a Spot</h1>
      <form onSubmit={handleSubmit}>

      <ul className="errors-list">
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>

      <input type="hidden" name="userId" value={userId} />
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Name"
          name="name"
          required
        />

        <input
          type="text"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          placeholder="Address"
          name="address"
          required
        />

        <input
          type="text"
          onChange={(e) => setCity(e.target.value)}
          value={city}
          placeholder="City"
          name="city"
          required
        />

        <input
          type="text"
          onChange={(e) => setState(e.target.value)}
          value={state}
          placeholder="State"
          name="state"
          required
        />

        <input
          type="text"
          onChange={(e) => setCountry(e.target.value)}
          value={country}
          placeholder="Country"
          name="country"
          required
        />

        <input
          type="text"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          placeholder="Price"
          name="price"
          required
        />


        {/* <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          name="body"
          placeholder="Add your entry"
          rows="10"
        ></textarea> */}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SpotForm;
