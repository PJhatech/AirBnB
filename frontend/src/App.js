import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {Switch, Route} from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import GetSpots from "./components/Spots";




function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
	}, [dispatch]);


	return (
		<>
			<Navigation isLoaded={isLoaded} />
			<GetSpots />
			<nav>
				{isLoaded && <Switch>
					<Route path='/' exact>
						<h1>Home Page Route</h1>
					</Route>

					<Route path='/spots'>
						<h1>Spots Route path</h1>
					</Route>

					<Route exact path='/spots/:id'>
						<h1>Spots Route path</h1>
					</Route>
				</Switch>}
				</nav>
		</>
	);
}

export default App;
