// ==========================================
// 通用工具函式 (Format, Validation 等)：utils.js
// ==========================================

import { state } from "./state.js";
import { dom } from "./dom.js";

// 工具函式與時間計算
export function showToast(message, isDanger = false) {
  if (!dom.actionToast || !dom.toastMessage) return;
  dom.toastMessage.textContent = message;

  if (isDanger) {
    dom.actionToastElement.classList.replace("bg-dark", "bg-danger");
    dom.actionToastElement.classList.replace("bg-success", "bg-danger");
  } else {
    dom.actionToastElement.classList.replace("bg-dark", "bg-success");
    dom.actionToastElement.classList.replace("bg-danger", "bg-success");
  }

  dom.actionToast.show();
}

// 格式化時間顯示
export function formatTime(totalSeconds, forceShowSeconds = false) {
  const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");

  if (state.showSeconds || forceShowSeconds) {
    const secs = String(totalSeconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  }

  return `${hrs}:${mins}`;
}

export function getCalculatedSeconds() {
  if (!state.isRunning) return Math.floor(state.elapsedTime / 1000);
  const currentSessionMs = Date.now() - state.startTime;
  return Math.floor((state.elapsedTime + currentSessionMs) / 1000);
}

export function getMainTaskStatus(task) {
  if (!task.subtasks || task.subtasks.length === 0) return "not_started";
  const allCompleted = task.subtasks.every((s) => s.status === "completed");
  if (allCompleted) return "completed";
  const hasStarted = task.subtasks.some((s) => s.status !== "not_started");
  if (hasStarted) return "in_progress";
  return "not_started";
}

export function getSubtaskTotalMinutes(subtask) {
  if (!subtask.records || subtask.records.length === 0) return 0;
  return subtask.records.reduce(
    (acc, rec) => acc + (rec.durationMinutes || 0),
    0,
  );
}

export function getMainTaskTotalMinutes(task) {
  if (!task.subtasks || task.subtasks.length === 0) return 0;
  return task.subtasks.reduce(
    (acc, sub) => acc + getSubtaskTotalMinutes(sub),
    0,
  );
}

export function formatMinutesToReadableText(totalMinutes) {
  const lang = localStorage.getItem("app_lang") || "zh-TW";

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

export function calculateTaskProgress(task) {
  if (!task.subtasks || task.subtasks.length === 0) return 0;
  const completedCount = task.subtasks.filter(
    (s) => s.status === "completed",
  ).length;
  return Math.round((completedCount / task.subtasks.length) * 100);
}

export function updateTimerButtonState() {
  if (!dom.btnStart) return;

  const currentTask = state.tasks.find((t) => t.id === state.currentMainTaskId);
  const currentSub = currentTask?.subtasks.find(
    (s) => s.id === state.currentSubtaskId,
  );

  if (!currentSub || currentSub.status === "completed") {
    dom.btnStart.disabled = true;
    dom.btnStart.classList.add("disabled");
  } else {
    dom.btnStart.disabled = false;
    dom.btnStart.classList.remove("disabled");
  }
}

// 下載檔案的檔名命名
export function getFileTimestamp() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}_${hours}${minutes}`;
}
