export default {
  // SEO & Meta Tags
  seo: {
    title: "TaskTimer | Your Local-First Study & Focus Companion",
    description:
      "A task timer that grows with your learning journey! No registration needed, open and use instantly with 100% local data privacy.",
    keywords:
      "TaskTimer, Task Timer, Time Tracker, Study Tool, Local-First, IndexedDB",
    ogTitle: "TaskTimer | Efficient & Local-First Focus Timer",
    ogDescription:
      "No registration required! Designed for learning, TaskTimer tracks your process while keeping your data safe on your device.",
    twitterDescription:
      "No registration required, local-first task timer and focus management tool.",
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
  mainTaskPlaceholder: "Main task name (e.g., Layout Practice)",
  currentMainTask: "Current Main Tasks",
  closeBtn: "Close",
  modalSubtaskParentBtn: "Please add a main task",

  addSubTaskModalTitle: "Add Subtask",
  addNewSubTask: "Create Subtask",
  belongTo: "Main Task",
  subTaskName: "Subtask Name",
  subTaskPlaceholder: "e.g., Modify Code",
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

  // Timer
  currentTask: "Current Task",
  currentMainTaskName: "No main task selected",
  currentSubtaskName: "No subtask selected",

  startTimer: "Start Timer",
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
    "Your data is stored only in your browser. To prevent data loss when clearing your cache, please download a backup regularly from System Data.",

  completeTimer: "Timer Completed!",
  sessionDuration: "Session Duration",
  noteTitle: "Note (Optional)",
  noteArea: "Write down what you completed or any thoughts you have...",
  isCompleted: "Mark this task as completed",

  discardRecord: "Discard This Session",
  saveRecord: "Save Record",
  toastSaveSessionSuccess: "The timer record was saved successfully!",

  //Task List
  downloadCSV: "Download CSV File",
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
    "TaskTimer is a task timer designed around simplicity, focus, and a Local-First approach. It combines task lists with time tracking, and requires no account registration, so you can start using it right away.",

  qaTitle2:
    'Will my data be lost if I accidentally press "Stop" while the timer is running?',
  qaBody2:
    'Don\'t worry! When you press Stop, a confirmation window will automatically appear with two options: "Save Record" and "Discard Session." The window also has safeguards against accidental dismissal, so it cannot be closed accidentally by clicking the background or pressing the Esc key.',

  qaTitle3: "Will sessions shorter than 1 second be recorded?",
  qaBody3:
    "To prevent accidental clicks from creating invalid records, sessions shorter than 1 second are automatically reset when you press Stop. The save confirmation window will not appear.",

  qaTitle4: "Is the note field required?",
  qaBody4:
    "The note field is optional. You can use it to record reflections or specific progress from your session. If you leave it blank, your time will still be recorded.",

  qaTitle5: "Will my tasks and time records be uploaded to a server?",
  qaBody5:
    "No. TaskTimer uses a Local-First architecture. All tasks, notes, and time records are stored locally in your browser using IndexedDB. We do not collect any personal information.",

  qaTitle6: "Will my data still be available if I switch browsers or devices?",
  qaBody6:
    'Because your data is stored locally in a single browser, it will not be automatically synchronized when you switch devices or clear your browser cache. We recommend using the "JSON Backup Export" feature on the "System Data" page to transfer your data between devices.',

  qaTitle7: "How do I back up and restore my data?",
  qaBody71: 'Go to the "System Data" tab:',
  qaBody72:
    'Export: Click "Download JSON Backup". The system will automatically generate a backup file with the date and version number.',
  qaBody73:
    'Restore: Click "Choose Backup File" and upload a previously exported JSON file to restore your data. Please note that restoring a backup will overwrite your existing data.',

  qaTitle8: "Will clearing my browser history cause my data to be deleted?",
  qaBody8:
    'If you select options such as "Website Data and Cookies" or "Clear Site Storage" when clearing your browser data, your local IndexedDB data may also be deleted. We strongly recommend exporting a JSON backup regularly to keep your data safe.',

  qaTitle9: "Which languages and themes does TaskTimer support?",
  qaBody9:
    "TaskTimer currently supports Traditional Chinese, English, and Japanese. It offers both Light Mode and Dark Mode, which you can switch between at any time.",

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
};
