//import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import React, { Component} from 'react'; 

import Home from './Home'
import EnterInfo from './EnterPersonalInfoForm'
import Preferences from './Preferences'
import Summary from './Summary'
import Stats from './Stats'

class App extends Component {
	render() {
		return (
			<Router>
				<div>
					<Switch>
						<Route exact path = '/' component={Home} />
						<Route path = '/enter' component={EnterInfo} />
						<Route path = '/preferences' component={Preferences} />
						<Route path = '/summary' component={Summary} />
						<Route path = '/stats' component={Stats} />
					</Switch>
					<ul>
						<li><Link to={'/'}>Home</Link></li>
						<li><Link to={'/enter'}>Start the Survey</Link></li>
						<li><Link to={'/stats'}>Stats</Link></li>
					</ul>
				</div>
				
			</Router>
		);
	}
}


export default App;
