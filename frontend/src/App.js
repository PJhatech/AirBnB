import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {Switch, Route} from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotList from "./components/Spots/SpotList";
import SpotIndex from "./components/Spots/SpotIndex";
import CreateSpotForm from "./components/Spots/CreateSpotForm";
import CurrentUser from "./components/CurrentUser";

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
							<CurrentUser component={CreateSpotForm} />
						</Route>

						<Route exact path="/spots">
							<CreateSpotForm isLoaded={isLoaded} />
						</Route>

						<Route path="/spots/:id" component={SpotIndex} />

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
