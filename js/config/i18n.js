// 載入語系字典檔
import { translations } from "./locales/index.js";

// 預設語系（優先讀取 localStorage，若無則預設 zh-TW）
let currentLang = localStorage.getItem("app_lang") || "zh-TW";
window.currentLang = currentLang;

// ==========================================
// 更新 <head> 中的 SEO 與 Meta 標籤
// ==========================================
function updateMetaTags(lang) {
  const seo = translations[lang]?.seo;
  if (!seo) return;

  // 1. 更新 document.title
  document.title = seo.title;

  // 2. 更新 Meta 標籤
  setMetaContent('meta[name="description"]', seo.description);
  setMetaContent('meta[name="keywords"]', seo.keywords);

  // 3. 更新 Open Graph (OG) 社群標籤
  setMetaContent('meta[property="og:title"]', seo.ogTitle);
  setMetaContent('meta[property="og:description"]', seo.ogDescription);
  setMetaContent(
    'meta[property="og:locale"]',
    lang === "zh-TW" ? "zh_TW" : lang === "ja" ? "ja_JP" : "en_US",
  );

  // 4. 更新 Twitter Card 標籤
  setMetaContent('meta[name="twitter:title"]', seo.ogTitle);
  setMetaContent('meta[name="twitter:description"]', seo.twitterDescription);

  // 5. 更新 <html> 的 lang 屬性
  document.documentElement.lang = lang;
}

// ==========================================
// 設定 Meta Tag 的 content 屬性
// ==========================================
function setMetaContent(selector, value) {
  const element = document.querySelector(selector);
  if (element && value) {
    element.setAttribute("content", value);
  }
}

// ==========================================
// 取得當前語言字典檔
// ==========================================
export function getLangDict() {
  return translations[currentLang] || translations["zh-TW"];
}

// ==========================================
// 切換語言主函式
// ==========================================
export function changeLanguage(lang, onLangChangeCallback) {
  if (!translations[lang]) return;

  currentLang = lang;
  window.currentLang = lang;
  localStorage.setItem("app_lang", lang);

  const dict = translations[lang];

  // 1. 更新 <head> SEO / Meta 標籤
  updateMetaTags(lang);

  // 2. 更新 DOM 靜態文字 (data-i18n 家族)
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (dict[key]) element.textContent = dict[key];
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.getAttribute("data-i18n-placeholder");
    if (dict[key]) element.setAttribute("placeholder", dict[key]);
  });

  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    const key = element.getAttribute("data-i18n-html");
    if (dict[key]) element.innerHTML = dict[key];
  });

  // 3. 重新渲染所有動態 UI 組件 (優先呼叫 renderAll)
  if (typeof window.renderAll === "function") {
    window.renderAll();
  } else if (typeof renderAll === "function") {
    renderAll();
  } else if (typeof window.renderTaskAccordion === "function") {
    window.renderTaskAccordion();
  }

  if (typeof onLangChangeCallback === "function") {
    onLangChangeCallback();
  }

  // 4. 同步 Dropdown 下拉選單的值
  const langSelect = document.getElementById("languageSelect");
  if (langSelect && langSelect.value !== lang) {
    langSelect.value = lang;
  }
}

window.changeLanguage = changeLanguage;
window.getLangDict = getLangDict;

// ==========================================
// 初始化監聽與執行
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  // 1. 幫 Dropdown 自動綁定 change 事件監聽器
  const langSelect = document.getElementById("languageSelect");
  if (langSelect) {
    langSelect.addEventListener("change", (e) => {
      changeLanguage(e.target.value);
    });
  }

  // 2. 執行首次載入的語系初始化
  changeLanguage(currentLang);
});
