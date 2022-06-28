// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useHistory } from "react-router-dom";
import ListLairModal from "../ListLairModal";

import './Navigation.css';

function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());

    history.push(`/`)
  };

  return (
    <>
  <div className="menu-container">

      <div className="user-welcome">Welcome, {user.username}!</div>

      <a className="list-lair-button" href="/new">List a Lair</a>
      <ListLairModal />

      <a className="menu-button" onClick={openMenu}>
        <img className='menu' src='../../../images/menu-bars.png' />
      </a>

      <div className="menu-options">
        {showMenu && (
          <ul className="profile-dropdown">
            <li> <div className="menu-items">Username: </div>{user.username}</li>
            <li> <div className="menu-items">Email: </div>{user.email}</li>
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          </ul>
        )}
      </div>
  </div>

    </>
  );
}

export default ProfileButton;
