import React, {useEffect} from "react";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {useState} from "react";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({isLoaded}) {
	const sessionUser = useSelector((state) => state.session.user);
	const [setUser] = useState(false);
	const [hide, setHide] = useState(true);

	useEffect(() => {
		if (sessionUser) {
			setUser(true);
		}
	}, []);

	return (
		<ul id="navigation-container">
				{isLoaded && (
					<>
						<div className="home-icon">
							<NavLink exact to="/">
								<i className="fa-brands fa-airbnb" />
								airbnb
							</NavLink>
						</div>
						{sessionUser ? (
							<div className="create-new-spot">
								<NavLink exact to="/spots/new">
									Create New Spot
								</NavLink>
							</div>
						) : (
							[hide]
						)}
					</>
				)}
				{isLoaded && (
					<div className="profile-button">
						<ProfileButton user={sessionUser} />
					</div>
				)}

		</ul>
	);
}

export default Navigation;
