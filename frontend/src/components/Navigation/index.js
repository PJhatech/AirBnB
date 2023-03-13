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
		<ul className="profileButton">
			{isLoaded && (
				<>
					<div>
						<NavLink exact to="/">
							Home
						</NavLink>
					</div>
					{sessionUser ? (
						<div className="marginLeft">
							<NavLink exact to="/spots/new">
								Create New Spot
							</NavLink>
						</div>
					) : (
						[hide]
					)}
				</>
			)}
			{/* {sessionUser && (
				<div>
					<NavLink to="/spots">Create a New Spot</NavLink>
				</div>
			)} */}
			{isLoaded && (
				<div>
					<ProfileButton user={sessionUser} />
				</div>
			)}
		</ul>
	);
}

export default Navigation;
