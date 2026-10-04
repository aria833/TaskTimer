// ==========================================
// DOM 元素選取與快取管理：dom.js
// ==========================================

export const dom = {
  timerDisplay: document.querySelector("#timer-display"),
  btnStart: document.querySelector("#btn-start"),
  btnGroupActive: document.querySelector("#btn-group-active"),
  btnPause: document.querySelector("#btn-pause"),
  btnStop: document.querySelector("#btn-stop"),
  mainNoteInput: document.querySelector("#task-note"),
  currentMainTaskNameEl: document.querySelector("#current-main-task-name"),
  currentSubtaskNameEl: document.querySelector("#current-subtask-name"),
  switchShowSeconds: document.querySelector("#switch-show-seconds"),
  selectIdleTime: document.querySelector("#select-idle-time"),
  offlineBadge: document.querySelector("#offline-badge"),
  dropdownMainTaskBtn: document.querySelector("#dropdown-main-task-btn"),
  dropdownMainTaskMenu: document.querySelector("#dropdown-main-task-menu"),
  dropdownSubtaskBtn: document.querySelector("#dropdown-subtask-btn"),
  dropdownSubtaskMenu: document.querySelector("#dropdown-subtask-menu"),
  inputNewMainTask: document.querySelector("#input-new-main-task"),
  btnAddMainTask: document.querySelector("#btn-add-main-task"),
  manageMainTaskList: document.querySelector("#manage-main-task-list"),
  modalSubtaskParentBtn: document.querySelector("#modal-subtask-parent-btn"),
  modalSubtaskParentMenu: document.querySelector("#modal-subtask-parent-menu"),
  inputNewSubtaskName: document.querySelector("#input-new-subtask-name"),
  btnConfirmAddSubtask: document.querySelector("#btn-confirm-add-subtask"),
  listInputNewMainTask: document.querySelector("#list-input-new-main-task"),
  listBtnAddMainTask: document.querySelector("#list-btn-add-main-task"),
  listManageMainTaskList: document.querySelector("#list-manage-main-task-list"),
  listModalSubtaskParentBtn: document.querySelector(
    "#list-modal-subtask-parent-btn",
  ),
  listModalSubtaskParentMenu: document.querySelector(
    "#list-modal-subtask-parent-menu",
  ),
  listInputNewSubtaskName: document.querySelector(
    "#list-input-new-subtask-name",
  ),
  listBtnConfirmAddSubtask: document.querySelector(
    "#list-btn-confirm-add-subtask",
  ),
  saveTimerModalElement: document.querySelector("#saveTimerModal"),
  saveTimerModal: document.querySelector("#saveTimerModal")
    ? new bootstrap.Modal(document.querySelector("#saveTimerModal"))
    : null,
  modalFocusTime: document.querySelector("#modal-focus-time"),
  modalNote: document.querySelector("#modal-note"),
  modalIsCompleted: document.querySelector("#modal-is-completed"),
  btnDiscardSession: document.querySelector("#btn-discard-session"),
  btnSaveSession: document.querySelector("#btn-save-session"),
  actionToastElement: document.querySelector("#actionToast"),
  actionToast: document.querySelector("#actionToast")
    ? new bootstrap.Toast(document.querySelector("#actionToast"), {
        delay: 3000,
      })
    : null,
  toastMessage: document.querySelector("#toast-message"),
};
