// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
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
  };

  return (
    <>
  <div className="menu-container">

      <p>Welcome, {user.username}!</p>
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
