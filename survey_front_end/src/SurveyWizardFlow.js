import React from "react";
import { useForm, useStep } from "react-hooks-helper";

import PersonalInfo from "./PersonalInfo";
import MusicPreferences from "./MusicPreferences";
import Review from "./Review";

const steps = [
  { id: "personalInfo" },
  { id: "music_preferences" },
  { id: "review" },
];

const defaultData = {
  first_name: "Salman",
  last_name: "Hasan",
  email: "email@domain.com",
  spotify_customer: false
};

const SurveyWizardFlow = ({ images }) => {
  const [formData, setForm] = useForm(defaultData);
  const { step, navigation } = useStep({ initialStep: 0, steps });
  const { id } = step;

  const props = { formData, setForm, navigation };

  switch (id) {
    case "personalInfo":
      return <PersonalInfo {...props} />;
    case "music_preferences":
      return <MusicPreferences {...props} />;
    case "review":
      return <Review {...props} />;
    default:
      return null;
  }
};

export default SurveyWizardFlow;