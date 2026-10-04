// ==========================================
// 切換隱私權政策的語系：privacy.js
// ==========================================

import { translations } from "./config/locales/index.js";

document.addEventListener("DOMContentLoaded", () => {
  const currentLang = localStorage.getItem("app_lang") || "zh-TW";

  applyPrivacyLanguage(currentLang);
});

function applyPrivacyLanguage(lang) {
  const dict = translations[lang] || translations["zh-TW"];

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (dict && dict[key]) {
      element.textContent = dict[key];
    }
  });

  document.documentElement.lang = lang;
}
