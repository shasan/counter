import React, { useEffect, useState } from "react";

import axios from "axios";

import { API_URL } from "./constants";

const Review = ({ setForm, formData, navigation }) => {
  const {
    first_name,
    last_name,
    email,
	spotify_customer,
	google_music_customer,
	pandora_customer,
	other_customer
  } = formData;
  const [preferences, setPreferences] = useState({name: 'prefs', value: ''});
  const [stats, setStats] = useState({name: 'stats', value: ''});
  const { go } = navigation;

  useEffect(() => {
	//First, let's submit our form data cause that needs to be persisted
	axios.post(API_URL, formData).then(() => {
      console.log("Successfully posted results to backend");
    });
	
	//Second, make the checkbox data a bit easier to readyState
	//put all the preferences which were "True" into an array
	const providers = []
	if (spotify_customer) {
		providers.push("Spotify");
	}
	if (google_music_customer) {
		providers.push("Google Music");
	}
	if (pandora_customer) {
		providers.push("Pandora");
	}
	if (other_customer) {
		providers.push("Other");
	}
	//comma seperate them
	const preferred_providers = providers.join();
	//plug that into prefs
	setPreferences({name:'prefs',value:preferred_providers});
	
	//finally, let's get our overall stats
	axios.get(API_URL + "stats/").then(resp => {
		var outputString = `Google: ${resp.data.google} Spotify: ${resp.data.spotify} Pandora: ${resp.data.pandora} Other: ${resp.data.other}`;
		setStats({name:'stats',value:outputString});
	});
  },[]);
  

  return (
    <div className="form">
      <h3>Review your data</h3>
      <div>
        {" "}
        First name: {`${first_name}`}
        <br />
        Last Name: {`${last_name}`}
		<br />
		E-mail: {`${email}`}
		<br />
		Music Providers: {preferences.value} 
      </div>
	  <div>
	  {stats.value}
	  </div>
      <div>
        <button onClick={() => go("submit")}>Single Line CSV</button>
		<button onClick={() => go("submit")}>Multi Line CSV</button>
	  </div>
    </div>
  );
};

export default Review;