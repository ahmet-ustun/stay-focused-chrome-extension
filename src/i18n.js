import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

const messages = {
  en: {
    message: { blockByWebsite: "Block by Website" },
  },
  fr: {
    message: { blockByWebsite: "Bloquer par site Web" },
  },
};

const i18n = new VueI18n({
  locale: "en",
  fallbackLocale: "en",
  messages,
});

export default i18n;
