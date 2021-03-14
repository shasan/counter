import React, { Component } from "react";
import logo from './images/landscape.jpeg';


class Home extends Component {

	render() {
		return (
			<div>
				<p>Welcome to the Survey Application</p>
				<img src={logo} className="App-logo" alt="logo" />
			</div>
		);
	}
}

export default Home