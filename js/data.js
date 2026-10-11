// ==========================================
// 資料結構整理：data.js
// 處理CSV匯出、JSON匯入匯出
// ==========================================

import { state } from "./state.js";
import { showToast } from "./utils.js";
import { renderAll } from "./render.js";
import { saveAllTasksToDB } from "./db.js";
import { getLangDict } from "./config/i18n.js";
import { getFileTimestamp } from "./utils.js";

// CSV 資料匯出功能
export function escapeCSVField(str) {
  if (typeof str !== "string") return str;
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function exportToCSV() {
  const langDict = getLangDict();
  const currentTasks =
    window.tasks || (typeof state.tasks !== "undefined" ? state.tasks : []);

  if (!currentTasks || currentTasks.length === 0) {
    showToast(
      langDict?.toastNoDataToExport || "目前尚無任務資料可供匯出！",
      true,
    );
    return;
  }

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

  const timestamp = getFileTimestamp();
  const fileNamePrefix =
    langDict?.csvExportFileNamePrefix || "TaskTimer_Backup";

  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.setAttribute("download", `${fileNamePrefix}_${timestamp}.csv`);
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

// JSON 資料匯入與匯出 (Backup & Restore)
export function exportDataToJSON() {
  const langDict = getLangDict();
  const currentTasks =
    window.tasks || (typeof state.tasks !== "undefined" ? state.tasks : []);

  if (!currentTasks || currentTasks.length === 0) {
    showToast(
      langDict?.toastNoDataToBackup || "目前尚無任何任務資料可供備份！",
      true,
    );
    return;
  }

  try {
    const backupData = {
      version: "1.1.1",
      exportedAt: new Date().toISOString(),
      data: currentTasks,
    };

    const jsonString = JSON.stringify(backupData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const downloadUrl = URL.createObjectURL(blob);

    const timestamp = getFileTimestamp();
    const downloadLink = document.createElement("a");
    downloadLink.href = downloadUrl;

    const fileNamePrefix =
      langDict?.jsonExportFileNamePrefix || "TaskTimer_Backup";

    downloadLink.setAttribute(
      "download",
      `${fileNamePrefix}_${timestamp}.json`,
    );

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

export function validateImportData(jsonData) {
  if (!jsonData || typeof jsonData !== "object") return false;

  const targetTasks = Array.isArray(jsonData) ? jsonData : jsonData.data;

  if (!Array.isArray(targetTasks)) return false;

  const isValidStructure = targetTasks.every(
    (task) => typeof task.id === "string" && typeof task.title === "string",
  );

  return isValidStructure ? targetTasks : null;
}

export function importDataFromJSON(file) {
  if (!file) return;

  const langDict = getLangDict();

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

      const confirmPrefix = langDict?.confirmImportPrefix || "確定要還原";
      const confirmSuffix =
        langDict?.confirmImportSuffix ||
        "筆主任務資料嗎？\n⚠️ 注意：這將會覆蓋您目前的系統資料！";
      const confirmMessage = `${confirmPrefix} ${validatedTasks.length} ${confirmSuffix}`;

      const confirmImport = confirm(confirmMessage);

      if (!confirmImport) return;

      window.tasks = validatedTasks;
      if (typeof state.tasks !== "undefined") state.tasks = validatedTasks;
      window.tasks = state.tasks;

      state.selectedMainTaskId =
        validatedTasks.length > 0 ? validatedTasks[0].id : null;
      state.selectedSubtaskId =
        validatedTasks.length > 0 && validatedTasks[0].subtasks?.length > 0
          ? validatedTasks[0].subtasks[0].id
          : null;

      if (saveAllTasksToDB) {
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

// 事件監聽綁定 (Event Listeners)
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
