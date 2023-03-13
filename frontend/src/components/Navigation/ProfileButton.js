import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { Link } from "react-router-dom";
import "./Navigation.css"

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);
  const closeMenu = () => setShowMenu(false);
  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
  };
  const ulClassName = "delete-dropdown" + (showMenu ? "" : " hidden");
  return (
		<div className="profile-button">
			<button className="pekabo" onClick={openMenu}>
				<i className="fas fa-user-circle wumbo" />
			</button>
			<ul id="dropdown-styling" className={ulClassName} ref={ulRef}>
				{user ? (
				  <div>
					  <div className="dropdown-section-1">
						{/* <li>{user.username}</li> */}
						<li>
							  {`Hello, ${user.firstName}`}
							  {/* {user.lastName} */}
						</li>
						<li>{user.email}</li>

					  </div>
					  <div className="manage-spot">
						<li>
							<Link to="/spots/current">Manage Spots</Link>
						</li>

					  </div>
						<li>
							<button className="logout-button" onClick={logout}>
								Log Out
							</button>
					  </li>
					</div>
				) : (
					<>
						<OpenModalMenuItem
							itemText="Log In"
							onItemClick={closeMenu}
							modalComponent={<LoginFormModal />}
							/>
							<br/>
						<OpenModalMenuItem
							itemText="Sign Up"
							onItemClick={closeMenu}
							modalComponent={<SignupFormModal />}
						/>
					</>
				)}
			</ul>
		</div>
  );
}
export default ProfileButton;
