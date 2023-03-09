import React, {useEffect, useState, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {
	spotIndexThunk,
	getUserSpots,
	deleteSpotThunk,
	updateSpotThunk,
} from "../../../store/spots";
import DeleteSpot from "../DeleteSpot/index";
import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";

const ManageSpots = () => {
	const dispatch = useDispatch();
	const ownedSpots = useSelector((state) => state.spots);
	const user = useSelector((state) => state.session);
	const userSpots = Object.values(ownedSpots);
	const [loaded, setLoaded] = useState(false);
	const [hide, setHide] = useState(true);
	const showButton = () => setHide(false);
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
		document.addEventListener("click", closeMenu);
		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu]);
	const closeMenu = () => setShowMenu(false);

	useEffect(() => {
		dispatch(getUserSpots(user)).then(() => setLoaded(true));
	}, [dispatch]);

	const handleSubmitPut = async (e) => {
		e.preventDefault();
		if (user) {
			await dispatch(updateSpotThunk(ownedSpots.id));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (user) {
			await dispatch(deleteSpotThunk(ownedSpots.id));
		}
	};

	const ulClassName = showMenu ? "" : " hidden";
	return (
		<div>
			<div>
				<h1>Manage Your Spots</h1>
				{/* <button>
						Create Spot Form
					<NavLink to="/spots">
					</NavLink>
				</button> */}
			</div>
			{loaded &&
				userSpots.map((spot) => (
					<div>
						<br />
						<img src={spot.previewImage} alt={spot.city} />
						<div>
							{spot.name}
							<br />
							{spot.city},{spot.state},{spot.country}
							{spot.price}
							<br />
							{spot.AvgRating}
						</div>
						<NavLink to={`/spots/${spot.id}/edit`}>
							<button>Update</button>
						</NavLink>
						<OpenModalMenuItem
							itemText="Delete"
							onItemClick={showMenu}
							modalComponent={<DeleteSpot prop={spot} />}
						/>
						<br />
					</div>
				))}
			<div></div>
		</div>
	);
};

export default ManageSpots;
