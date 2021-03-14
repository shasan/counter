import React from "react";
import axios from "axios";

import { API_URL } from "./constants";

class EnterPersonalInfoForm extends React.Component {
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

  createPersonalInfo = e => {
    e.preventDefault();
    /*axios.post(API_URL, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });*/
	this.props.history.push('./preferences');
  };

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  render() {
    return (
	<div>
	  <h1>Hello</h1>
      <form onSubmit={this.createPersonalInfo}>
          <label for="first_name">What is your First Name:</label><br />
          <input
            type="text"
            name="first_name"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.first_name)}
          />
		  <p />
          <label for="last_name">What's your Last Name:</label><br />
          <input
            type="text"
            name="last_name"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.last_name)}
          />
		  <p />
          <label for="email">What is your Email?</label><br />
          <input
            type="email"
            name="email"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.email)}
          />
		  <p />
        <button>Submit</button>
      </form>
    </div>);
  }
}

export default EnterPersonalInfoForm;