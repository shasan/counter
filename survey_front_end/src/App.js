//import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import React, { Component} from 'react'; 

import Home from './Home'
import SurveyWizardFlow from './SurveyWizardFlow'

class App extends Component {
	render() {
		return (
			<Router>
				<div>
					<Switch>
						<Route exact path = '/' component={Home} />
						<Route path = '/survey' component={SurveyWizardFlow} />
					</Switch>
					<ul>
						<li><Link to={'/'}>Home</Link></li>
						<li><Link to={'/survey'}>Start the Survey</Link></li>
					</ul>
				</div>
				
			</Router>
		);
	}
}


export default App;
