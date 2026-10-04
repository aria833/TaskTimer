// ==========================================
// 任務新增、修改與刪除邏輯：task.js
// ==========================================

import { state } from "./state.js";
import { showToast } from "./utils.js";
import {
  renderAll,
  selectMainTask,
  selectSubtask,
  selectModalParent,
} from "./render.js";
import { saveAllTasksToDB } from "./db.js";
import { getLangDict } from "./config/i18n.js";

// 主任務 & 子任務 CRUD 與狀態切換
export async function addMainTask(title) {
  const cleanTitle = title.trim();
  if (!cleanTitle) return false;

  const langDict = getLangDict();
  const currentTasks = state.tasks;

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

  if (!state.currentMainTaskId) {
    state.currentMainTaskId = newId;
    state.currentSubtaskId = null;
    state.modalSelectedParentId = newId;
  }

  if (saveAllTasksToDB) {
    await saveAllTasksToDB(currentTasks);
  }

  const addSuccessPrefix =
    langDict?.toastAddMainTaskSuccessPrefix || "已成功新增主任務「";
  const addSuccessSuffix = langDict?.toastAddMainTaskSuccessSuffix || "」";
  showToast(`${addSuccessPrefix}${cleanTitle}${addSuccessSuffix}`);

  renderAll();
  return true;
}

export async function updateMainTask(taskId) {
  const currentTasks = state.tasks;
  const task = currentTasks.find((t) => t.id === taskId);
  if (!task) return;

  const langDict = getLangDict();

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

  if (saveAllTasksToDB) {
    await saveAllTasksToDB(currentTasks);
  }

  showToast(langDict?.toastUpdateMainTaskSuccess || "主任務名稱修改成功！");

  renderAll();
}

export async function deleteMainTask(taskId) {
  const currentTasks = state.tasks;
  const task = currentTasks.find((t) => t.id === taskId);
  const taskTitle = task ? task.title : "";
  const langDict = getLangDict();

  const confirmPrefix =
    langDict?.confirmDeleteMainTaskPrefix || "確定要刪除主任務「";
  const confirmSuffix =
    langDict?.confirmDeleteMainTaskSuffix ||
    "」嗎？\n（包含其中的所有子任務與計時紀錄，此動作無法復原）";
  const confirmMessage = `${confirmPrefix}${taskTitle}${confirmSuffix}`;

  const isConfirmed = confirm(confirmMessage);
  if (!isConfirmed) return;

  const updatedTasks = currentTasks.filter((t) => t.id !== taskId);
  window.tasks = updatedTasks;
  if (typeof state.tasks !== "undefined") state.tasks = updatedTasks;

  if (state.currentMainTaskId === taskId) {
    state.currentMainTaskId = updatedTasks[0]?.id || null;
    state.currentSubtaskId =
      updatedTasks[0]?.subtasks.find((s) => s.status !== "completed")?.id ||
      updatedTasks[0]?.subtasks[0]?.id ||
      null;
    state.modalSelectedParentId = state.currentMainTaskId;
  }

  if (saveAllTasksToDB) {
    await saveAllTasksToDB(updatedTasks);
  }

  const deleteToastPrefix =
    langDict?.toastDeleteMainTaskPrefix || "已刪除主任務「";
  const deleteToastSuffix = langDict?.toastDeleteMainTaskSuffix || "」";
  showToast(`${deleteToastPrefix}${taskTitle}${deleteToastSuffix}`, true);

  renderAll();
}

export async function addSubtask(parentTaskId, title) {
  const cleanTitle = title.trim();
  if (!cleanTitle) return false;

  const langDict = getLangDict();
  const currentTasks = state.tasks;

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

  if (state.currentMainTaskId === parentTaskId && !state.currentSubtaskId) {
    state.currentSubtaskId = newSubId;
  }

  if (saveAllTasksToDB) {
    await saveAllTasksToDB(currentTasks);
  }

  const addSuccessPrefix =
    langDict?.toastAddSubtaskSuccessPrefix || "已新增子任務「";
  const addSuccessSuffix = langDict?.toastAddSubtaskSuccessSuffix || "」";
  showToast(`${addSuccessPrefix}${cleanTitle}${addSuccessSuffix}`);

  renderAll();
  return true;
}

export async function updateSubtask(parentTaskId, subtaskId) {
  const currentTasks = state.tasks;
  const parentTask = currentTasks.find((t) => t.id === parentTaskId);
  if (!parentTask) return;

  const subtask = parentTask.subtasks.find((s) => s.id === subtaskId);
  if (!subtask) return;

  const langDict = getLangDict();

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

  if (saveAllTasksToDB) {
    await saveAllTasksToDB(currentTasks);
  }

  showToast(langDict?.toastUpdateSubtaskSuccess || "子任務名稱修改成功！");

  renderAll();
}

export async function changeSubtaskStatus(parentTaskId, subtaskId, newStatus) {
  const parentTask = state.tasks.find((t) => t.id === parentTaskId);
  if (!parentTask) return;

  const sub = parentTask.subtasks.find((s) => s.id === subtaskId);
  if (!sub) return;

  if (sub.status === newStatus) return;

  sub.status = newStatus;

  if (state.currentSubtaskId === subtaskId && sub.status === "completed") {
    const nextSub = parentTask.subtasks.find((s) => s.status !== "completed");
    state.currentSubtaskId = nextSub ? nextSub.id : null;
  }

  if (saveAllTasksToDB) {
    await saveAllTasksToDB(state.tasks);
  }

  const langDict = getLangDict();

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

export async function deleteSubtask(parentTaskId, subtaskId) {
  const currentTasks = state.tasks;

  const parentTask = currentTasks.find((t) => t.id === parentTaskId);
  if (!parentTask) return;

  const subtask = parentTask.subtasks.find((s) => s.id === subtaskId);
  const subTitle = subtask ? subtask.title : "";

  const langDict = getLangDict();

  const confirmPrefix =
    langDict?.confirmDeleteSubtaskPrefix || "確定要刪除子任務「";
  const confirmSuffix =
    langDict?.confirmDeleteSubtaskSuffix ||
    "」嗎？\n（包含其所有計時紀錄，此動作無法復原）";
  const isConfirmed = confirm(`${confirmPrefix}${subTitle}${confirmSuffix}`);
  if (!isConfirmed) return;

  parentTask.subtasks = parentTask.subtasks.filter((s) => s.id !== subtaskId);

  if (
    typeof state.currentSubtaskId !== "undefined" &&
    state.currentSubtaskId === subtaskId
  ) {
    const nextSub = parentTask.subtasks.find((s) => s.status !== "completed");
    state.currentSubtaskId = nextSub ? nextSub.id : null;
  }

  if (saveAllTasksToDB) {
    await saveAllTasksToDB(currentTasks);
  }

  const deletePrefix = langDict?.toastDeleteSubtaskPrefix || "已刪除子任務「";
  const deleteSuffix = langDict?.toastDeleteSubtaskSuffix || "」";
  showToast(`${deletePrefix}${subTitle}${deleteSuffix}`, true);

  renderAll();
}

export async function editRecordNote(taskId, subtaskId, recordId) {
  const currentTasks = state.tasks;

  const task = currentTasks.find((t) => t.id === taskId);
  const sub = task?.subtasks.find((s) => s.id === subtaskId);
  const record = sub?.records.find((r) => r.id === recordId);

  if (!record) return;

  const langDict = getLangDict();

  const promptTitle = langDict?.promptEditNote || "修改備註內容：";
  const newNote = prompt(promptTitle, record.note || "");
  if (newNote === null) return;

  record.note = newNote.trim();

  if (saveAllTasksToDB) {
    await saveAllTasksToDB(currentTasks);
  }

  showToast(langDict?.toastUpdateNoteSuccess || "備註修改成功！");

  renderAll();
}

export async function deleteRecord(taskId, subtaskId, recordId) {
  const currentTasks = state.tasks;

  const task = currentTasks.find((t) => t.id === taskId);
  const sub = task?.subtasks.find((s) => s.id === subtaskId);

  if (!sub || !sub.records) return;

  const langDict = getLangDict();
  const confirmMsg =
    langDict?.confirmDeleteRecord ||
    "確定要刪除這筆計時紀錄嗎？\n（此動作無法復原）";
  const isConfirmed = confirm(confirmMsg);
  if (!isConfirmed) return;

  sub.records = sub.records.filter((r) => r.id !== recordId);

  if (saveAllTasksToDB) {
    await saveAllTasksToDB(currentTasks);
  }

  showToast(langDict?.toastDeleteRecordSuccess || "已刪除計時紀錄", true);

  renderAll();
}

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
