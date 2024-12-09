import Vue from "vue";
import VueI18n from "vue-i18n";

import en from "./locales/en.json";
import de from "./locales/de.json";
import fr from "./locales/fr.json";
import es from "./locales/es.json";
import it from "./locales/it.json";
import tr from "./locales/tr.json";

Vue.use(VueI18n);

const messages = {
  en,
  de,
  fr,
  es,
  it,
  tr,
};

const i18n = new VueI18n({
  locale: "en",
  fallbackLocale: "en",
  messages,
});

export default i18n;
