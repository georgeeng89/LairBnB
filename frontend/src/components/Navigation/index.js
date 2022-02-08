// // frontend/src/components/Navigation/index.js
// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import ProfileButton from './ProfileButton';
// import './Navigation.css';

// function Navigation({ isLoaded }){
//   const sessionUser = useSelector(state => state.session.user);

//   let sessionLinks;
//   if (sessionUser) {
//     sessionLinks = (
//       <ProfileButton user={sessionUser} />
//     );
//   } else {
//     sessionLinks = (
//       <>
//         <NavLink to="/login">Log In</NavLink>
//         <NavLink to="/signup">Sign Up</NavLink>
//       </>
//     );
//   }

//   return (
//     <ul className='nav-bar'>
//       <li>
//         <NavLink exact to="/">Home</NavLink>
//         {isLoaded && sessionLinks}
//       </li>
//     </ul>
//   );
// }

// export default Navigation;


// frontend/src/components/Navigation/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  const dispatch = useDispatch();
  const [credential, setCredential] = useState("demo@user.io");
  const [password, setPassword] = useState("password");
  const [errors, setErrors] = useState([]);

  const demoLogin = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };



  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>

        <form className='demo-form' onSubmit={demoLogin}>
          <input type='hidden' value={credential} />
          <input type='hidden' value={password} />
          <button className='get-started'>Demo</button>
        </form>


        <LoginFormModal />
        <NavLink className='get-started' to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul className='nav-bar'>
      <li className='logo-container'>
        <NavLink exact to="/"><img className='logo' src='../../../images/lairbnb_logo.png' /></NavLink>
      </li>
      <li className='upper__right'>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
