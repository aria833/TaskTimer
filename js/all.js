// ==========================================
// ：.js
// ==========================================

// TaskTimer - JavaScript entry point
// 所有功能模組由此統一載入。
import "./theme.js";
import "./config/i18n.js";
import "./data.js";
import { renderAll } from "./render.js";
import { initApp } from "./events.js";

// 提供給既有 HTML inline handler / i18n 模組使用。
window.renderAll = renderAll;
window.initApp = initApp;

// 等 DOM 載入完成後初始化 IndexedDB 與畫面。
document.addEventListener("DOMContentLoaded", () => {
  initApp();
});
