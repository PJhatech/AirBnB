import React from "react";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({isLoaded}) {
	const sessionUser = useSelector((state) => state.session.user);

	return (
		<ul>
			<li>
				<NavLink exact to="/">
					Home
				</NavLink>
			</li>
			<div>
				<NavLink exact to="/spots">
					Create a New Spot
				</NavLink>
			</div>
			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)}
		</ul>
	);
}

export default Navigation;
