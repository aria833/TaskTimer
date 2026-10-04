// ==========================================
// ：.js
// ==========================================

// 1. 優先讀取偏好並套用至 <html>，防止畫面白光閃爍
const savedTheme = localStorage.getItem("app_theme");
const systemPrefersDark = window.matchMedia(
  "(prefers-color-scheme: dark)",
).matches;
let currentTheme = savedTheme || (systemPrefersDark ? "dark" : "light");

document.documentElement.setAttribute("data-bs-theme", currentTheme);

// 2. 套用主題與同步 Switch 開關狀態
function applyTheme(theme) {
  currentTheme = theme;
  localStorage.setItem("app_theme", theme);
  document.documentElement.setAttribute("data-bs-theme", theme);

  // 同步 Switch 切換按鈕的勾選狀態 (暗色為 checked)
  const toggleInput = document.getElementById("darkModeToggle");
  if (toggleInput) {
    toggleInput.checked = theme === "dark";
  }
}

// 3. 暴露全域切換函式給 HTML onchange 觸發
window.toggleDarkMode = function (isDark) {
  applyTheme(isDark ? "dark" : "light");
};

// 4. DOM 載入後確認 Switch 按鈕開關位置正確
document.addEventListener("DOMContentLoaded", () => {
  applyTheme(currentTheme);
});
