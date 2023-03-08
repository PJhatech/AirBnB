import React, {useEffect} from "react";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {useState} from "react";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({isLoaded}) {
	const sessionUser = useSelector((state) => state.session.user);
	const [setUser] = useState(false);
	// console.log()

	useEffect(() => {
		if (sessionUser) {
			setUser(true);
		}
	}, []);

	return (
		<ul>
			{isLoaded && (
				<li>
					<NavLink exact to="/">
						Home
					</NavLink>
				</li>
			)}
			{/* {sessionUser && (
				<div>
					<NavLink to="/spots">Create a New Spot</NavLink>
				</div>
			)} */}
			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)}
		</ul>
	);
}

export default Navigation;
