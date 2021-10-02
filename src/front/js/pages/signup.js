import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
//import "../../styles/home.scss";

export const Signup = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPass, setConfirmPass] = useState("");

	async function signUp() {
		if (password !== confirmPass) {
			alert("Las constraseñas no coinciden");
			return;
		}

		const response = await fetch("https://3001-white-mole-jlle2h9g.ws-eu18.gitpod.io/api/sign-up", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		});

		const responseJson = response.json();
		console.log(responseJson);
		if (responseJson.access_token) {
			localStorage.setItem("accessToken", responseJson.accessToken);
		}
	}

	return (
		<div className="text-center mt-5">
			<div className="container">
				<h1>SIGN UP</h1>
				<form onSubmit={signUp}>
					<input type="email" placeholder="email" onChange={event => setEmail(event.target.value)} required />
					<input
						type="password"
						placeholder="password"
						onChange={event => setPassword(event.target.value)}
						required
					/>
					<input
						type="password"
						placeholder="password confirmation"
						onChange={event => setConfirmPass(event.target.value)}
					/>

					<input type="submit" value="Sign up" required />
				</form>
			</div>
		</div>
	);
};
