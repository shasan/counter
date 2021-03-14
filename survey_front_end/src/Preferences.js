import React from "react";
import axios from "axios";

import { API_URL } from "./constants";

class Preferences extends React.Component {
  state = {
    pk: 0,
    first_name: "",
	last_name: "",
    email: "",
	spotify_customer: false,
	google_music_customer: false,
	pandora_customer: false,
	other_customer:false
  };

  componentDidMount() {
    if (this.props.survey) {
      const { pk, first_name, last_name, email, spotify_customer, google_music_customer, pandora_customer, other_customer } = this.props.survey;
      this.setState({ pk, first_name, last_name, email, spotify_customer, google_music_customer, pandora_customer, other_customer });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitSurvey = e => {
    e.preventDefault();
    /*axios.post(API_URL, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });*/
	this.props.history.push('./summary');
  };

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  render() {
    return (
	<div>
	  <h1>Hello</h1>
      <form onSubmit={this.submitSurvey}>
          <input
		    id="spotify"
            type="checkbox"
            name="spotify_customer"
            onChange={this.onChange}
            value={(this.state.spotify_customer)} />
		  <label for="spotify">Spotify</label><br />
		  <input
            id="google"
			type="checkbox"
            name="google_music_customer"
            onChange={this.onChange}
            value={(this.state.google_music_customer)} />
		  <label for="google">Google</label><br />
		  <input
            id="pandora"
			type="checkbox"
            name="pandora_customer"
            onChange={this.onChange}
            value={(this.state.pandora_customer)} />
		  <label for="pandora">Pandora</label><br />
		  <input
            id="other"
			type="checkbox"
            name="other_customer"
            onChange={this.onChange}
            value={(this.state.other_customer)} />
		  <label for="other">Other</label><p />
        <button>Submit</button>
      </form>
    </div>);
  }
}

export default Preferences;