import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import { Link, useHistory } from "react-router-dom";

export const Protected = () => {
	const { store, actions } = useContext(Context);
	let history = useHistory();
	const [data, setData] = useState(null);

	const dataProtected = async () => {
		// retrieve token form localStorage
		const token = localStorage.getItem("jwt-token");
		const resp = await fetch(`${process.env.BACKEND_URL}/api/protected`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token
			}
		});

		if (!resp.ok) {
			throw Error("There was a problem loading the information...");
		}
		const data = await resp.json();
		setData(data);
	};

	useEffect(() => {
		if (store.user_token === null) history.push("/login");
		else dataProtected();
	}, []);

	return (
		<div className="container text-center">
			<div className="row">
				<div className="col">
					<h1>YOUR DATA</h1>

					<div className="alert alert-dark text-center">{data ? data.email : "loading..."}</div>
				</div>
			</div>
		</div>
	);
};
