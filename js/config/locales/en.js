// ==========================================
// 英文版語系字典：en.js
// ==========================================

export default {
  // SEO & Meta Tags
  seo: {
    index: {
      title: "TaskTimer | Your Learning & Growth Companion",
      description:
        "TaskTimer is a registration-free task timer and time tracking tool for learning, work, and project management. Your data is stored locally on your device and ready to use right in your browser.",
      keywords: "TaskTimer, task timer, time tracking, learning tool",
      ogTitle: "TaskTimer | Your Learning & Growth Companion",
      ogDescription:
        "A registration-free task timer that’s ready to use right away. Break down tasks, track your time, and keep all your data on your device.",
      twitterDescription:
        "A registration-free task timer and time tracking tool for learning, work, and project management.",
    },

    privacy: {
      title: "Privacy Policy | TaskTimer",
      ogTitle: "Privacy Policy | TaskTimer",
    },
  },

  // Header & App Title
  appName: "TaskTimer",
  darkModeLabel: "Dark Mode",

  // Nav
  navTimer: "Timer",
  navTask: "Task List",
  navQA: "Q&A",
  navData: "System Data",

  // Select Main/Subtask
  mainTask: "Main Task",
  manageBtn: "Manage",
  subTask: "Subtask",
  addBtn: "Add",

  manageMainTaskModalTitle: "Manage Main Tasks",
  addMainTaskTitle: "Add Main Task",
  mainTaskPlaceholder: "Main task name (e.g., Learn JavaScript)",
  currentMainTask: "Current Main Tasks",
  closeBtn: "Close",
  modalSubtaskParentBtn: "Please add a main task",

  addSubTaskModalTitle: "Add Subtask",
  addNewSubTask: "Create Subtask",
  belongTo: "Main Task",
  subTaskName: "Subtask Name",
  subTaskPlaceholder: "e.g., Practice using if statements",
  cancel: "Cancel",
  dropdownSubtaskBtn: "Please add a subtask first",
  toastInitDBFailed: "Failed to load local data. Running in temporary mode.",
  toastDuplicateTaskPrefix: 'Failed: A main task named "',
  toastDuplicateTaskSuffix: '" already exists.',
  toastAddMainTaskSuccessPrefix: 'Successfully added main task "',
  toastAddMainTaskSuccessSuffix: '"',
  promptEditMainTask: "Edit main task title:",
  toastUpdateMainTaskSuccess: "Main task title updated successfully!",
  confirmDeleteMainTaskPrefix: 'Are you sure you want to delete main task "',
  confirmDeleteMainTaskSuffix:
    '"?\n(All subtasks and timer records inside will be deleted. This action cannot be undone)',
  toastDeleteMainTaskPrefix: 'Deleted main task "',
  toastDeleteMainTaskSuffix: '"',
  toastDuplicateSubtaskPrefix:
    'Failed: A subtask with this name already exists under "',
  toastDuplicateSubtaskSuffix: '"',
  toastAddSubtaskSuccessPrefix: 'Added subtask "',
  toastAddSubtaskSuccessSuffix: '"',
  promptEditSubtask: "Edit subtask title:",
  toastSubtaskTitleEmpty: "Subtask title cannot be empty!",
  toastDuplicateSubtaskEditPrefix: 'Failed: Duplicate subtask "',
  toastDuplicateSubtaskEditSuffix: '" already exists',
  toastUpdateSubtaskSuccess: "Subtask title updated successfully!",
  toastSubtaskStatusUpdatedPrefix: 'Status for "',
  toastSubtaskStatusUpdatedMid: '" updated to: ',
  confirmDeleteSubtaskPrefix: 'Are you sure you want to delete subtask "',
  confirmDeleteSubtaskSuffix:
    '"?\n(All timer records inside will be deleted. This action cannot be undone)',
  toastDeleteSubtaskPrefix: 'Deleted subtask "',
  toastDeleteSubtaskSuffix: '"',
  promptEditNote: "Edit note:",
  toastUpdateNoteSuccess: "Note updated successfully!",
  confirmDeleteRecord:
    "Are you sure you want to delete this timer record?\n(This action cannot be undone)",
  toastDeleteRecordSuccess: "Timer record deleted",
  noMainTaskSelected: "No main task selected",
  noSubtaskSelected: "No subtask selected",
  noMainTasksAvailable: "No main tasks available",
  pleaseAddMainTask: "Please add a main task",
  pleaseSelectMainTask: "Please select a main task",
  noMainTasksAvailable: "No main tasks",
  pleaseSelectMainTaskFirst: "Please select a main task first",
  pleaseAddSubtask: "Please add a subtask",
  noSubtasksInMainTask: "No subtasks under this main task",
  pleaseSelectSubtask: "Please select a subtask",
  selectMainTask: "Select Main Task",
  noMainTaskAccordionEmpty:
    'No main tasks yet. Click "Manage Main Tasks" to start adding!',
  btnCancel: "Cancel",
  btnConfirm: "Confirm",
  // Modal Titles
  modalEditTaskTitle: "Edit Main Task",
  modalEditSubtaskTitle: "Edit Subtask",

  // Prompts & Toasts
  promptEditMainTask: "Edit Main Task Name:",
  promptEditSubtask: "Edit Subtask Name:",
  toastDuplicateTaskPrefix: "Update failed: Main task '",
  toastDuplicateTaskSuffix: "' already exists.",
  toastUpdateMainTaskSuccess: "Main task name updated successfully!",
  toastSubtaskTitleEmpty: "Subtask name cannot be empty!",
  toastDuplicateSubtaskEditPrefix: "Update failed: Subtask '",
  toastDuplicateSubtaskEditSuffix: "' already exists.",
  toastUpdateSubtaskSuccess: "Subtask name updated successfully!",

  // Timer
  currentTask: "Current Task：",
  currentMainTaskName: "No main task selected",
  currentSubtaskName: "No subtask selected",

  startTimer: "Start",
  pauseTimer: "Pause",
  continueTimer: "Resume",
  stopTimer: "End",

  note: "Note",
  noteSample: "Enter a note or reflection",
  noteInfo:
    "When you end the timer, this note will be saved with the time record in the task list.",

  idleTimer: "Idle Reminder",
  idle15: "15 minutes",
  idle30: "30 minutes",
  idle45: "45 minutes",
  idle60: "60 minutes",

  showSeconds: "Show Seconds",

  backupReminder:
    "Your data is stored only in your browser. To prevent data loss when clearing your cache, please download a backup regularly from System Data page.",

  completeTimer: "Timer Completed!",
  sessionDuration: "Session Duration",
  noteTitle: "Note (Optional)",
  noteArea: "Write down what you completed or any thoughts you have...",
  isCompleted: "Mark this task as completed",

  discardRecord: "Discard Record",
  saveRecord: "Save Record",
  toastSaveSessionSuccess: "The timer record was saved successfully!",
  confirmIdle: (minutes) =>
    `You've been idle for more than ${minutes} minutes. Would you like to end and save the current timer session?`,
  toastOffline:
    "⚠️ You are currently offline. Your data will be safely stored in local IndexedDB.",
  toastOnline: "🟢 Internet connection restored",
  toastDiscardSession: "The current timer session was discarded.",

  //Task List
  downloadCSV: "Download CSV",
  statusNotStarted: "Not Started",
  statusInProgress: "In Progress",
  statusCompleted: "Completed",
  unitDay: "d",
  unitHour: "h",
  unitMinute: "m",
  viewRecords: "View Timer & Note Records",
  labelTotal: "Total",
  recordCountText: "{count} records",
  labelNote: "Note",
  noNote: "No notes",
  noRecords: "No records yet",
  editNoteTitle: "Edit note",
  deleteRecordTitle: "Delete record",

  //QA
  qaTitle1: "What are the main features of TaskTimer?",
  qaBody1:
    "TaskTimer is more than just a convenient timer. It also incorporates the core concept of task breakdown, helping you practice breaking down large learning goals into smaller steps. You can record the learning time and status of each step, and visualize your progress with a learning progress bar.",

  qaTitle2:
    'Will my data be lost if I accidentally press "End" while the timer is running?',
  qaBody2:
    'Don\'t worry! When you press End, a confirmation window will automatically appear with two options: "Save Record" and "Discard Record".',

  qaTitle3: "Will sessions shorter than 1 second be recorded?",
  qaBody3:
    "To prevent accidental clicks from creating invalid records, sessions shorter than 1 second are automatically reset when you press End. The save confirmation window will not appear.",

  qaTitle4: "Is the note field required?",
  qaBody4:
    "The note field is optional. You can use it to record reflections or specific progress from your session. If you leave it blank, your time will still be recorded.",

  qaTitle5: "Will my tasks and time records be uploaded to a server?",
  qaBody5:
    "No. TaskTimer uses a Local-First architecture. All tasks, notes, and time records are stored locally in your browser. We do not collect any personal information.",

  qaTitle6: "Will my data still be available if I switch browsers or devices?",
  qaBody6:
    'Because your data is stored locally in a single browser, it will not be automatically synchronized when you switch devices or clear your browser cache. We recommend using the "JSON Backup Export" feature on the "System Data" page to transfer your data between devices.',

  qaTitle7: "How do I back up and restore my data?",
  qaBody71: 'Go to the "System Data" page:',
  qaBody72:
    'Export: Click "Download JSON Backup". The system will automatically generate a backup file with the date and time.',
  qaBody73:
    'Restore: Click "Choose Backup File" and upload a previously exported JSON file to restore your data. Please note that restoring a backup will overwrite your existing data.',

  qaTitle8: "Will clearing my browser history cause my data to be deleted?",
  qaBody8:
    'If you select options such as "Website Data and Cookies" or "Clear Site Storage" when clearing your browser data, your local data may also be deleted. We strongly recommend exporting a JSON backup regularly to keep your data safe.',

  qaTitle9:
    "How can I contact the developer if I want to share my experience or provide feedback?",
  qaBody9:
    "Feel free to click “Feedback” in the footer! Whether you have a feature suggestion, want to share your experience, or have encountered an issue, we’d love to hear from you. We hope TaskTimer can be a helpful companion on your learning and growth journey.",

  //data
  backupData: "Backup Data (JSON)",
  resumeData: "Restore Data (JSON)",
  privacyAlertNotice: `<strong>Privacy & Data Security Notice:</strong><br />
      This tool utilizes local storage technology and <strong>will not upload or collect any of your personal data</strong>. All data stays inside your browser. Clearing cache, using incognito mode, or switching devices will reset your data. Please make sure to <strong>periodically download JSON backups manually</strong> to keep your data safe.`,
  toastNoDataToExport: "No task data available to export!",
  toastExportCSVSuccess: "CSV backup downloaded successfully!",
  csvHeaderMainTask: "Main Task Title",
  csvHeaderSubtask: "Subtask Title",
  csvHeaderStatus: "Status",
  csvHeaderTimeRange: "Time Interval",
  csvHeaderDuration: "Duration (min)",
  csvHeaderNote: "Note",
  noSubtaskText: "No Subtask",
  csvExportFileNamePrefix: "TaskTimer_Backup",
  toastNoDataToBackup: "No task data available to backup!",
  toastExportJSONSuccess: "JSON backup downloaded successfully!",
  toastExportFailed: "Export failed, please try again.",
  jsonExportFileNamePrefix: "TaskTimer_Backup",
  toastInvalidBackupFormat:
    "Invalid backup file format. Please make sure it's a valid JSON file!",
  confirmImportPrefix: "Are you sure you want to restore",
  confirmImportSuffix:
    "main tasks?\n⚠️ Warning: This will overwrite your current system data!",
  toastRestoreSuccess: "Data restored successfully!",
  toastParseJSONFailed:
    "Failed to parse file. Please check if the file format is correct!",

  // footer
  footerFeedbackBtn: "Feedback",
  footerPrivacyBtn: "Privacy Policy",

  // Privacy
  privacyTitle: "Privacy Policy | TaskTimer",
  privacyLastUpdated: "Last updated: October 11, 2026",
  privacySec1Title: "1. Local Data Storage",
  privacySec1Text:
    "TaskTimer stores tasks, subtasks, notes, and timer records in the current browser’s IndexedDB. Preferences such as language, theme, seconds display, and idle reminder settings are stored in LocalStorage. TaskTimer does not actively upload this application data to a developer-operated server. Clearing website data or changing browsers/devices may erase local data, so please export backups regularly using the System Data tools.",
  privacySec2Title: "2. Accounts and Contact Information",
  privacySec2Text:
    "TaskTimer does not require an account and does not create an in-app user profile. If you contact the developer through an external channel, the contact information and message you provide will be used to respond to that inquiry. Please do not include unnecessary sensitive or confidential information.",
  privacySec3Title: "3. Google Analytics, Advertising, and Cookies",
  privacySec3Text:
    "This website loads Google Analytics (Google tag) to measure website usage and Google AdSense to display ads. These third-party services may use cookies, similar technologies, or device/browser information to process visit, usage, and advertising-related data. Actual processing depends on Google’s policies and your settings; this should not be interpreted as a guarantee that all such data is fully anonymous or never identifiable.",
  privacySec4Title: "4. Third-Party Services and External Resources",
  privacySec4Text:
    "The website loads external resources such as Bootstrap and Bootstrap Icons from third-party CDNs. When these resources load, your browser sends requests to the relevant providers, who may receive technical information such as your IP address and browser details. Each third-party provider handles data under its own privacy policy.",
  privacySec5Title: "5. Data Safety and Your Choices",
  privacySec5Text:
    "Task content and timer records are primarily stored in your browser. Please secure your device and export backups regularly. You can manage or delete website storage through your browser settings and manage cookies using browser-provided controls. Disabling or restricting third-party cookies may affect some analytics or advertising features.",
  privacySec6Title: "6. Policy Updates and Contact",
  privacySec6Text:
    "This policy may be updated when product features or applicable requirements change. The latest version and its revision date will be published on this page.",

  confirmLeaveTimer:
    "You have an unfinished timer session. Are you sure you want to leave the Timer page? The session will not be saved.",
};
