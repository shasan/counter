import React from "react";

import ItemForm from "./ItemForm";

const MusicPreferences = ({ setForm, formData, navigation }) => {
  const { spotify_customer, google_music_customer, pandora_customer, other_customer } = formData;

  const { next } = navigation;

  return (
      <div className="form">
		  <ItemForm
			label="Spotify"
			name="spotify_customer"
			value={spotify_customer}
			type="checkbox"
			onChange={setForm}
		  />
		  <ItemForm
			label="Google"
			name="google_music_customer"
			value={google_music_customer}
			type="checkbox"
			onChange={setForm}
		  />
		  <ItemForm
			label="Pandora"
			name="pandora_customer"
			value={pandora_customer}
			type="checkbox"
			onChange={setForm}
		  />
		  <ItemForm
			label="Other"
			name="other_customer"
			value={other_customer}
			type="checkbox"
			onChange={setForm}
		  />
      <div>
        <button onClick={next}>Next</button>
      </div>
    </div>
  );
};

export default MusicPreferences;