import React from "react";
import ReactDOM from "react-dom";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

import "./index.scss";

import App from "./App";
import { AuthProvider } from "./contexts/authContext";
import trans_am from "./translations/am/common.json";
import trans_en from "./translations/en/common.json";
import trans_ru from "./translations/ru/common.json";

i18next.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: "en",
  resources: {
    en: {
      common: trans_en,
    },
    ru: {
      common: trans_ru,
    },
    am: {
      common: trans_am,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
