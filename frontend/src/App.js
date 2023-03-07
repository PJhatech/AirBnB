import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {Switch, Route} from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotList from "./components/Spots/SpotList";
import SpotIndex from "./components/Spots/SpotIndex";
import CreateSpotForm from "./components/Spots/CreateSpotForm";

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
							{/* <Route path="/spots" component={CreateSpotForm} /> */}
							<SpotList />
						</Route>

						<Route exact path="/spots">
							<CreateSpotForm isLoaded={isLoaded} />
						</Route>

						<Route path="/spots/:id" component={SpotIndex} />

					</Switch>
				)}
			</nav>
		</>
	);
}

export default App;
