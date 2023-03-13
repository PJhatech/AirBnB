import React, {useState} from "react";
import * as sessionActions from "../../store/session";
import {useDispatch} from "react-redux";
import {useModal} from "../../context/Modal";
import "./LoginForm.css";
import { NavLink, useParams } from "react-router-dom";

function LoginFormModal() {
	const dispatch = useDispatch();
	const [credential, setCredential] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const {closeModal} = useModal();

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);
		return dispatch(sessionActions.login({credential, password}))
			.then(closeModal)
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
			});
	};

	const demoSubmit = (e) => {
		setCredential("Number1Dog");
		setPassword("password3");
		return dispatch(sessionActions.login({credential, password}));
	}


	return (
		<div className="login-container">
			<h1>Log In</h1>
			<form onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label>
					<input
						placeholder="User or Email"
						className="text-input"
						type="text"
						value={credential}
						onChange={(e) => setCredential(e.target.value)}
						required
					/>
				</label>
				<label>
					<input
						placeholder="Password"
						className="text-input"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<button className="button-class-login" type="submit">
					Log In
				</button>
				<button className="button-class-login" onClick={demoSubmit}>
					DemoUser
				</button>
			</form>
		</div>
	);
}

export default LoginFormModal;
