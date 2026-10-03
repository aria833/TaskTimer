import { state } from "./state.js";
import { dom } from "./dom.js";
import { formatTime, getCalculatedSeconds, showToast } from "./utils.js";
import { renderAll } from "./render.js";
import { saveAllTasksToDB } from "./db.js";
import { getLangDict } from "./config/i18n.js";

// 3. 閒置偵測與離線狀態控制
// ==========================================

export function resetIdleTimer() {
  clearTimeout(state.idleTimer);

  // 只有在「計時進行中」時才觸發閒置倒數
  if (!state.isRunning) return;

  const idleMs = state.idleMinutes * 60 * 1000;
  state.idleTimer = setTimeout(() => {
    onUserIdle();
  }, idleMs);
}

export function initIdleDetector() {
  const userEvents = ["mousemove", "keydown", "click", "scroll", "touchstart"];

  userEvents.forEach((evt) => {
    window.addEventListener(evt, () => resetIdleTimer(), { passive: true });
  });

  resetIdleTimer();
}

export function onUserIdle() {
  if (state.isRunning) togglePauseTimer();

  const langDict = getLangDict();

  const confirmStop = confirm(
    langDict.confirmIdle
      ? langDict.confirmIdle(state.idleMinutes)
      : `⏰ 您已經閒置超過 ${state.idleMinutes} 分鐘囉，要幫您結束並儲存當前這筆任務計時嗎？`,
  );

  if (confirmStop) {
    stopTimer();
  } else {
    togglePauseTimer();
    resetIdleTimer();
  }
}

export function initNetworkStatusListener() {
  updateNetworkStatus(navigator.onLine);

  window.addEventListener("online", () => updateNetworkStatus(true));
  window.addEventListener("offline", () => updateNetworkStatus(false));
}

export function updateNetworkStatus(isOnline) {
  if (!isOnline) {
    showToast(
      langDict.toastOffline ||
        "⚠️ 目前處於離線狀態，資料將會安全存於本地 IndexedDB",

      true,
    );

    if (dom.offlineBadge) {
      dom.offlineBadge.classList.remove("d-none");
    }
  } else {
    if (dom.offlineBadge && !dom.offlineBadge.classList.contains("d-none")) {
      showToast(langDict.toastOnline || "🟢 已恢復網路連線");

      dom.offlineBadge.classList.add("d-none");
    }
  }
}

// ==========================================
// 4. 計時器核心邏輯
// ==========================================

export function startTimer() {
  if (state.isRunning) return;

  const currentTask = state.tasks.find((t) => t.id === state.currentMainTaskId);
  const currentSub = currentTask?.subtasks.find(
    (s) => s.id === state.currentSubtaskId,
  );
  if (!currentSub || currentSub.status === "completed") return;

  state.isRunning = true;
  state.startTime = Date.now();

  if (dom.btnStart) dom.btnStart.classList.add("d-none");
  if (dom.btnGroupActive) dom.btnGroupActive.classList.remove("d-none");

  state.timerInterval = setInterval(() => {
    const totalSeconds = getCalculatedSeconds();
    if (dom.timerDisplay)
      dom.timerDisplay.textContent = formatTime(totalSeconds);
  }, 200);

  // 啟動閒置監聽倒數
  resetIdleTimer();
}

function updatePauseButton() {
  if (!dom.btnPause) return;

  const langDict = getLangDict();

  if (state.isRunning) {
    dom.btnPause.innerHTML = `
      <i class="bi bi-pause-fill me-1"></i>
      ${langDict.pauseTimer || "暫停"}
    `;

    dom.btnPause.classList.remove("btn-primary");
    dom.btnPause.classList.add("btn-warning");
  } else {
    dom.btnPause.innerHTML = `
      <i class="bi bi-play-fill me-1"></i>
      ${langDict.continueTimer || "繼續"}
    `;

    dom.btnPause.classList.remove("btn-warning");
    dom.btnPause.classList.add("btn-primary");
  }
}

export function togglePauseTimer() {
  if (state.isRunning) {
    state.elapsedTime += Date.now() - state.startTime;

    clearInterval(state.timerInterval);
    clearTimeout(state.idleTimer);

    state.isRunning = false;
  } else {
    state.isRunning = true;
    state.startTime = Date.now();

    state.timerInterval = setInterval(() => {
      const totalSeconds = getCalculatedSeconds();

      if (dom.timerDisplay) {
        dom.timerDisplay.textContent = formatTime(totalSeconds);
      }
    }, 200);

    resetIdleTimer();
  }

  updatePauseButton();
}

export function stopTimer() {
  state.currentSessionSeconds = getCalculatedSeconds();

  if (state.currentSessionSeconds < 1) {
    resetTimerUI();
    return;
  }

  clearInterval(state.timerInterval);
  clearTimeout(state.idleTimer);
  state.isRunning = false;

  if (dom.modalFocusTime) {
    dom.modalFocusTime.textContent = formatTime(state.currentSessionSeconds);
  }

  const currentMainNote = dom.mainNoteInput
    ? dom.mainNoteInput.value.trim()
    : "";
  if (dom.modalNote) dom.modalNote.value = currentMainNote;
  if (dom.modalIsCompleted) dom.modalIsCompleted.checked = false;

  if (dom.saveTimerModal) dom.saveTimerModal.show();
}

export function discardSession() {
  if (dom.saveTimerModal) dom.saveTimerModal.hide();

  resetTimerUI();

  const langDict = getLangDict();

  showToast(
    langDict.toastDiscardSession || "已捨棄本次計時",

    true,
  );
}

export async function saveSession() {
  const currentTask = state.tasks.find((t) => t.id === state.currentMainTaskId);
  const currentSub = currentTask?.subtasks.find(
    (s) => s.id === state.currentSubtaskId,
  );

  if (currentSub) {
    if (dom.modalIsCompleted && dom.modalIsCompleted.checked) {
      currentSub.status = "completed";
    } else if (currentSub.status === "not_started") {
      currentSub.status = "in_progress";
    }

    if (!currentSub.records) currentSub.records = [];
    const sessionMinutes = Math.max(
      1,
      Math.round(state.currentSessionSeconds / 60),
    );
    currentSub.records.push({
      id: `rec-${Date.now()}`,
      timeRange: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      durationMinutes: sessionMinutes,
      note: dom.modalNote ? dom.modalNote.value.trim() : "",
    });

    if (currentSub.status === "completed") {
      const nextSub = currentTask.subtasks.find(
        (s) => s.status !== "completed",
      );
      state.currentSubtaskId = nextSub ? nextSub.id : null;
    }

    // 同步儲存至 IndexedDB
    if (saveAllTasksToDB) {
      await saveAllTasksToDB(state.tasks);
    }
  }

  if (dom.saveTimerModal) dom.saveTimerModal.hide();

  resetTimerUI();

  const langDict = getLangDict();

  showToast(langDict.toastSaveSessionSuccess || "已成功儲存本次計時！");

  renderAll();
}

export function resetTimerUI() {
  clearInterval(state.timerInterval);
  clearTimeout(state.idleTimer);
  state.isRunning = false;
  state.startTime = Date.now();
  state.elapsedTime = 0;
  state.currentSessionSeconds = 0;

  if (dom.timerDisplay) dom.timerDisplay.textContent = formatTime(0);
  if (dom.btnStart) dom.btnStart.classList.remove("d-none");
  if (dom.btnGroupActive) dom.btnGroupActive.classList.add("d-none");

  if (dom.mainNoteInput) dom.mainNoteInput.value = "";
  if (dom.modalNote) dom.modalNote.value = "";

  if (dom.btnPause) {
    const langDict = getLangDict();

    dom.btnPause.innerHTML = `
    <i class="bi bi-pause-fill me-1"></i>
    ${langDict.pauseTimer || "暫停"}
  `;

    dom.btnPause.classList.remove("btn-primary");
    dom.btnPause.classList.add("btn-warning");
  }
}

// ==========================================
// 測試閒置時用的函式
// window.testIdleTimer = () => {
// state.idleMinutes = 0.1; // 6 秒
// resetIdleTimer();
//};
