import React, { Component } from "react";

import { API_URL } from "./constants";

class Summary extends Component {

	render() {
		return (
			<div>
				<h1> Summary </h1>
				
				<p />
				<h4>First Name:</h4>
				<h4>Last Name:</h4>
				<h4>Email:</h4>
				<h4>Music Services Used:</h4>
			</div>
		);
	}
}

export default Summary