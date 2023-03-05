import React, {useEffect} from "react";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {useState} from "react";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import CreateSpotForm from "../Spots/CreateSpotForm";

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
			<li>
				<NavLink exact to="/">
					Home
				</NavLink>
			</li>
			{sessionUser && (
				<div>
					<NavLink exact to="/spots">
						{/* <CreateSpotForm> */}
							Create a New Spot
						{/* </CreateSpotForm> */}
					</NavLink>
				</div>
			)}
			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)}
		</ul>
	);
}

export default Navigation;
