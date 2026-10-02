// ==========================================
// 1. 全域 State 與 DOM 元素選取
// ==========================================

// all.js 頂部或資料宣告處
let tasks = [];

// 關鍵修復：將 tasks 物件的存取權交給 window
window.tasks = tasks;

let selectedMainTaskId = null; // 當前選擇的主任務 ID
let selectedSubtaskId = null; // 當前選擇的子任務 ID

//任務狀態
const STATUS_MAP = {
  not_started: {
    key: "statusNotStarted",
    class: "bg-secondary-subtle text-secondary",
    defaultText: "未開始",
  },
  in_progress: {
    key: "statusInProgress",
    class: "bg-primary-subtle text-primary",
    defaultText: "進行中",
  },
  completed: {
    key: "statusCompleted",
    class: "bg-success-subtle text-success",
    defaultText: "已完成",
  },
};

const STATUS_ORDER = {
  in_progress: 1,
  not_started: 2,
  completed: 3,
};

let currentMainTaskId = null;
let currentSubtaskId = null;
let modalSelectedParentId = null;

let timerInterval = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let currentSessionSeconds = 0;

// --- 設定項與閒置機制 State ---
let showSeconds = localStorage.getItem("setting_show_seconds") !== "false"; // 預設 true
let idleMinutes = parseInt(
  localStorage.getItem("setting_idle_minutes") || "45",
  10,
); // 預設 45 分鐘
let idleTimer = null;

// --- DOM 元素選取 ---
const timerDisplay = document.querySelector("#timer-display");
const btnStart = document.querySelector("#btn-start");
const btnGroupActive = document.querySelector("#btn-group-active");
const btnPause = document.querySelector("#btn-pause");
const btnStop = document.querySelector("#btn-stop");
const mainNoteInput = document.querySelector("#task-note");
const currentMainTaskNameEl = document.querySelector("#current-main-task-name");
const currentSubtaskNameEl = document.querySelector("#current-subtask-name");

// 計時器下方的控制設定 DOM
const switchShowSeconds = document.querySelector("#switch-show-seconds");
const selectIdleTime = document.querySelector("#select-idle-time");
const offlineBadge = document.querySelector("#offline-badge");

// 下拉選單 DOM
const dropdownMainTaskBtn = document.querySelector("#dropdown-main-task-btn");
const dropdownMainTaskMenu = document.querySelector("#dropdown-main-task-menu");
const dropdownSubtaskBtn = document.querySelector("#dropdown-subtask-btn");
const dropdownSubtaskMenu = document.querySelector("#dropdown-subtask-menu");

// 計時區管理主任務 DOM
const inputNewMainTask = document.querySelector("#input-new-main-task");
const btnAddMainTask = document.querySelector("#btn-add-main-task");
const manageMainTaskList = document.querySelector("#manage-main-task-list");

// 計時區新增子任務 Modal DOM
const modalSubtaskParentBtn = document.querySelector(
  "#modal-subtask-parent-btn",
);
const modalSubtaskParentMenu = document.querySelector(
  "#modal-subtask-parent-menu",
);
const inputNewSubtaskName = document.querySelector("#input-new-subtask-name");
const btnConfirmAddSubtask = document.querySelector("#btn-confirm-add-subtask");

// 列表區管理主任務 Modal DOM
const listInputNewMainTask = document.querySelector(
  "#list-input-new-main-task",
);
const listBtnAddMainTask = document.querySelector("#list-btn-add-main-task");
const listManageMainTaskList = document.querySelector(
  "#list-manage-main-task-list",
);

// 列表區新增子任務 Modal DOM
const listModalSubtaskParentBtn = document.querySelector(
  "#list-modal-subtask-parent-btn",
);
const listModalSubtaskParentMenu = document.querySelector(
  "#list-modal-subtask-parent-menu",
);
const listInputNewSubtaskName = document.querySelector(
  "#list-input-new-subtask-name",
);
const listBtnConfirmAddSubtask = document.querySelector(
  "#list-btn-confirm-add-subtask",
);

// Modal & Toast DOM
const saveTimerModalElement = document.querySelector("#saveTimerModal");
const saveTimerModal = saveTimerModalElement
  ? new bootstrap.Modal(saveTimerModalElement)
  : null;
const modalFocusTime = document.querySelector("#modal-focus-time");
const modalNote = document.querySelector("#modal-note");
const modalIsCompleted = document.querySelector("#modal-is-completed");
const btnDiscardSession = document.querySelector("#btn-discard-session");
const btnSaveSession = document.querySelector("#btn-save-session");

const actionToastElement = document.querySelector("#actionToast");
const actionToast = actionToastElement
  ? new bootstrap.Toast(actionToastElement, { delay: 3000 })
  : null;
const toastMessage = document.querySelector("#toast-message");

// ==========================================
// 2. 工具函式與時間計算
// ==========================================

function showToast(message, isDanger = false) {
  if (!actionToast || !toastMessage) return;
  toastMessage.textContent = message;

  if (isDanger) {
    actionToastElement.classList.replace("bg-dark", "bg-danger");
    actionToastElement.classList.replace("bg-success", "bg-danger");
  } else {
    actionToastElement.classList.replace("bg-dark", "bg-success");
    actionToastElement.classList.replace("bg-danger", "bg-success");
  }

  actionToast.show();
}

/**
 * 格式化時間顯示
 * @param {number} totalSeconds
 * @returns {string} 00:00:00 (開啟秒數) 或 00:00 (關閉秒數)
 */
function formatTime(totalSeconds) {
  const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");

  if (showSeconds) {
    const secs = String(totalSeconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  }

  return `${hrs}:${mins}`;
}

function getCalculatedSeconds() {
  if (!isRunning) return Math.floor(elapsedTime / 1000);
  const currentSessionMs = Date.now() - startTime;
  return Math.floor((elapsedTime + currentSessionMs) / 1000);
}

function getMainTaskStatus(task) {
  if (!task.subtasks || task.subtasks.length === 0) return "not_started";
  const allCompleted = task.subtasks.every((s) => s.status === "completed");
  if (allCompleted) return "completed";
  const hasStarted = task.subtasks.some((s) => s.status !== "not_started");
  if (hasStarted) return "in_progress";
  return "not_started";
}

function getSubtaskTotalMinutes(subtask) {
  if (!subtask.records || subtask.records.length === 0) return 0;
  return subtask.records.reduce(
    (acc, rec) => acc + (rec.durationMinutes || 0),
    0,
  );
}

function getMainTaskTotalMinutes(task) {
  if (!task.subtasks || task.subtasks.length === 0) return 0;
  return task.subtasks.reduce(
    (acc, sub) => acc + getSubtaskTotalMinutes(sub),
    0,
  );
}

function formatMinutesToReadableText(totalMinutes) {
  // 1. 優先從 localStorage 或 window 讀取最新語系設定
  const lang =
    window.currentLang || localStorage.getItem("app_lang") || "zh-TW";

  // 2. 也可以嘗試從字典檔反推（若 getLangDict 有回傳）
  const langDict =
    typeof window.getLangDict === "function" ? window.getLangDict() : null;

  const minutes = Math.max(0, parseInt(totalMinutes, 10) || 0);

  if (minutes === 0) {
    if (lang === "en") return "0m";
    if (lang === "ja") return "0分";
    return "0 分鐘";
  }

  const hours = Math.floor(minutes / 60);
  const remainMins = minutes % 60;

  if (hours > 0) {
    if (lang === "en") return `${hours}h ${remainMins}m`;
    if (lang === "ja") return `${hours}時間 ${remainMins}分`;
    return `${hours} 小時 ${remainMins} 分鐘`;
  }

  if (lang === "en") return `${remainMins}m`;
  if (lang === "ja") return `${remainMins}分`;
  return `${remainMins} 分鐘`;
}

function calculateTaskProgress(task) {
  if (!task.subtasks || task.subtasks.length === 0) return 0;
  const completedCount = task.subtasks.filter(
    (s) => s.status === "completed",
  ).length;
  return Math.round((completedCount / task.subtasks.length) * 100);
}

function updateTimerButtonState() {
  if (!btnStart) return;

  const currentTask = tasks.find((t) => t.id === currentMainTaskId);
  const currentSub = currentTask?.subtasks.find(
    (s) => s.id === currentSubtaskId,
  );

  if (!currentSub || currentSub.status === "completed") {
    btnStart.disabled = true;
    btnStart.classList.add("disabled");
  } else {
    btnStart.disabled = false;
    btnStart.classList.remove("disabled");
  }
}

// ==========================================
// 3. 閒置偵測與離線狀態控制
// ==========================================

function resetIdleTimer() {
  clearTimeout(idleTimer);

  // 只有在「計時進行中」時才觸發閒置倒數
  if (!isRunning) return;

  const idleMs = idleMinutes * 60 * 1000;
  idleTimer = setTimeout(() => {
    onUserIdle();
  }, idleMs);
}

function initIdleDetector() {
  const userEvents = ["mousemove", "keydown", "click", "scroll", "touchstart"];

  userEvents.forEach((evt) => {
    window.addEventListener(evt, () => resetIdleTimer(), { passive: true });
  });

  resetIdleTimer();
}

function onUserIdle() {
  // 自動暫停計時器，避免彈窗期間時間持續跳動
  if (isRunning) togglePauseTimer();

  const confirmStop = confirm(
    `⏰ 您已經閒置超過 ${idleMinutes} 分鐘囉，要幫您結束並儲存當前這筆任務計時嗎？`,
  );

  if (confirmStop) {
    stopTimer();
  } else {
    // 選擇繼續則恢復計時並重新設定倒數
    togglePauseTimer();
    resetIdleTimer();
  }
}

function initNetworkStatusListener() {
  updateNetworkStatus(navigator.onLine);

  window.addEventListener("online", () => updateNetworkStatus(true));
  window.addEventListener("offline", () => updateNetworkStatus(false));
}

function updateNetworkStatus(isOnline) {
  if (!isOnline) {
    showToast("⚠️ 目前處於離線狀態，資料將會安全存於本地 IndexedDB", true);
    if (offlineBadge) offlineBadge.classList.remove("d-none");
  } else {
    if (offlineBadge && !offlineBadge.classList.contains("d-none")) {
      showToast("🟢 已恢復網路連線");
      offlineBadge.classList.add("d-none");
    }
  }
}

// ==========================================
// 4. 計時器核心邏輯
// ==========================================

function startTimer() {
  if (isRunning) return;

  const currentTask = tasks.find((t) => t.id === currentMainTaskId);
  const currentSub = currentTask?.subtasks.find(
    (s) => s.id === currentSubtaskId,
  );
  if (!currentSub || currentSub.status === "completed") return;

  isRunning = true;
  startTime = Date.now();

  if (btnStart) btnStart.classList.add("d-none");
  if (btnGroupActive) btnGroupActive.classList.remove("d-none");

  timerInterval = setInterval(() => {
    const totalSeconds = getCalculatedSeconds();
    if (timerDisplay) timerDisplay.textContent = formatTime(totalSeconds);
  }, 200);

  // 啟動閒置監聽倒數
  resetIdleTimer();
}

function togglePauseTimer() {
  if (isRunning) {
    elapsedTime += Date.now() - startTime;
    clearInterval(timerInterval);
    clearTimeout(idleTimer); // 暫停時清除閒置倒數
    isRunning = false;

    if (btnPause) {
      btnPause.innerHTML = '<i class="bi bi-play-fill me-1"></i>繼續';
      btnPause.classList.replace("btn-warning", "btn-primary");
    }
  } else {
    isRunning = true;
    startTime = Date.now();

    if (btnPause) {
      btnPause.innerHTML = '<i class="bi bi-pause-fill me-1"></i>暫停';
      btnPause.classList.replace("btn-primary", "btn-warning");
    }

    timerInterval = setInterval(() => {
      const totalSeconds = getCalculatedSeconds();
      if (timerDisplay) timerDisplay.textContent = formatTime(totalSeconds);
    }, 200);

    // 恢復計時重置閒置倒數
    resetIdleTimer();
  }
}

function stopTimer() {
  currentSessionSeconds = getCalculatedSeconds();

  if (currentSessionSeconds < 1) {
    resetTimerUI();
    return;
  }

  clearInterval(timerInterval);
  clearTimeout(idleTimer);
  isRunning = false;

  if (modalFocusTime) {
    modalFocusTime.textContent = formatTime(currentSessionSeconds);
  }

  const currentMainNote = mainNoteInput ? mainNoteInput.value.trim() : "";
  if (modalNote) modalNote.value = currentMainNote;
  if (modalIsCompleted) modalIsCompleted.checked = false;

  if (saveTimerModal) saveTimerModal.show();
}

function discardSession() {
  if (saveTimerModal) saveTimerModal.hide();
  resetTimerUI();
  showToast("已捨棄本次計時", true);
}

async function saveSession() {
  const currentTask = tasks.find((t) => t.id === currentMainTaskId);
  const currentSub = currentTask?.subtasks.find(
    (s) => s.id === currentSubtaskId,
  );

  if (currentSub) {
    if (modalIsCompleted && modalIsCompleted.checked) {
      currentSub.status = "completed";
    } else if (currentSub.status === "not_started") {
      currentSub.status = "in_progress";
    }

    if (!currentSub.records) currentSub.records = [];
    const sessionMinutes = Math.max(1, Math.round(currentSessionSeconds / 60));
    currentSub.records.push({
      id: `rec-${Date.now()}`,
      timeRange: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      durationMinutes: sessionMinutes,
      note: modalNote ? modalNote.value.trim() : "",
    });

    if (currentSub.status === "completed") {
      const nextSub = currentTask.subtasks.find(
        (s) => s.status !== "completed",
      );
      currentSubtaskId = nextSub ? nextSub.id : null;
    }

    // 同步儲存至 IndexedDB
    if (typeof saveAllTasksToDB === "function") {
      await saveAllTasksToDB(tasks);
    }
  }

  if (saveTimerModal) saveTimerModal.hide();
  resetTimerUI();
  showToast("已成功儲存本次計時！");
  renderAll();
}

function resetTimerUI() {
  clearInterval(timerInterval);
  clearTimeout(idleTimer);
  isRunning = false;
  startTime = Date.now();
  elapsedTime = 0;
  currentSessionSeconds = 0;

  if (timerDisplay) timerDisplay.textContent = formatTime(0);
  if (btnStart) btnStart.classList.remove("d-none");
  if (btnGroupActive) btnGroupActive.classList.add("d-none");

  if (mainNoteInput) mainNoteInput.value = "";
  if (modalNote) modalNote.value = "";

  if (btnPause) {
    btnPause.innerHTML = '<i class="bi bi-pause-fill me-1"></i>暫停';
    btnPause.classList.replace("btn-primary", "btn-warning");
  }
}

// ==========================================
// 5. 主任務 & 子任務 CRUD 與狀態切換
// ==========================================

async function addMainTask(title) {
  const cleanTitle = title.trim();
  if (!cleanTitle) return false;

  // 1. 修正：透過 window.getLangDict() 取得當前語言字典
  const langDict =
    typeof window.getLangDict === "function" ? window.getLangDict() : null;
  // 確保存取全域最新的 tasks
  const currentTasks =
    window.tasks || (typeof tasks !== "undefined" ? tasks : []);

  const isDuplicate = currentTasks.some((t) => t.title === cleanTitle);
  if (isDuplicate) {
    const dupPrefix =
      langDict?.toastDuplicateTaskPrefix || "新增失敗：已存在名為「";
    const dupSuffix = langDict?.toastDuplicateTaskSuffix || "」的主任務";
    showToast(`${dupPrefix}${cleanTitle}${dupSuffix}`, true);
    return false;
  }

  const newId = `task-${Date.now()}`;
  currentTasks.push({
    id: newId,
    title: cleanTitle,
    subtasks: [],
  });

  if (!currentMainTaskId) {
    currentMainTaskId = newId;
    currentSubtaskId = null;
    modalSelectedParentId = newId;
  }

  // 同步寫入 IndexedDB
  if (typeof saveAllTasksToDB === "function") {
    await saveAllTasksToDB(currentTasks);
  }

  const addSuccessPrefix =
    langDict?.toastAddMainTaskSuccessPrefix || "已成功新增主任務「";
  const addSuccessSuffix = langDict?.toastAddMainTaskSuccessSuffix || "」";
  showToast(`${addSuccessPrefix}${cleanTitle}${addSuccessSuffix}`);

  if (typeof window.renderAll === "function") {
    window.renderAll();
  } else if (typeof renderAll === "function") {
    renderAll();
  }
  return true;
}

async function updateMainTask(taskId) {
  const currentTasks =
    window.tasks || (typeof tasks !== "undefined" ? tasks : []);
  const task = currentTasks.find((t) => t.id === taskId);
  if (!task) return;

  // 1. 修正：透過 window.getLangDict() 取得當前語言字典
  const langDict =
    typeof window.getLangDict === "function" ? window.getLangDict() : null;

  const promptTitle = langDict?.promptEditMainTask || "修改主任務名稱：";
  const newTitle = prompt(promptTitle, task.title);
  if (!newTitle) return;

  const cleanTitle = newTitle.trim();
  if (!cleanTitle || cleanTitle === task.title) return;

  const isDuplicate = currentTasks.some(
    (t) => t.id !== taskId && t.title === cleanTitle,
  );
  if (isDuplicate) {
    const dupPrefix =
      langDict?.toastDuplicateTaskPrefix || "修改失敗：已存在名為「";
    const dupSuffix = langDict?.toastDuplicateTaskSuffix || "」的主任務";
    showToast(`${dupPrefix}${cleanTitle}${dupSuffix}`, true);
    return;
  }

  task.title = cleanTitle;

  // 同步寫入 IndexedDB
  if (typeof saveAllTasksToDB === "function") {
    await saveAllTasksToDB(currentTasks);
  }

  showToast(langDict?.toastUpdateMainTaskSuccess || "主任務名稱修改成功！");

  if (typeof window.renderAll === "function") {
    window.renderAll();
  } else if (typeof renderAll === "function") {
    renderAll();
  }
}

async function deleteMainTask(taskId) {
  // 1. 確保存取全域最新的 tasks
  const currentTasks =
    window.tasks || (typeof tasks !== "undefined" ? tasks : []);
  const task = currentTasks.find((t) => t.id === taskId);
  const taskTitle = task ? task.title : "";

  // 2. 修正：透過 window.getLangDict() 取得當前語言字典
  const langDict =
    typeof window.getLangDict === "function" ? window.getLangDict() : null;

  // 3. 組合 confirm 訊息
  const confirmPrefix =
    langDict?.confirmDeleteMainTaskPrefix || "確定要刪除主任務「";
  const confirmSuffix =
    langDict?.confirmDeleteMainTaskSuffix ||
    "」嗎？\n（包含其中的所有子任務與計時紀錄，此動作無法復原）";
  const confirmMessage = `${confirmPrefix}${taskTitle}${confirmSuffix}`;

  const isConfirmed = confirm(confirmMessage);
  if (!isConfirmed) return;

  // 4. 更新任務清單（同步至 window.tasks 與本地變數）
  const updatedTasks = currentTasks.filter((t) => t.id !== taskId);
  window.tasks = updatedTasks;
  if (typeof tasks !== "undefined") tasks = updatedTasks;

  if (currentMainTaskId === taskId) {
    currentMainTaskId = updatedTasks[0]?.id || null;
    currentSubtaskId =
      updatedTasks[0]?.subtasks.find((s) => s.status !== "completed")?.id ||
      updatedTasks[0]?.subtasks[0]?.id ||
      null;
    modalSelectedParentId = currentMainTaskId;
  }

  // 同步寫入 IndexedDB
  if (typeof saveAllTasksToDB === "function") {
    await saveAllTasksToDB(updatedTasks);
  }

  const deleteToastPrefix =
    langDict?.toastDeleteMainTaskPrefix || "已刪除主任務「";
  const deleteToastSuffix = langDict?.toastDeleteMainTaskSuffix || "」";
  showToast(`${deleteToastPrefix}${taskTitle}${deleteToastSuffix}`, true);

  if (typeof window.renderAll === "function") {
    window.renderAll();
  } else if (typeof renderAll === "function") {
    renderAll();
  }
}

async function addSubtask(parentTaskId, title) {
  const cleanTitle = title.trim();
  if (!cleanTitle) return false;

  // 1. 修正：透過 window.getLangDict() 取得當前語言字典
  const langDict =
    typeof window.getLangDict === "function" ? window.getLangDict() : null;
  const currentTasks =
    window.tasks || (typeof tasks !== "undefined" ? tasks : []);

  const parentTask = currentTasks.find((t) => t.id === parentTaskId);
  if (!parentTask) return false;

  const isDuplicate = parentTask.subtasks.some((s) => s.title === cleanTitle);
  if (isDuplicate) {
    const dupPrefix = langDict?.toastDuplicateSubtaskPrefix || "新增失敗：在「";
    const dupSuffix =
      langDict?.toastDuplicateSubtaskSuffix || "」下已有重複的子任務名稱";
    showToast(`${dupPrefix}${parentTask.title}${dupSuffix}`, true);
    return false;
  }

  const newSubId = `sub-${Date.now()}`;
  parentTask.subtasks.push({
    id: newSubId,
    title: cleanTitle,
    status: "not_started",
    records: [],
  });

  if (currentMainTaskId === parentTaskId && !currentSubtaskId) {
    currentSubtaskId = newSubId;
  }

  // 同步寫入 IndexedDB
  if (typeof saveAllTasksToDB === "function") {
    await saveAllTasksToDB(currentTasks);
  }

  const addSuccessPrefix =
    langDict?.toastAddSubtaskSuccessPrefix || "已新增子任務「";
  const addSuccessSuffix = langDict?.toastAddSubtaskSuccessSuffix || "」";
  showToast(`${addSuccessPrefix}${cleanTitle}${addSuccessSuffix}`);

  if (typeof window.renderAll === "function") {
    window.renderAll();
  } else if (typeof renderAll === "function") {
    renderAll();
  }
  return true;
}

async function updateSubtask(parentTaskId, subtaskId) {
  // 1. 確保存取全域最新的 tasks
  const currentTasks =
    window.tasks || (typeof tasks !== "undefined" ? tasks : []);

  const parentTask = currentTasks.find((t) => t.id === parentTaskId);
  if (!parentTask) return;

  const subtask = parentTask.subtasks.find((s) => s.id === subtaskId);
  if (!subtask) return;

  // 2. 修正：透過 window.getLangDict() 取得當前語言字典
  const langDict =
    typeof window.getLangDict === "function" ? window.getLangDict() : null;

  const promptTitle = langDict?.promptEditSubtask || "修改子任務名稱：";
  const newTitle = prompt(promptTitle, subtask.title);
  if (!newTitle) return;

  const cleanTitle = newTitle.trim();
  if (!cleanTitle) {
    showToast(langDict?.toastSubtaskTitleEmpty || "子任務名稱不能為空！", true);
    return;
  }

  const isDuplicate = parentTask.subtasks.some(
    (s) => s.id !== subtaskId && s.title === cleanTitle,
  );
  if (isDuplicate) {
    const dupEditPrefix =
      langDict?.toastDuplicateSubtaskEditPrefix ||
      "修改失敗：已有相同的子任務「";
    const dupEditSuffix = langDict?.toastDuplicateSubtaskEditSuffix || "」";
    showToast(`${dupEditPrefix}${cleanTitle}${dupEditSuffix}`, true);
    return;
  }

  subtask.title = cleanTitle;

  // 同步寫入 IndexedDB
  if (typeof saveAllTasksToDB === "function") {
    await saveAllTasksToDB(currentTasks);
  }

  showToast(langDict?.toastUpdateSubtaskSuccess || "子任務名稱修改成功！");

  if (typeof window.renderAll === "function") {
    window.renderAll();
  } else if (typeof renderAll === "function") {
    renderAll();
  }
}

async function changeSubtaskStatus(parentTaskId, subtaskId, newStatus) {
  const parentTask = tasks.find((t) => t.id === parentTaskId);
  if (!parentTask) return;

  const sub = parentTask.subtasks.find((s) => s.id === subtaskId);
  if (!sub) return;

  if (sub.status === newStatus) return;

  sub.status = newStatus;

  if (currentSubtaskId === subtaskId && sub.status === "completed") {
    const nextSub = parentTask.subtasks.find((s) => s.status !== "completed");
    currentSubtaskId = nextSub ? nextSub.id : null;
  }

  // 同步寫入 IndexedDB
  if (typeof saveAllTasksToDB === "function") {
    await saveAllTasksToDB(tasks);
  }

  // 1. 取得多國語系字典檔
  const langDict =
    typeof translations !== "undefined" && typeof currentLang !== "undefined"
      ? translations[currentLang] || translations["zh-TW"]
      : null;

  // 狀態 Label 轉換
  let statusLabel = sub.status;
  if (sub.status === "not_started") {
    statusLabel = langDict?.statusNotStarted || "未開始";
  } else if (sub.status === "in_progress") {
    statusLabel = langDict?.statusInProgress || "進行中";
  } else if (sub.status === "completed") {
    statusLabel = langDict?.statusCompleted || "已完成";
  }

  const toastPrefix = langDict?.toastSubtaskStatusUpdatedPrefix || "「";
  const toastMid = langDict?.toastSubtaskStatusUpdatedMid || "」狀態已更新為：";
  showToast(`${toastPrefix}${sub.title}${toastMid}${statusLabel}`);
  renderAll();
}

async function deleteSubtask(parentTaskId, subtaskId) {
  // 1. 確保存取全域最新的 tasks
  const currentTasks =
    window.tasks || (typeof tasks !== "undefined" ? tasks : []);

  const parentTask = currentTasks.find((t) => t.id === parentTaskId);
  if (!parentTask) return;

  const subtask = parentTask.subtasks.find((s) => s.id === subtaskId);
  const subTitle = subtask ? subtask.title : "";

  // 2. 修正：透過 window.getLangDict() 取得當前語言字典
  const langDict =
    typeof window.getLangDict === "function" ? window.getLangDict() : null;

  const confirmPrefix =
    langDict?.confirmDeleteSubtaskPrefix || "確定要刪除子任務「";
  const confirmSuffix =
    langDict?.confirmDeleteSubtaskSuffix ||
    "」嗎？\n（包含其所有計時紀錄，此動作無法復原）";
  const isConfirmed = confirm(`${confirmPrefix}${subTitle}${confirmSuffix}`);
  if (!isConfirmed) return;

  parentTask.subtasks = parentTask.subtasks.filter((s) => s.id !== subtaskId);

  if (
    typeof currentSubtaskId !== "undefined" &&
    currentSubtaskId === subtaskId
  ) {
    const nextSub = parentTask.subtasks.find((s) => s.status !== "completed");
    currentSubtaskId = nextSub ? nextSub.id : null;
  }

  // 同步寫入 IndexedDB
  if (typeof saveAllTasksToDB === "function") {
    await saveAllTasksToDB(currentTasks);
  }

  const deletePrefix = langDict?.toastDeleteSubtaskPrefix || "已刪除子任務「";
  const deleteSuffix = langDict?.toastDeleteSubtaskSuffix || "」";
  showToast(`${deletePrefix}${subTitle}${deleteSuffix}`, true);

  if (typeof window.renderAll === "function") {
    window.renderAll();
  } else if (typeof renderAll === "function") {
    renderAll();
  }
}

async function editRecordNote(taskId, subtaskId, recordId) {
  // 1. 確保存取全域最新的 tasks
  const currentTasks =
    window.tasks || (typeof tasks !== "undefined" ? tasks : []);

  const task = currentTasks.find((t) => t.id === taskId);
  const sub = task?.subtasks.find((s) => s.id === subtaskId);
  const record = sub?.records.find((r) => r.id === recordId);

  if (!record) return;

  // 2. 修正：透過 window.getLangDict() 取得當前語言字典
  const langDict =
    typeof window.getLangDict === "function" ? window.getLangDict() : null;

  const promptTitle = langDict?.promptEditNote || "修改備註內容：";
  const newNote = prompt(promptTitle, record.note || "");
  if (newNote === null) return;

  record.note = newNote.trim();

  // 同步寫入 IndexedDB
  if (typeof saveAllTasksToDB === "function") {
    await saveAllTasksToDB(currentTasks);
  }

  showToast(langDict?.toastUpdateNoteSuccess || "備註修改成功！");

  if (typeof window.renderAll === "function") {
    window.renderAll();
  } else if (typeof renderAll === "function") {
    renderAll();
  }
}

async function deleteRecord(taskId, subtaskId, recordId) {
  // 1. 確保存取全域最新的 tasks
  const currentTasks =
    window.tasks || (typeof tasks !== "undefined" ? tasks : []);

  const task = currentTasks.find((t) => t.id === taskId);
  const sub = task?.subtasks.find((s) => s.id === subtaskId);

  if (!sub || !sub.records) return;

  // 2. 修正：透過 window.getLangDict() 取得當前語言字典
  const langDict =
    typeof window.getLangDict === "function" ? window.getLangDict() : null;

  const confirmMsg =
    langDict?.confirmDeleteRecord ||
    "確定要刪除這筆計時紀錄嗎？\n（此動作無法復原）";
  const isConfirmed = confirm(confirmMsg);
  if (!isConfirmed) return;

  sub.records = sub.records.filter((r) => r.id !== recordId);

  // 同步寫入 IndexedDB
  if (typeof saveAllTasksToDB === "function") {
    await saveAllTasksToDB(currentTasks);
  }

  showToast(langDict?.toastDeleteRecordSuccess || "已刪除計時紀錄", true);

  if (typeof window.renderAll === "function") {
    window.renderAll();
  } else if (typeof renderAll === "function") {
    renderAll();
  }
}

// ==========================================
// 將 HTML onclick/onchange 所需的函式掛載至 window 全域
// ==========================================
window.updateMainTask = updateMainTask;
window.deleteMainTask = deleteMainTask;
window.updateSubtask = updateSubtask;
window.deleteSubtask = deleteSubtask;
window.changeSubtaskStatus = changeSubtaskStatus;
window.editRecordNote = editRecordNote;
window.deleteRecord = deleteRecord;
window.selectMainTask = selectMainTask;
window.selectSubtask = selectSubtask;
window.selectModalParent = selectModalParent;

// ==========================================
// 6. UI 畫面動態渲染 (Render All)
// ==========================================

function renderAll() {
  renderCurrentTaskDisplay();
  renderManageMainTaskList();
  renderMainTaskDropdown();
  renderSubtaskDropdown();
  renderModalParentDropdown();
  renderTaskAccordion();
  updateTimerButtonState();
}

function renderCurrentTaskDisplay() {
  // 1. 取得多國語系字典檔
  const langDict =
    typeof translations !== "undefined" && typeof currentLang !== "undefined"
      ? translations[currentLang] || translations["zh-TW"]
      : null;

  const currentTask = tasks.find((t) => t.id === currentMainTaskId);
  const currentSub = currentTask?.subtasks.find(
    (s) => s.id === currentSubtaskId,
  );

  if (currentMainTaskNameEl) {
    currentMainTaskNameEl.textContent = currentTask
      ? currentTask.title
      : langDict?.noMainTaskSelected || "未選擇主任務";
  }

  if (currentSubtaskNameEl) {
    currentSubtaskNameEl.textContent = currentSub
      ? currentSub.title
      : langDict?.noSubtaskSelected || "未選擇子任務";
  }

  // 確保畫面即時顯示對應格式的時間
  if (timerDisplay) {
    timerDisplay.textContent = formatTime(getCalculatedSeconds());
  }
}

function renderManageMainTaskList() {
  // 1. 修正：透過 window.getLangDict() 取得當前語言字典
  const langDict =
    typeof window.getLangDict === "function" ? window.getLangDict() : null;

  // 確保 tasks 也是抓取全域最新的資料
  const currentTasks =
    window.tasks || (typeof tasks !== "undefined" ? tasks : []);

  const sortedTasks = currentTasks.slice().sort((a, b) => {
    const orderA = STATUS_ORDER[getMainTaskStatus(a)] || 2;
    const orderB = STATUS_ORDER[getMainTaskStatus(b)] || 2;
    return orderA - orderB;
  });

  const emptyText = langDict?.noMainTasksAvailable || "目前尚無主任務";

  const listHTML =
    sortedTasks.length === 0
      ? `<li class="p-3 text-center text-muted fs-sm">${emptyText}</li>`
      : sortedTasks
          .map((task) => {
            const statusKey = getMainTaskStatus(task);
            const statusConfig =
              STATUS_MAP[statusKey] || STATUS_MAP.not_started || {};

            // 2. 修正：活用 STATUS_MAP 中的 key 直接向 langDict 查表
            // 如果 STATUS_MAP 中有設定 key (如 "statusInProgress")，就直接向 langDict 取值
            const statusLabel =
              statusConfig.key && langDict?.[statusConfig.key]
                ? langDict[statusConfig.key]
                : statusKey === "in_progress"
                  ? langDict?.statusInProgress || "進行中"
                  : statusKey === "completed"
                    ? langDict?.statusCompleted || "已完成"
                    : langDict?.statusNotStarted || "未開始";

            return `
          <li class="p-2 border-bottom">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <span class="fw-bold me-2">${task.title}</span>
                <span class="badge ${statusConfig.class || "bg-secondary"}">${statusLabel}</span>
              </div>
              <div class="d-flex">
                <button type="button" class="btn btn-outline-secondary rounded-circle me-2 btn-sm" onclick="updateMainTask('${task.id}')">
                  <i class="bi bi-pencil"></i>
                </button>
                <button type="button" class="btn btn-outline-danger rounded-circle btn-sm" onclick="deleteMainTask('${task.id}')">
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </div>
          </li>
        `;
          })
          .join("");

  if (manageMainTaskList) manageMainTaskList.innerHTML = listHTML;
  if (listManageMainTaskList) listManageMainTaskList.innerHTML = listHTML;
}

function renderMainTaskDropdown() {
  if (!dropdownMainTaskBtn || !dropdownMainTaskMenu) return;

  // 1. 取得多國語系字典檔
  const langDict =
    typeof translations !== "undefined" && typeof currentLang !== "undefined"
      ? translations[currentLang] || translations["zh-TW"]
      : null;

  if (tasks.length === 0) {
    dropdownMainTaskBtn.disabled = true;
    const pleaseAddTaskText = langDict?.pleaseAddMainTask || "請新增主任務";
    const noMainTaskText = langDict?.noMainTasksAvailable || "尚無主任務";

    dropdownMainTaskBtn.innerHTML = `${pleaseAddTaskText} <i class="bi bi-chevron-down ms-1"></i>`;
    dropdownMainTaskMenu.innerHTML = `<li><span class="dropdown-item text-muted disabled">${noMainTaskText}</span></li>`;
    return;
  }

  dropdownMainTaskBtn.disabled = false;

  const currentTask = tasks.find((t) => t.id === currentMainTaskId);
  const pleaseSelectText = langDict?.pleaseSelectMainTask || "請選擇主任務";
  const displayTitle = currentTask ? currentTask.title : pleaseSelectText;

  dropdownMainTaskBtn.innerHTML = `
    ${displayTitle}
    <i class="bi bi-chevron-down ms-1"></i>
  `;

  const sortedTasks = tasks.slice().sort((a, b) => {
    const orderA = STATUS_ORDER[getMainTaskStatus(a)] || 2;
    const orderB = STATUS_ORDER[getMainTaskStatus(b)] || 2;
    return orderA - orderB;
  });

  dropdownMainTaskMenu.innerHTML = sortedTasks
    .map((task) => {
      const taskStatus = getMainTaskStatus(task);
      const statusBadge = STATUS_MAP[taskStatus] || {};
      const isCompleted = taskStatus === "completed";

      // 狀態 Label 多國語系轉換
      let statusLabel = langDict?.statusNotStarted || "未開始";
      if (taskStatus === "in_progress") {
        statusLabel = langDict?.statusInProgress || "進行中";
      } else if (taskStatus === "completed") {
        statusLabel = langDict?.statusCompleted || "已完成";
      }

      return `
      <li>
        <a 
          class="dropdown-item d-flex justify-content-between align-items-center ${task.id === currentMainTaskId ? "active" : ""} ${isCompleted ? "disabled opacity-50 pe-none" : ""}" 
          href="#" 
          ${isCompleted ? 'tabindex="-1" aria-disabled="true"' : `onclick="selectMainTask('${task.id}')"`}
        >
          <span>${task.title}</span>
          <span class="badge ${statusBadge.class} ms-2">${statusLabel}</span>
        </a>
      </li>
    `;
    })
    .join("");
}

function renderSubtaskDropdown() {
  if (!dropdownSubtaskBtn || !dropdownSubtaskMenu) return;

  // 1. 取得多國語系字典檔
  const langDict =
    typeof translations !== "undefined" && typeof currentLang !== "undefined"
      ? translations[currentLang] || translations["zh-TW"]
      : null;

  const currentTask = tasks.find((t) => t.id === currentMainTaskId);
  const subtasks = currentTask ? currentTask.subtasks : [];

  if (!currentTask) {
    dropdownSubtaskBtn.disabled = true;
    const selectMainFirstText =
      langDict?.pleaseSelectMainTaskFirst || "請先選擇主任務";

    dropdownSubtaskBtn.innerHTML = `${selectMainFirstText} <i class="bi bi-chevron-down ms-1"></i>`;
    dropdownSubtaskMenu.innerHTML = `<li><span class="dropdown-item text-muted disabled">${selectMainFirstText}</span></li>`;
    return;
  }

  if (subtasks.length === 0) {
    dropdownSubtaskBtn.disabled = true;
    const pleaseAddSubText = langDict?.pleaseAddSubtask || "請新增子任務";
    const noSubtaskText =
      langDict?.noSubtasksInMainTask || "此主任務尚無子任務";

    dropdownSubtaskBtn.innerHTML = `${pleaseAddSubText} <i class="bi bi-chevron-down ms-1"></i>`;
    dropdownSubtaskMenu.innerHTML = `<li><span class="dropdown-item text-muted disabled">${noSubtaskText}</span></li>`;
    return;
  }

  dropdownSubtaskBtn.disabled = false;

  const currentSub = subtasks.find((s) => s.id === currentSubtaskId);
  const pleaseSelectSubText = langDict?.pleaseSelectSubtask || "請選擇子任務";
  const displayTitle = currentSub ? currentSub.title : pleaseSelectSubText;

  dropdownSubtaskBtn.innerHTML = `
    ${displayTitle}
    <i class="bi bi-chevron-down ms-1"></i>
  `;

  const sortedSubtasks = subtasks.slice().sort((a, b) => {
    const orderA = STATUS_ORDER[a.status || "not_started"] || 2;
    const orderB = STATUS_ORDER[b.status || "not_started"] || 2;
    return orderA - orderB;
  });

  dropdownSubtaskMenu.innerHTML = sortedSubtasks
    .map((sub) => {
      const subStatus = sub.status || "not_started";
      const badge = STATUS_MAP[subStatus] || {};
      const isCompleted = subStatus === "completed";

      // 狀態 Label 多國語系轉換
      let statusLabel = langDict?.statusNotStarted || "未開始";
      if (subStatus === "in_progress") {
        statusLabel = langDict?.statusInProgress || "進行中";
      } else if (subStatus === "completed") {
        statusLabel = langDict?.statusCompleted || "已完成";
      }

      return `
      <li>
        <a 
          class="dropdown-item d-flex justify-content-between align-items-center ${sub.id === currentSubtaskId ? "active" : ""} ${isCompleted ? "disabled opacity-50 pe-none" : ""}" 
          href="#" 
          ${isCompleted ? 'tabindex="-1" aria-disabled="true"' : `onclick="selectSubtask('${sub.id}')"`}
        >
          <span>${sub.title}</span>
          <span class="badge ${badge.class} ms-2">${statusLabel}</span>
        </a>
      </li>
    `;
    })
    .join("");
}

function renderModalParentDropdown() {
  // 1. 取得多國語系字典檔
  const langDict =
    typeof translations !== "undefined" && typeof currentLang !== "undefined"
      ? translations[currentLang] || translations["zh-TW"]
      : null;

  const selectedParent =
    tasks.find((t) => t.id === modalSelectedParentId) || tasks[0];
  if (selectedParent) modalSelectedParentId = selectedParent.id;

  const selectMainTaskText = langDict?.selectMainTask || "選擇主任務";
  const displayTitle = selectedParent
    ? selectedParent.title
    : selectMainTaskText;

  const btnText = `
    ${displayTitle}
    <i class="bi bi-chevron-down ms-1"></i>
  `;

  const menuHTML = tasks
    .map(
      (task) => `
    <li>
      <a class="dropdown-item" href="#" onclick="selectModalParent('${task.id}')">
        ${task.title}
      </a>
    </li>
  `,
    )
    .join("");

  if (modalSubtaskParentBtn) modalSubtaskParentBtn.innerHTML = btnText;
  if (modalSubtaskParentMenu) modalSubtaskParentMenu.innerHTML = menuHTML;

  if (listModalSubtaskParentBtn) listModalSubtaskParentBtn.innerHTML = btnText;
  if (listModalSubtaskParentMenu)
    listModalSubtaskParentMenu.innerHTML = menuHTML;
}
function renderTaskAccordion() {
  const accordionContainer = document.querySelector("#task-accordionExample");
  if (!accordionContainer) return;

  // 1. 統一取得多國語系字典檔 (優先使用全域/模組導出的 getLangDict 函式)
  const langDict =
    typeof getLangDict === "function"
      ? getLangDict()
      : window.getLangDict
        ? window.getLangDict()
        : null;

  // 當無主任務時的空狀態渲染
  if (tasks.length === 0) {
    const emptyText =
      langDict?.noMainTaskAccordionEmpty ||
      "目前尚無主任務，點擊「管理主任務」開始新增吧！";

    accordionContainer.innerHTML = `
      <div class="text-center p-5 text-muted bg-body rounded border">
        <i class="bi bi-inbox fs-1 d-block mb-2"></i>
        ${emptyText}
      </div>
    `;
    return;
  }

  const accordionHTML = tasks
    .map((task, index) => {
      const progress = calculateTaskProgress(task);
      const totalTaskMinutes = getMainTaskTotalMinutes(task);
      const readableTotalTime = formatMinutesToReadableText(totalTaskMinutes);
      const collapseId = `task-collapse-${task.id}`;
      const headingId = `task-heading-${task.id}`;

      const subtasksHTML =
        task.subtasks.length === 0
          ? `<li class="list-group-item text-muted text-center py-3">${langDict?.noSubtasks || "尚無子任務，請點擊「新增子任務」"}</li>`
          : task.subtasks
              .map((sub) => {
                const subStatus = sub.status || "not_started";
                const subBadge = STATUS_MAP[subStatus];
                const subTotalMinutes = getSubtaskTotalMinutes(sub);
                const subReadableTime =
                  formatMinutesToReadableText(subTotalMinutes);
                const recordCollapseId = `subTaskRecord-${task.id}-${sub.id}`;

                let recordsHTML = "";
                if (!sub.records || sub.records.length === 0) {
                  const noRecText = langDict?.noRecords || "尚無計時紀錄";
                  recordsHTML = `<p class="text-muted fs-sm mb-0 p-2">${noRecText}</p>`;
                } else {
                  recordsHTML = sub.records
                    .map(
                      (rec, recIdx) => `
                      <div class="${recIdx < sub.records.length - 1 ? "mb-2 border-bottom pb-2" : ""}">
                        <div class="d-flex justify-content-between mb-1 align-items-center">
                          <p class="fw-bold mb-0 fs-sm">${recIdx + 1}. ${rec.timeRange}</p>
                          <div class="d-flex align-items-center">
                            <span class="badge rounded-pill text-bg-light me-1">${rec.durationMinutes}${langDict?.unitMinute || "分鐘"}</span>
                            <button type="button" class="btn btn-sm p-0 text-secondary me-2" title="${langDict?.editNoteTitle || "編輯備註"}" onclick="editRecordNote('${task.id}', '${sub.id}', '${rec.id}')">
                              <i class="bi bi-pencil"></i>
                            </button>
                            <button type="button" class="btn btn-sm p-0 text-danger" title="${langDict?.deleteRecordTitle || "刪除紀錄"}" onclick="deleteRecord('${task.id}', '${sub.id}', '${rec.id}')">
                              <i class="bi bi-trash"></i>
                            </button>
                          </div>
                        </div>
                        <p class="ps-3 mb-0 fs-sm text-secondary">
                          ${rec.note ? `${langDict?.labelNote || "備註"}：${rec.note}` : langDict?.noNote || "無備註"}
                        </p>
                      </div>
                    `,
                    )
                    .join("");
                }

                const statusBadgeHTML = `
  <select 
    class="form-select form-select-sm border-0 ${subBadge ? subBadge.class : "bg-secondary"} rounded-pill me-2 py-0 ps-2 pe-3 fw-bold" 
    style="width: auto; display: inline-block; cursor: pointer; font-size: 0.75rem; background-size: 8px 8px; background-position: right 0.4rem center;"
    onchange="changeSubtaskStatus('${task.id}', '${sub.id}', this.value)"
  >
    <option value="not_started" ${subStatus === "not_started" ? "selected" : ""}>
      ${langDict?.statusNotStarted || "未開始"}
    </option>
    <option value="in_progress" ${subStatus === "in_progress" ? "selected" : ""}>
      ${langDict?.statusInProgress || "進行中"}
    </option>
    <option value="completed" ${subStatus === "completed" ? "selected" : ""}>
      ${langDict?.statusCompleted || "已完成"}
    </option>
  </select>
`;
                return `
                  <li class="list-group-item d-flex align-items-start">
                    
                    <div class="d-flex justify-content-between w-100 align-items-start">
                      <div class="ms-2 w-100">
                        <div class="d-flex align-items-center mb-1">
                          <p class="fw-bold me-2 mb-0">${sub.title}</p>
                          ${statusBadgeHTML}
                        </div>

                        <div class="d-flex align-items-center mb-1">
                          <p class="me-2 mb-0 fs-sm text-secondary">${langDict?.labelTotal || "總計"}： ${subReadableTime}</p>
                          <button
                            class="btn btn-noborder p-0 fs-sm text-primary"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#${recordCollapseId}"
                            aria-expanded="false"
                            aria-controls="${recordCollapseId}"
                          >
                            ${langDict?.viewRecords || "檢視計時與備註紀錄"}
                          </button>
                        </div>
                        
                        <div class="collapse me-3 my-2" id="${recordCollapseId}">
                          <div class="card card-body bg-body">
                            <div class="d-flex justify-content-between border-bottom pb-1 mb-2">
                              <p class="fw-bold mb-0 fs-sm">
                                ${langDict?.viewRecords || "檢視計時與備註紀錄"}
                              </p>
                              <p class="mb-0 fs-sm text-muted">
                                ${(
                                  langDict?.recordCountText ||
                                  "共 {count} 筆紀錄"
                                ).replace(
                                  "{count}",
                                  sub.records ? sub.records.length : 0,
                                )}
                              </p>
                            </div>
                            ${recordsHTML}
                          </div>
                        </div>
                      </div>

                      <div class="d-flex flex-shrink-0 ms-2">
                        <button
                          type="button"
                          class="btn btn-outline-secondary me-2 btn-sm"
                          title="${langDict?.editSubtaskTitle || "編輯子任務名稱"}"
                          onclick="updateSubtask('${task.id}', '${sub.id}')"
                        >
                          <i class="bi bi-pencil"></i>
                        </button>
                        <button
                          type="button"
                          class="btn btn-outline-danger btn-sm"
                          title="${langDict?.deleteSubtaskTitle || "刪除子任務"}"
                          onclick="deleteSubtask('${task.id}', '${sub.id}')"
                        >
                          <i class="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  </li>
                `;
              })
              .join("");

      return `
        <div class="accordion-item mb-2 border rounded overflow-hidden">
          <h2 class="accordion-header" id="${headingId}">
            <button
              class="accordion-button ${index === 0 ? "" : "collapsed"} fw-bold"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#${collapseId}"
              aria-expanded="${index === 0 ? "true" : "false"}"
              aria-controls="${collapseId}"
            >
              <div class="row w-100 align-items-center pe-2">
                <div class="col-md-4">
                  <div class="d-flex justify-content-between align-items-center">
                    <p class="text-truncate me-3 mb-2 mb-md-0 fw-bold fs-6">${task.title}</p>
                    <p class="text-nowrap d-md-none d-flex fs-sm text-muted mb-0">
                      ${langDict?.labelTotal || "總計"}：${readableTotalTime}
                    </p>
                  </div>
                </div>
                <div class="col-md-8">
                  <div class="d-flex align-items-center">
                    <div class="progress me-3 w-100" style="height: 18px;">
                      <div
                        class="progress-bar ${progress === 100 ? "bg-success" : "bg-primary"}"
                        role="progressbar"
                        style="width: ${progress}%"
                        aria-valuenow="${progress}"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        ${progress}%
                      </div>
                    </div>
                    <p class="text-nowrap d-none d-md-flex fs-sm text-secondary mb-0">
                      ${langDict?.labelTotal || "總計"}：${readableTotalTime}
                    </p>
                  </div>
                </div>
              </div>
            </button>
          </h2>
          <div
            id="${collapseId}"
            class="accordion-collapse collapse ${index === 0 ? "show" : ""}"
            aria-labelledby="${headingId}"
            data-bs-parent="#task-accordionExample"
          >
            <div class="accordion-body p-0">
              <ul class="list-group list-group-flush">
                ${subtasksHTML}
              </ul>
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  accordionContainer.innerHTML = accordionHTML;
}

// 關鍵修復：將渲染函式掛載到 window，供 i18n 模組呼叫
window.renderTaskAccordion = renderTaskAccordion;

function selectMainTask(taskId) {
  currentMainTaskId = taskId;
  modalSelectedParentId = taskId;
  const task = tasks.find((t) => t.id === taskId);
  const nextSub = task?.subtasks.find((s) => s.status !== "completed");
  currentSubtaskId = nextSub ? nextSub.id : task?.subtasks[0]?.id || null;
  renderAll();
}

function selectSubtask(subId) {
  currentSubtaskId = subId;
  renderAll();
}

function selectModalParent(taskId) {
  modalSelectedParentId = taskId;
  renderModalParentDropdown();
}

// ==========================================
// 7. 事件監聽綁定與非同步初始化 (initApp)
// ==========================================

if (btnStart) btnStart.addEventListener("click", startTimer);
if (btnPause) btnPause.addEventListener("click", togglePauseTimer);
if (btnStop) btnStop.addEventListener("click", stopTimer);

if (btnDiscardSession)
  btnDiscardSession.addEventListener("click", discardSession);
if (btnSaveSession) btnSaveSession.addEventListener("click", saveSession);

// 顯示/隱藏秒數 Switch 監聽
if (switchShowSeconds) {
  switchShowSeconds.checked = showSeconds;
  switchShowSeconds.addEventListener("change", (e) => {
    showSeconds = e.target.checked;
    localStorage.setItem("setting_show_seconds", showSeconds);
    if (timerDisplay) {
      timerDisplay.textContent = formatTime(getCalculatedSeconds());
    }
  });
}

// 閒置提醒時間下拉選單監聽
if (selectIdleTime) {
  selectIdleTime.value = String(idleMinutes);
  selectIdleTime.addEventListener("change", (e) => {
    idleMinutes = parseInt(e.target.value, 10);
    localStorage.setItem("setting_idle_minutes", idleMinutes);
    resetIdleTimer();
  });
}

// 計時區新增主任務
if (btnAddMainTask && inputNewMainTask) {
  btnAddMainTask.addEventListener("click", async () => {
    if (await addMainTask(inputNewMainTask.value)) inputNewMainTask.value = "";
  });
  inputNewMainTask.addEventListener("keypress", async (e) => {
    if (e.key === "Enter" && (await addMainTask(inputNewMainTask.value)))
      inputNewMainTask.value = "";
  });
}

// 列表區新增主任務
if (listBtnAddMainTask && listInputNewMainTask) {
  listBtnAddMainTask.addEventListener("click", async () => {
    if (await addMainTask(listInputNewMainTask.value))
      listInputNewMainTask.value = "";
  });
  listInputNewMainTask.addEventListener("keypress", async (e) => {
    if (e.key === "Enter" && (await addMainTask(listInputNewMainTask.value)))
      listInputNewMainTask.value = "";
  });
}

// 計時區新增子任務
if (btnConfirmAddSubtask && inputNewSubtaskName) {
  btnConfirmAddSubtask.addEventListener("click", async () => {
    const isSuccess = await addSubtask(
      modalSelectedParentId,
      inputNewSubtaskName.value,
    );
    if (isSuccess) {
      inputNewSubtaskName.value = "";
      const modalEl = document.querySelector("#addSubTask");
      if (modalEl) {
        const modalObj = bootstrap.Modal.getInstance(modalEl);
        if (modalObj) modalObj.hide();
      }
    }
  });
}

// 列表區新增子任務
if (listBtnConfirmAddSubtask && listInputNewSubtaskName) {
  listBtnConfirmAddSubtask.addEventListener("click", async () => {
    const isSuccess = await addSubtask(
      modalSelectedParentId,
      listInputNewSubtaskName.value,
    );
    if (isSuccess) {
      listInputNewSubtaskName.value = "";
      const modalEl = document.querySelector("#listAddSubTask");
      if (modalEl) {
        const modalObj = bootstrap.Modal.getInstance(modalEl);
        if (modalObj) modalObj.hide();
      }
    }
  });
}

// 應用程式初始化（連線 IndexedDB、閒置監聽、離線監控）
async function initApp() {
  try {
    initIdleDetector();
    initNetworkStatusListener();

    if (typeof getAllTasksFromDB === "function") {
      const savedTasks = await getAllTasksFromDB();

      if (savedTasks && savedTasks.length > 0) {
        tasks = savedTasks;
      } else if (typeof saveAllTasksToDB === "function") {
        // 若 DB 無資料，將初始 Demo 資料寫入
        await saveAllTasksToDB(tasks);
      }
    }

    // 關鍵修復 1：確保同步更新 window 上的 tasks 參照，供 i18n 模組隨時讀取
    window.tasks = tasks;

    currentMainTaskId = tasks[0]?.id || null;
    const currentTask = tasks.find((t) => t.id === currentMainTaskId);
    currentSubtaskId =
      currentTask?.subtasks.find((s) => s.status !== "completed")?.id ||
      currentTask?.subtasks[0]?.id ||
      null;
    modalSelectedParentId = currentMainTaskId;
  } catch (error) {
    console.error("IndexedDB 初始化失敗：", error);

    // 關鍵修復 2：改用全域的 getLangDict() 取得字典檔
    const langDict =
      typeof getLangDict === "function"
        ? getLangDict()
        : window.getLangDict
          ? window.getLangDict()
          : null;

    showToast(
      langDict?.toastInitDBFailed || "本地資料載入失敗，以暫存模式運作",
      true,
    );
  } finally {
    // 關鍵修復 3：確保 renderAll 執行時畫面能取得最新 tasks 繪製
    renderAll();
  }
}

// 暴露 initApp 與 tasks 到全域
window.tasks = tasks;
window.initApp = initApp;

// 啟動應用程式
initApp();

// ==========================================
// TaskTimer - CSV 資料匯出功能
// ==========================================

function escapeCSVField(str) {
  if (typeof str !== "string") return str;
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function exportToCSV() {
  // 1. 修正：透過 window.getLangDict() 取得當前語言字典
  const langDict =
    typeof window.getLangDict === "function" ? window.getLangDict() : null;
  const currentTasks =
    window.tasks || (typeof tasks !== "undefined" ? tasks : []);

  if (!currentTasks || currentTasks.length === 0) {
    showToast(
      langDict?.toastNoDataToExport || "目前尚無任務資料可供匯出！",
      true,
    );
    return;
  }

  // 2. 表頭多國語系化
  const headers = [
    langDict?.csvHeaderMainTask || "主任務名稱",
    langDict?.csvHeaderSubtask || "子任務名稱",
    langDict?.csvHeaderStatus || "子任務狀態",
    langDict?.csvHeaderTimeRange || "計時時間區間",
    langDict?.csvHeaderDuration || "統計時間(分鐘)",
    langDict?.csvHeaderNote || "備註",
  ];
  const csvRows = [headers.join(",")];

  currentTasks.forEach((task) => {
    if (!task.subtasks || task.subtasks.length === 0) {
      csvRows.push(
        [
          escapeCSVField(task.title),
          escapeCSVField(langDict?.noSubtaskText || "無子任務"),
          escapeCSVField(langDict?.statusNotStarted || "未開始"),
          "-",
          0,
          "",
        ].join(","),
      );
      return;
    }

    task.subtasks.forEach((sub) => {
      // 根據狀態 Key 取得相對應的多國語系文字
      const subStatusKey = sub.status || "not_started";
      let subStatusLabel = langDict?.statusNotStarted || "未開始";

      if (subStatusKey === "in_progress") {
        subStatusLabel = langDict?.statusInProgress || "進行中";
      } else if (subStatusKey === "completed") {
        subStatusLabel = langDict?.statusCompleted || "已完成";
      }

      if (!sub.records || sub.records.length === 0) {
        csvRows.push(
          [
            escapeCSVField(task.title),
            escapeCSVField(sub.title),
            escapeCSVField(subStatusLabel),
            "-",
            0,
            "",
          ].join(","),
        );
        return;
      }

      sub.records.forEach((rec) => {
        csvRows.push(
          [
            escapeCSVField(task.title),
            escapeCSVField(sub.title),
            escapeCSVField(subStatusLabel),
            escapeCSVField(rec.timeRange || "-"),
            rec.durationMinutes || 0,
            escapeCSVField(rec.note || ""),
          ].join(","),
        );
      });
    });
  });

  const csvString = "\uFEFF" + csvRows.join("\n");
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const today = new Date().toISOString().split("T")[0];
  const downloadLink = document.createElement("a");

  const fileNamePrefix =
    langDict?.csvExportFileNamePrefix || "TaskTimer_Backup";

  downloadLink.href = url;
  downloadLink.setAttribute("download", `${fileNamePrefix}_${today}.csv`);
  document.body.appendChild(downloadLink);

  downloadLink.click();
  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(url);

  showToast(langDict?.toastExportCSVSuccess || "CSV 備份檔案下載成功！");
}

const btnExportCSV = document.querySelector("#btn-export-csv");
if (btnExportCSV) {
  btnExportCSV.addEventListener("click", exportToCSV);
}

// ==========================================
// JSON 資料匯入與匯出 (Backup & Restore)
// ==========================================

function exportDataToJSON() {
  // 1. 修正：透過 window.getLangDict() 取得當前語言字典
  const langDict =
    typeof window.getLangDict === "function" ? window.getLangDict() : null;
  const currentTasks =
    window.tasks || (typeof tasks !== "undefined" ? tasks : []);

  if (!currentTasks || currentTasks.length === 0) {
    showToast(
      langDict?.toastNoDataToBackup || "目前尚無任何任務資料可供備份！",
      true,
    );
    return;
  }

  try {
    const backupData = {
      version: "1.0.0",
      exportedAt: new Date().toISOString(),
      data: currentTasks,
    };

    const jsonString = JSON.stringify(backupData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const downloadUrl = URL.createObjectURL(blob);

    const today = new Date().toISOString().split("T")[0];
    const downloadLink = document.createElement("a");
    downloadLink.href = downloadUrl;

    const fileNamePrefix =
      langDict?.jsonExportFileNamePrefix || "TaskTimer_Backup";
    downloadLink.setAttribute("download", `${fileNamePrefix}_${today}.json`);

    document.body.appendChild(downloadLink);
    downloadLink.click();

    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(downloadUrl);

    showToast(langDict?.toastExportJSONSuccess || "JSON 備份檔案已成功下載！");
  } catch (error) {
    console.error("JSON 匯出失敗：", error);
    showToast(langDict?.toastExportFailed || "匯出失敗，請重試", true);
  }
}

function validateImportData(jsonData) {
  if (!jsonData || typeof jsonData !== "object") return false;

  const targetTasks = Array.isArray(jsonData) ? jsonData : jsonData.data;

  if (!Array.isArray(targetTasks)) return false;

  const isValidStructure = targetTasks.every(
    (task) => typeof task.id === "string" && typeof task.title === "string",
  );

  return isValidStructure ? targetTasks : null;
}

function importDataFromJSON(file) {
  if (!file) return;

  // 1. 修正：透過 window.getLangDict() 取得當前語言字典
  const langDict =
    typeof window.getLangDict === "function" ? window.getLangDict() : null;

  const reader = new FileReader();

  reader.onload = async (event) => {
    try {
      const parsedData = JSON.parse(event.target.result);
      const validatedTasks = validateImportData(parsedData);

      if (!validatedTasks) {
        showToast(
          langDict?.toastInvalidBackupFormat ||
            "無效的備份檔案格式，請確認是否為正確的 JSON 檔！",
          true,
        );
        return;
      }

      // 2. 組合 confirm 訊息（動態帶入 validatedTasks.length）
      const confirmPrefix = langDict?.confirmImportPrefix || "確定要還原";
      const confirmSuffix =
        langDict?.confirmImportSuffix ||
        "筆主任務資料嗎？\n⚠️ 注意：這將會覆蓋您目前的系統資料！";
      const confirmMessage = `${confirmPrefix} ${validatedTasks.length} ${confirmSuffix}`;

      const confirmImport = confirm(confirmMessage);

      if (!confirmImport) return;

      // 3. 更新全域任務資料
      window.tasks = validatedTasks;
      if (typeof tasks !== "undefined") tasks = validatedTasks;

      selectedMainTaskId =
        validatedTasks.length > 0 ? validatedTasks[0].id : null;
      selectedSubtaskId =
        validatedTasks.length > 0 && validatedTasks[0].subtasks?.length > 0
          ? validatedTasks[0].subtasks[0].id
          : null;

      if (typeof saveAllTasksToDB === "function") {
        await saveAllTasksToDB(validatedTasks);
      }

      if (typeof window.renderAll === "function") {
        window.renderAll();
      } else if (typeof renderAll === "function") {
        renderAll();
      }

      showToast(langDict?.toastRestoreSuccess || "資料已成功還原！");
    } catch (error) {
      console.error("JSON 解析失敗：", error);
      showToast(
        langDict?.toastParseJSONFailed ||
          "無法解析此檔案，請確認檔案格式是否正確！",
        true,
      );
    }
  };

  reader.readAsText(file);
}

// ==========================================
// 事件監聽綁定 (Event Listeners)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const btnExportJSON = document.querySelector("#btn-export-json");
  const btnImportJSON = document.querySelector("#btn-import-json");
  const inputImportFile = document.querySelector("#input-import-file");

  if (btnExportJSON) {
    btnExportJSON.addEventListener("click", exportDataToJSON);
  }

  if (btnImportJSON && inputImportFile) {
    btnImportJSON.addEventListener("click", () => {
      inputImportFile.value = "";
      inputImportFile.click();
    });

    inputImportFile.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        importDataFromJSON(file);
      }
    });
  }
});
