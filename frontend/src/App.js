import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {Switch, Route} from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotList from "./components/Spots/SpotList";
import SpotIndex from "./components/Spots/SpotIndex";
import CreateSpotForm from "./components/Spots/CreateSpotForm";
import CurrentUser from "./components/CurrentUser";
import UpdateSpot from "./components/Spots/UpdateSpot";
import DeleteSpot from "./components/Spots/DeleteSpot";

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
							<CurrentUser />
						</Route>
						<Route exact path="/spots/new" component={CreateSpotForm} />
						<Route  path="/spots/:spotId/edit" component={UpdateSpot} />
						<Route path="/spots/:id" component={SpotIndex} />
						{/* <Route path=" /spots/:spotId/delete" component={DeleteSpot}/> */}

							{/* <SpotIndex */}
							{/* // <CreateSpotForm /> */}
						{/* </Route> */}

					</Switch>
				)}
			</nav>
		</>
	);
}

export default App;
