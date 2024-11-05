import Vue from "vue";
import VueI18n from "vue-i18n";

import en from "./locales/en.json";

Vue.use(VueI18n);

const messages = {
  en,
};

const i18n = new VueI18n({
  locale: "en",
  fallbackLocale: "en",
  messages,
});

export default i18n;
