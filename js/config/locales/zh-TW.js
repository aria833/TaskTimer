// ==========================================
// 中文版語系字典：zh-TW.js
// ==========================================

export default {
  // SEO & Meta 標籤
  seo: {
    index: {
      title: "TaskTimer | 陪你學習成長的計時小夥伴",
      description:
        "TaskTimer 是一款免註冊的任務計時器與時間追蹤工具，適合學習、工作與專案管理。資料儲存在裝置本機，打開瀏覽器即可使用。",
      keywords: "TaskTimer, 任務計時器, 時間追蹤, 學習工具",
      ogTitle: "TaskTimer | 陪你學習成長的計時小夥伴",
      ogDescription:
        "免註冊、打開就能使用的任務計時器。拆解任務、記錄時間，所有資料留在你的裝置裡。",
      twitterDescription:
        "免註冊的任務計時器與時間追蹤工具，適合學習、工作與專案管理",
    },
    privacy: {
      title: "隱私權政策｜TaskTimer",
      ogTitle: "隱私權政策｜TaskTimer",
    },
  },

  // Header & 系統名稱
  appName: "TaskTimer",
  darkModeLabel: "深色模式",

  // Nav
  navTimer: "計時器",
  navTask: "任務列表",
  navQA: "常見QA",
  navData: "系統資料",

  // 選擇主/子任務
  mainTask: "主任務",
  manageBtn: "管理",
  subTask: "子任務",
  addBtn: "新增",

  manageMainTaskModalTitle: "管理主任務",
  addMainTaskTitle: "新增主任務",
  mainTaskPlaceholder: "主任務名稱（例如：學習JavaScript）",
  currentMainTask: "現有主任務列表",
  closeBtn: "關閉",
  modalSubtaskParentBtn: "請新增主任務",

  addSubTaskModalTitle: "新增子任務",
  addNewSubTask: "建立子任務",
  belongTo: "歸屬主任務",
  subTaskName: "子任務名稱",
  subTaskPlaceholder: "例如：if運用練習",
  cancel: "取消",
  dropdownSubtaskBtn: "請先新增子任務",
  noSubtasks: "尚無子任務，請點擊「新增子任務」",
  toastInitDBFailed: "本地資料載入失敗，以暫存模式運作",
  toastDuplicateTaskPrefix: "新增失敗：已存在名為「",
  toastDuplicateTaskSuffix: "」的主任務",
  toastAddMainTaskSuccessPrefix: "已成功新增主任務「",
  toastAddMainTaskSuccessSuffix: "」",
  promptEditMainTask: "修改主任務名稱：",
  toastUpdateMainTaskSuccess: "主任務名稱修改成功！",
  confirmDeleteMainTaskPrefix: "確定要刪除主任務「",
  confirmDeleteMainTaskSuffix:
    "」嗎？\n（包含其中的所有子任務與計時紀錄，此動作無法復原）",
  toastDeleteMainTaskPrefix: "已刪除主任務「",
  toastDeleteMainTaskSuffix: "」",
  toastDuplicateSubtaskPrefix: "新增失敗：在「",
  toastDuplicateSubtaskSuffix: "」下已有重複的子任務名稱",
  toastAddSubtaskSuccessPrefix: "已新增子任務「",
  toastAddSubtaskSuccessSuffix: "」",
  promptEditSubtask: "修改子任務名稱：",
  toastSubtaskTitleEmpty: "子任務名稱不能為空！",
  toastDuplicateSubtaskEditPrefix: "修改失敗：已有相同的子任務「",
  toastDuplicateSubtaskEditSuffix: "」",
  toastUpdateSubtaskSuccess: "子任務名稱修改成功！",
  toastSubtaskStatusUpdatedPrefix: "「",
  toastSubtaskStatusUpdatedMid: "」狀態已更新為：",
  confirmDeleteSubtaskPrefix: "確定要刪除子任務「",
  confirmDeleteSubtaskSuffix: "」嗎？\n（包含其所有計時紀錄，此動作無法復原）",
  toastDeleteSubtaskPrefix: "已刪除子任務「",
  toastDeleteSubtaskSuffix: "」",
  promptEditNote: "修改備註內容：",
  toastUpdateNoteSuccess: "備註修改成功！",
  confirmDeleteRecord: "確定要刪除這筆計時紀錄嗎？\n（此動作無法復原）",
  toastDeleteRecordSuccess: "已刪除計時紀錄",
  noMainTaskSelected: "未選擇主任務",
  noSubtaskSelected: "未選擇子任務",
  noMainTasksAvailable: "目前尚無主任務",
  pleaseAddMainTask: "請新增主任務",
  pleaseSelectMainTask: "請選擇主任務",
  noMainTasksAvailable: "尚無主任務",
  pleaseSelectMainTaskFirst: "請先選擇主任務",
  pleaseAddSubtask: "請新增子任務",
  noSubtasksInMainTask: "此主任務尚無子任務",
  pleaseSelectSubtask: "請選擇子任務",
  selectMainTask: "選擇主任務",
  noMainTaskAccordionEmpty: "目前尚無主任務，點擊「管理主任務」開始新增吧！",
  btnCancel: "取消",
  btnConfirm: "確定",
  // Modal 標題
  modalEditTaskTitle: "修改主任務名稱",
  modalEditSubtaskTitle: "修改子任務名稱",

  // 提示與 Toast
  promptEditMainTask: "修改主任務名稱：",
  promptEditSubtask: "修改子任務名稱：",
  toastDuplicateTaskPrefix: "修改失敗：已存在名為「",
  toastDuplicateTaskSuffix: "」的主任務",
  toastUpdateMainTaskSuccess: "主任務名稱修改成功！",
  toastSubtaskTitleEmpty: "子任務名稱不能為空！",
  toastDuplicateSubtaskEditPrefix: "修改失敗：已有相同的子任務「",
  toastDuplicateSubtaskEditSuffix: "」",
  toastUpdateSubtaskSuccess: "子任務名稱修改成功！",

  // 計時器區塊
  currentTask: "當前任務：",
  currentMainTaskName: "未選取主任務",
  currentSubtaskName: "未選取子任務",

  startTimer: "開始計時",
  pauseTimer: "暫停",
  continueTimer: "繼續",
  stopTimer: "結束",

  note: "備註",
  noteSample: "請填寫備註或心得筆記",
  noteInfo: "當結束計時，此備註會與計時紀錄同步保存於任務列表。",

  idleTimer: "閒置提醒",
  idle15: "15 分鐘",
  idle30: "30 分鐘",
  idle45: "45 分鐘",
  idle60: "60 分鐘",

  showSeconds: "顯示秒數",

  backupReminder:
    "資料僅儲存於您的瀏覽器中。為避免清空快取導致資料遺失，請務必定期前往系統資料下載備份。",

  completeTimer: "完成計時！",
  sessionDuration: "本次計時時長",
  noteTitle: "備註（選填）",
  noteArea: "記錄一下完成項目或是個人想法吧...",
  isCompleted: "將此任務標記為已完成",

  discardRecord: "捨棄此次計時",
  saveRecord: "儲存紀錄",
  toastSaveSessionSuccess: "已成功儲存本次計時！",
  confirmIdle: (minutes) =>
    `您已經閒置超過 ${minutes} 分鐘囉，要幫您結束並儲存當前這筆計時嗎？`,
  toastOffline: "⚠️ 目前處於離線狀態，資料將會安全存於本地 IndexedDB",
  toastOnline: "🟢 已恢復網路連線",
  toastDiscardSession: "已捨棄本次計時",

  //任務列表
  downloadCSV: "下載CSV檔案",
  statusNotStarted: "未開始",
  statusInProgress: "進行中",
  statusCompleted: "已完成",
  unitDay: "天",
  unitHour: "小時",
  unitMinute: "分鐘",
  viewRecords: "檢視計時與備註紀錄",
  labelTotal: "總計",
  recordCountText: "共 {count} 筆紀錄",
  labelNote: "備註",
  noNote: "無備註",
  noRecords: "尚無計時紀錄",
  editNoteTitle: "編輯備註",
  deleteRecordTitle: "刪除紀錄",

  //QA
  qaTitle1: "TaskTimer 的主要特色是什麼？",
  qaBody1:
    "TaskTimer 不僅是便利的計時工具，更結合了任務拆解的核心觀念。協助你練習將龐大的學習目標細分為小步驟，並且記錄每個小步驟的學習時間和狀態，並可以透過學習進度條，視覺化自己的進步。",

  qaTitle2: "如果計時到一半不小心按到「結束」，資料會遺失嗎？",
  qaBody2:
    "不用擔心！按下結束時，系統會自動彈出確認視窗，提供「儲存紀錄」與「捨棄計時」兩種選擇。且視窗具備防誤觸機制，不會因為點擊背景或按 Esc 鍵而意外關閉。",

  qaTitle3: "未滿 1 秒的計時也會被紀錄嗎？",
  qaBody3:
    "為了避免誤觸產生無效的資料，系統設定「計時未滿 1 秒」按下結束時會自動重置，不會跳出儲存視窗。",

  qaTitle4: "備註欄位是必填的嗎？",
  qaBody4:
    "備註欄位為選填。你可以記錄當次專注的心得或具體進度；如果未填寫，系統依然會完整紀錄用時。",

  qaTitle5: "我的任務與計時資料會被上傳到伺服器嗎？",
  qaBody5:
    "完全不會。TaskTimer 採用「在地優先（Local-First）」架構，所有任務、備註與時間紀錄皆透過 IndexedDB 儲存在你的個人瀏覽器中，我們不會收集任何個人隱私資料。",

  qaTitle6: "更換瀏覽器或裝置時，我的資料還會在嗎？",
  qaBody6:
    "因為資料儲存在單一瀏覽器的本地端，更換裝置或清除瀏覽器快取時資料不會自動同步。建議使用「系統資料」頁面的「JSON 備份匯出」功能進行跨裝置轉移。",

  qaTitle7: "如何備份與還原我的資料？",
  qaBody71: "點擊「系統資料」頁籤：",
  qaBody72:
    "匯出：點擊「下載 JSON 備份」，系統會自動產生帶有日期時間的備份檔。",
  qaBody73:
    "還原：點擊「選擇備份檔」，上傳先前匯出的 JSON 檔案即可完成還原（還原前請留意會覆蓋現有資料）。",

  qaTitle8: "清理瀏覽器歷史紀錄會導致資料消失嗎？",
  qaBody8:
    "如果清理瀏覽器時勾選了「網站資料與 Cookie」或「簡化網站儲存空間」，本地 IndexedDB 資料可能會被清除。強烈建議定期匯出 JSON 備份以保安全。",

  qaTitle9: "如果我想分享使用心得或提供建議，該如何聯繫開發者？",
  qaBody9:
    "歡迎點擊頁尾的「意見反饋」！無論是功能建議、使用心得，或是遇到的問題，我們都很期待收到你的聲音，希望能成為你學習與成長路上得力的工具夥伴。",

  //系統資料
  backupData: "備份資料 (JSON)",
  resumeData: "還原資料 (JSON)",
  privacyAlertNotice: `<strong>隱私與資料安全提醒：</strong><br />
      本工具採用本地儲存技術，<strong>不會上傳或收集您的任何個人資料</strong>。資料均存放於您的瀏覽器中，若您清除瀏覽器快取、使用無痕模式或更換裝置，資料將會歸零。請務必<strong>不定期手動下載 JSON 備份檔</strong>以確保資料安全。`,
  toastNoDataToExport: "目前尚無任務資料可供匯出！",
  toastExportCSVSuccess: "CSV 檔案下載成功！",
  csvHeaderMainTask: "主任務名稱",
  csvHeaderSubtask: "子任務名稱",
  csvHeaderStatus: "子任務狀態",
  csvHeaderTimeRange: "計時時間區間",
  csvHeaderDuration: "統計時間(分鐘)",
  csvHeaderNote: "備註",
  noSubtaskText: "無子任務",
  csvExportFileNamePrefix: "TaskTimer_CSV",
  toastNoDataToBackup: "目前尚無任何任務資料可供備份！",
  toastExportJSONSuccess: "JSON 備份檔案已成功下載！",
  toastExportFailed: "匯出失敗，請重試",
  jsonExportFileNamePrefix: "TaskTimer_Backup",
  toastInvalidBackupFormat: "無效的備份檔案格式，請確認是否為正確的 JSON 檔！",
  confirmImportPrefix: "確定要還原",
  confirmImportSuffix:
    "筆主任務資料嗎？\n⚠️ 注意：這將會覆蓋您目前的系統資料！",
  toastRestoreSuccess: "資料已成功還原！",
  toastParseJSONFailed: "無法解析此檔案，請確認檔案格式是否正確！",

  // footer
  footerFeedbackBtn: "意見回饋",
  footerPrivacyBtn: "隱私權政策",

  // privacy
  // Modal 標題與日期
  privacyTitle: "隱私權政策 (Privacy Policy)",
  privacyLastUpdated: "最後更新日期：2026 年 10 月 4 日",

  // 章節標題
  privacySec1Title: "1. 本地資料儲存（Local Storage & IndexedDB）",
  privacySec1Text:
    "TaskTimer 為純前端工具型應用程式。您的所有任務紀錄、計時歷史、分類設定與深色模式偏好，皆僅透過瀏覽器儲存在您的裝置本地端（LocalStorage / IndexedDB）。我們不會將您的個人任務資料傳輸或儲存至任何遠端伺服器。",

  privacySec2Title: "2. 意見回饋與聯絡資料",
  privacySec2Text:
    "當您使用網站的「意見回饋」功能時，您所填寫的姓名、電子郵件地址與回饋內容，將透過第三方服務 EmailJS 安全地傳送至開發者信箱。此資料僅用於問題排查與回復您的訊息，絕不作為商業行銷或轉售用途。",

  privacySec3Title: "3. 網站分析與 Cookie 技術",
  privacySec3Text:
    "為提升使用者體驗與優化網站功能，本網站可能會使用第三方分析工具（如 Google Analytics）收集匿名使用數據（包括訪問頁面、停留時間、裝置類型等）。這些數據不包含任何可識別個人身分的資訊。",

  privacySec4Title: "4. 外部連結與第三方服務",
  privacySec4Text:
    "本網站可能包含第三方網站（如 GitHub、第三方 CDN）的連結。對於這些外部網站的隱私做法或內容，本網站不負相關責任。",

  privacySec5Title: "5. 條款修改權",
  privacySec5Text:
    "開發者保留隨時修訂本隱私權政策之權利。最新修訂版本將隨時更新於此頁面。",
};
