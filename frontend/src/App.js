import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {Switch, Route} from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotList from "./components/Spots/SpotList/index";
import SpotIndex from "./components/Spots/index";
import CreateForm from "./components/Spots/CreateForm/index";
import ManageSpots from "./components/Spots/ManageSpots/index";
import UpdateSpot from "./components/Spots/UpdateSpot/index";

function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
	}, [dispatch]);

	return (
		<>
			<Navigation isLoaded={isLoaded} />
			<nav>
				{isLoaded && (
					<Switch>
						<Route path="/" exact>
							<h1>Home Page Route</h1>
							<SpotList />
						</Route>

						<Route exact path="/spots/current">
							<ManageSpots />
						</Route>
						<Route exact path="/spots/new" component={CreateForm} />
						<Route path="/spots/:spotId/edit" component={UpdateSpot} />
						<Route path="/spots/:id" component={SpotIndex} />
						{/* <Route path=" /spots/:spotId/delete" component={DeleteSpot}/> */}

						{/* <SpotIndex */}
						{/* // <CreateForm /> */}
						{/* </Route> */}
					</Switch>
				)}
			</nav>
		</>
	);
}

export default App;
