// ==========================================
// ：.js
// ==========================================

// TaskTimer - Global State

export const state = {
  tasks: [],
  selectedMainTaskId: null,
  selectedSubtaskId: null,
  currentMainTaskId: null,
  currentSubtaskId: null,
  modalSelectedParentId: null,
  timerInterval: null,
  startTime: 0,
  elapsedTime: 0,
  isRunning: false,
  currentSessionSeconds: 0,
  showSeconds: localStorage.getItem("setting_show_seconds") !== "false",
  idleMinutes: parseInt(
    localStorage.getItem("setting_idle_minutes") || "45",
    10,
  ),
  idleTimer: null,

  STATUS_MAP: {
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
  },

  STATUS_ORDER: {
    in_progress: 1,
    not_started: 2,
    completed: 3,
  },
};

// 與原本程式相容：i18n 或其他外部程式仍可從 window 取得 tasks。
window.tasks = state.tasks;
