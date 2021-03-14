import React from "react";

import ItemForm from "./ItemForm";

const PersonalInfo = ({ setForm, formData, navigation }) => {
  const { first_name, last_name, email } = formData;

  const { next } = navigation;

  return (
    <div className="form">
      <ItemForm
        label="First Name"
        name="first_name"
        value={first_name}
        onChange={setForm}
      />
      <ItemForm
        label="Last Name"
        name="last_name"
        value={last_name}
        onChange={setForm}
      />
      <ItemForm
        label="Email"
        name="email"
        value={email}
        onChange={setForm}
      />
      <div>
        <button onClick={next}>Next</button>
      </div>
    </div>
  );
};

export default PersonalInfo;