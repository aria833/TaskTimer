import { state } from "./state.js";
import { dom } from "./dom.js";
import { getLangDict } from "./config/i18n.js";
import {
  formatTime,
  getCalculatedSeconds,
  getMainTaskStatus,
  getSubtaskTotalMinutes,
  getMainTaskTotalMinutes,
  calculateTaskProgress,
} from "./utils.js";

export function renderAll() {
  renderCurrentTaskDisplay();
  renderManageMainTaskList();
  renderMainTaskDropdown();
  renderSubtaskDropdown();
  renderModalParentDropdown();
  renderTaskAccordion();
  updateTimerButtonState();
}

export function renderCurrentTaskDisplay() {
  // 1. 取得多國語系字典檔
  const langDict =
    getLangDict();

  const currentTask = state.tasks.find((t) => t.id === state.currentMainTaskId);
  const currentSub = currentTask?.subtasks.find(
    (s) => s.id === state.currentSubtaskId,
  );

  if (dom.currentMainTaskNameEl) {
    dom.currentMainTaskNameEl.textContent = currentTask
      ? currentTask.title
      : langDict?.noMainTaskSelected || "未選擇主任務";
  }

  if (dom.currentSubtaskNameEl) {
    dom.currentSubtaskNameEl.textContent = currentSub
      ? currentSub.title
      : langDict?.noSubtaskSelected || "未選擇子任務";
  }

  // 確保畫面即時顯示對應格式的時間
  if (dom.timerDisplay) {
    dom.timerDisplay.textContent = formatTime(getCalculatedSeconds());
  }
}

export function renderManageMainTaskList() {
  // 1. 修正：透過 window.getLangDict() 取得當前語言字典
  const langDict =
    getLangDict();

  // 確保 state.tasks 也是抓取全域最新的資料
  const currentTasks =
    window.tasks || (typeof state.tasks !== "undefined" ? state.tasks : []);

  const sortedTasks = currentTasks.slice().sort((a, b) => {
    const orderA = state.STATUS_ORDER[getMainTaskStatus(a)] || 2;
    const orderB = state.STATUS_ORDER[getMainTaskStatus(b)] || 2;
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
              state.STATUS_MAP[statusKey] || state.STATUS_MAP.not_started || {};

            // 2. 修正：活用 state.STATUS_MAP 中的 key 直接向 langDict 查表
            // 如果 state.STATUS_MAP 中有設定 key (如 "statusInProgress")，就直接向 langDict 取值
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

  if (dom.manageMainTaskList) dom.manageMainTaskList.innerHTML = listHTML;
  if (dom.listManageMainTaskList)
    dom.listManageMainTaskList.innerHTML = listHTML;
}

export function renderMainTaskDropdown() {
  if (!dom.dropdownMainTaskBtn || !dom.dropdownMainTaskMenu) return;

  // 1. 取得多國語系字典檔
  const langDict =
    getLangDict();

  if (state.tasks.length === 0) {
    dom.dropdownMainTaskBtn.disabled = true;
    const pleaseAddTaskText = langDict?.pleaseAddMainTask || "請新增主任務";
    const noMainTaskText = langDict?.noMainTasksAvailable || "尚無主任務";

    dom.dropdownMainTaskBtn.innerHTML = `${pleaseAddTaskText} <i class="bi bi-chevron-down ms-1"></i>`;
    dom.dropdownMainTaskMenu.innerHTML = `<li><span class="dropdown-item text-muted disabled">${noMainTaskText}</span></li>`;
    return;
  }

  dom.dropdownMainTaskBtn.disabled = false;

  const currentTask = state.tasks.find((t) => t.id === state.currentMainTaskId);
  const pleaseSelectText = langDict?.pleaseSelectMainTask || "請選擇主任務";
  const displayTitle = currentTask ? currentTask.title : pleaseSelectText;

  dom.dropdownMainTaskBtn.innerHTML = `
    ${displayTitle}
    <i class="bi bi-chevron-down ms-1"></i>
  `;

  const sortedTasks = state.tasks.slice().sort((a, b) => {
    const orderA = state.STATUS_ORDER[getMainTaskStatus(a)] || 2;
    const orderB = state.STATUS_ORDER[getMainTaskStatus(b)] || 2;
    return orderA - orderB;
  });

  dom.dropdownMainTaskMenu.innerHTML = sortedTasks
    .map((task) => {
      const taskStatus = getMainTaskStatus(task);
      const statusBadge = state.STATUS_MAP[taskStatus] || {};
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
          class="dropdown-item d-flex justify-content-between align-items-center ${task.id === state.currentMainTaskId ? "active" : ""} ${isCompleted ? "disabled opacity-50 pe-none" : ""}" 
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

export function renderSubtaskDropdown() {
  if (!dom.dropdownSubtaskBtn || !dom.dropdownSubtaskMenu) return;

  // 1. 取得多國語系字典檔
  const langDict =
    getLangDict();

  const currentTask = state.tasks.find((t) => t.id === state.currentMainTaskId);
  const subtasks = currentTask ? currentTask.subtasks : [];

  if (!currentTask) {
    dom.dropdownSubtaskBtn.disabled = true;
    const selectMainFirstText =
      langDict?.pleaseSelectMainTaskFirst || "請先選擇主任務";

    dom.dropdownSubtaskBtn.innerHTML = `${selectMainFirstText} <i class="bi bi-chevron-down ms-1"></i>`;
    dom.dropdownSubtaskMenu.innerHTML = `<li><span class="dropdown-item text-muted disabled">${selectMainFirstText}</span></li>`;
    return;
  }

  if (subtasks.length === 0) {
    dom.dropdownSubtaskBtn.disabled = true;
    const pleaseAddSubText = langDict?.pleaseAddSubtask || "請新增子任務";
    const noSubtaskText =
      langDict?.noSubtasksInMainTask || "此主任務尚無子任務";

    dom.dropdownSubtaskBtn.innerHTML = `${pleaseAddSubText} <i class="bi bi-chevron-down ms-1"></i>`;
    dom.dropdownSubtaskMenu.innerHTML = `<li><span class="dropdown-item text-muted disabled">${noSubtaskText}</span></li>`;
    return;
  }

  dom.dropdownSubtaskBtn.disabled = false;

  const currentSub = subtasks.find((s) => s.id === state.currentSubtaskId);
  const pleaseSelectSubText = langDict?.pleaseSelectSubtask || "請選擇子任務";
  const displayTitle = currentSub ? currentSub.title : pleaseSelectSubText;

  dom.dropdownSubtaskBtn.innerHTML = `
    ${displayTitle}
    <i class="bi bi-chevron-down ms-1"></i>
  `;

  const sortedSubtasks = subtasks.slice().sort((a, b) => {
    const orderA = state.STATUS_ORDER[a.status || "not_started"] || 2;
    const orderB = state.STATUS_ORDER[b.status || "not_started"] || 2;
    return orderA - orderB;
  });

  dom.dropdownSubtaskMenu.innerHTML = sortedSubtasks
    .map((sub) => {
      const subStatus = sub.status || "not_started";
      const badge = state.STATUS_MAP[subStatus] || {};
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
          class="dropdown-item d-flex justify-content-between align-items-center ${sub.id === state.currentSubtaskId ? "active" : ""} ${isCompleted ? "disabled opacity-50 pe-none" : ""}" 
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

export function renderModalParentDropdown() {
  // 1. 取得多國語系字典檔
  const langDict =
    getLangDict();

  const selectedParent =
    state.tasks.find((t) => t.id === state.modalSelectedParentId) ||
    state.tasks[0];
  if (selectedParent) state.modalSelectedParentId = selectedParent.id;

  const selectMainTaskText = langDict?.selectMainTask || "選擇主任務";
  const displayTitle = selectedParent
    ? selectedParent.title
    : selectMainTaskText;

  const btnText = `
    ${displayTitle}
    <i class="bi bi-chevron-down ms-1"></i>
  `;

  const menuHTML = state.tasks
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

  if (dom.modalSubtaskParentBtn) dom.modalSubtaskParentBtn.innerHTML = btnText;
  if (dom.modalSubtaskParentMenu)
    dom.modalSubtaskParentMenu.innerHTML = menuHTML;

  if (dom.listModalSubtaskParentBtn)
    dom.listModalSubtaskParentBtn.innerHTML = btnText;
  if (dom.listModalSubtaskParentMenu)
    dom.listModalSubtaskParentMenu.innerHTML = menuHTML;
}
export function renderTaskAccordion() {
  const accordionContainer = document.querySelector("#task-accordionExample");
  if (!accordionContainer) return;

  // 1. 統一取得多國語系字典檔 (優先使用全域/模組導出的 getLangDict 函式)
  const langDict =
    getLangDict();

  // 當無主任務時的空狀態渲染
  if (state.tasks.length === 0) {
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

  const accordionHTML = state.tasks
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
                const subBadge = state.STATUS_MAP[subStatus];
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

export function selectMainTask(taskId) {
  state.currentMainTaskId = taskId;
  state.modalSelectedParentId = taskId;
  const task = state.tasks.find((t) => t.id === taskId);
  const nextSub = task?.subtasks.find((s) => s.status !== "completed");
  state.currentSubtaskId = nextSub ? nextSub.id : task?.subtasks[0]?.id || null;
  renderAll();
}

export function selectSubtask(subId) {
  state.currentSubtaskId = subId;
  renderAll();
}

export function selectModalParent(taskId) {
  state.modalSelectedParentId = taskId;
  renderModalParentDropdown();
}

// ==========================================

// 提供給既有 HTML / i18n 的全域入口
window.renderAll = renderAll;
window.renderTaskAccordion = renderTaskAccordion;
