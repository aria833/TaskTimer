// ==========================================
// 應用程式主要進入點：all.js
// ==========================================

import "./theme.js";
import "./config/i18n.js";
import "./data.js";
import { renderAll } from "./render.js";
import { initApp } from "./events.js";

window.renderAll = renderAll;
window.initApp = initApp;

// 等 DOM 載入完成後初始化 IndexedDB 與畫面。
document.addEventListener("DOMContentLoaded", () => {
  initApp();
});
