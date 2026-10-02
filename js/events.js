import { state } from "./state.js";
import { dom } from "./dom.js";
import { formatTime, getCalculatedSeconds, showToast } from "./utils.js";
import {
  initIdleDetector,
  initNetworkStatusListener,
  resetIdleTimer,
  startTimer,
  togglePauseTimer,
  stopTimer,
  discardSession,
  saveSession,
} from "./timer.js";
import { addMainTask, addSubtask } from "./task.js";
import { renderAll } from "./render.js";
import { getAllTasksFromDB, saveAllTasksToDB } from "./db.js";
import { getLangDict } from "./config/i18n.js";

// 7. 事件監聽綁定與非同步初始化 (initApp)
// ==========================================

if (dom.btnStart) dom.btnStart.addEventListener("click", startTimer);
if (dom.btnPause) dom.btnPause.addEventListener("click", togglePauseTimer);
if (dom.btnStop) dom.btnStop.addEventListener("click", stopTimer);

if (dom.btnDiscardSession)
  dom.btnDiscardSession.addEventListener("click", discardSession);
if (dom.btnSaveSession)
  dom.btnSaveSession.addEventListener("click", saveSession);

// 顯示/隱藏秒數 Switch 監聽
if (dom.switchShowSeconds) {
  dom.switchShowSeconds.checked = state.showSeconds;
  dom.switchShowSeconds.addEventListener("change", (e) => {
    state.showSeconds = e.target.checked;
    localStorage.setItem("setting_show_seconds", state.showSeconds);
    if (dom.timerDisplay) {
      dom.timerDisplay.textContent = formatTime(getCalculatedSeconds());
    }
  });
}

// 閒置提醒時間下拉選單監聽
if (dom.selectIdleTime) {
  dom.selectIdleTime.value = String(state.idleMinutes);
  dom.selectIdleTime.addEventListener("change", (e) => {
    state.idleMinutes = parseInt(e.target.value, 10);
    localStorage.setItem("setting_idle_minutes", state.idleMinutes);
    resetIdleTimer();
  });
}

// 計時區新增主任務
if (dom.btnAddMainTask && dom.inputNewMainTask) {
  dom.btnAddMainTask.addEventListener("click", async () => {
    if (await addMainTask(dom.inputNewMainTask.value))
      dom.inputNewMainTask.value = "";
  });
  dom.inputNewMainTask.addEventListener("keypress", async (e) => {
    if (e.key === "Enter" && (await addMainTask(dom.inputNewMainTask.value)))
      dom.inputNewMainTask.value = "";
  });
}

// 列表區新增主任務
if (dom.listBtnAddMainTask && dom.listInputNewMainTask) {
  dom.listBtnAddMainTask.addEventListener("click", async () => {
    if (await addMainTask(dom.listInputNewMainTask.value))
      dom.listInputNewMainTask.value = "";
  });
  dom.listInputNewMainTask.addEventListener("keypress", async (e) => {
    if (
      e.key === "Enter" &&
      (await addMainTask(dom.listInputNewMainTask.value))
    )
      dom.listInputNewMainTask.value = "";
  });
}

// 計時區新增子任務
if (dom.btnConfirmAddSubtask && dom.inputNewSubtaskName) {
  dom.btnConfirmAddSubtask.addEventListener("click", async () => {
    const isSuccess = await addSubtask(
      state.modalSelectedParentId,
      dom.inputNewSubtaskName.value,
    );
    if (isSuccess) {
      dom.inputNewSubtaskName.value = "";
      const modalEl = document.querySelector("#addSubTask");
      if (modalEl) {
        const modalObj = bootstrap.Modal.getInstance(modalEl);
        if (modalObj) modalObj.hide();
      }
    }
  });
}

// 列表區新增子任務
if (dom.listBtnConfirmAddSubtask && dom.listInputNewSubtaskName) {
  dom.listBtnConfirmAddSubtask.addEventListener("click", async () => {
    const isSuccess = await addSubtask(
      state.modalSelectedParentId,
      dom.listInputNewSubtaskName.value,
    );
    if (isSuccess) {
      dom.listInputNewSubtaskName.value = "";
      const modalEl = document.querySelector("#listAddSubTask");
      if (modalEl) {
        const modalObj = bootstrap.Modal.getInstance(modalEl);
        if (modalObj) modalObj.hide();
      }
    }
  });
}

// 應用程式初始化（連線 IndexedDB、閒置監聽、離線監控）
export async function initApp() {
  try {
    initIdleDetector();
    initNetworkStatusListener();

    if (getAllTasksFromDB) {
      const savedTasks = await getAllTasksFromDB();

      if (savedTasks && savedTasks.length > 0) {
        state.tasks = savedTasks;
        window.tasks = state.tasks;
      } else if (saveAllTasksToDB) {
        // 若 DB 無資料，將初始 Demo 資料寫入
        await saveAllTasksToDB(state.tasks);
      }
    }

    // 關鍵修復 1：確保同步更新 window 上的 state.tasks 參照，供 i18n 模組隨時讀取
    window.tasks = state.tasks;

    state.currentMainTaskId = state.tasks[0]?.id || null;
    const currentTask = state.tasks.find(
      (t) => t.id === state.currentMainTaskId,
    );
    state.currentSubtaskId =
      currentTask?.subtasks.find((s) => s.status !== "completed")?.id ||
      currentTask?.subtasks[0]?.id ||
      null;
    state.modalSelectedParentId = state.currentMainTaskId;
  } catch (error) {
    console.error("IndexedDB 初始化失敗：", error);

    // 取得目前語系字典
    const langDict = getLangDict();

    showToast(
      langDict?.toastInitDBFailed || "本地資料載入失敗，以暫存模式運作",
      true,
    );
  } finally {
    // 關鍵修復 3：確保 renderAll 執行時畫面能取得最新 state.tasks 繪製
    renderAll();
  }
}

// 暴露 initApp 與 state.tasks 到全域
window.tasks = state.tasks;
window.initApp = initApp;

// ==========================================
