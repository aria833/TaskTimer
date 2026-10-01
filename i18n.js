// ==========================================
// 多語言字典
// ==========================================
const translations = {
  "zh-TW": {
    // 0. SEO & Meta 標籤
    seo: {
      title: "TaskTimer 任務計時器 | 陪你學習成長的計時小夥伴",
      description:
        "一款陪你學習成長的任務計時小夥伴！不用註冊帳號、打開就能用，所有資料都安心留在你的裝置裡。",
      keywords:
        "TaskTimer, 任務計時器, 時間追蹤, 學習工具, Local-First, IndexedDB, 鐵人賽",
      ogTitle: "TaskTimer | 高效專注的在地優先計時工具",
      ogDescription:
        "免註冊，專為學習打造的計時工具夥伴！TaskTimer 幫你紀錄學習歷程，資料 100% 自己掌握更放心。",
      twitterDescription: "免註冊、在地資料儲存的任務計時與管理工具。",
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
    mainTaskPlaceholder: "主任務名稱（例如：切版練習）",
    currentMainTask: "現有主任務列表",
    closeBtn: "關閉",
    modalSubtaskParentBtn: "請新增主任務",

    addSubTaskModalTitle: "新增子任務",
    addNewSubTask: "建立子任務",
    belongTo: "歸屬主任務",
    subTaskName: "子任務名稱",
    subTaskPlaceholder: "例如：修改程式碼",
    cancel: "取消",
    dropdownSubtaskBtn: "請先新增子任務",

    // 計時器區塊
    currentTask: "當前任務",
    currentMainTaskName: "未選取主任務",
    currentSubtaskName: "未選取子任務",

    startTimer: "開始計時",
    pauseTimer: "暫停",
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
    noSubtasks: "尚無子任務，請點擊「新增子任務」",

    //QA
    qaTitle1: "TaskTimer 任務計時器的主要特色是什麼？",
    qaBody1:
      "TaskTimer 是一款主打「極簡、專注、在地優先（Local-First）」的任務計時工具。結合了任務清單與時間統計，無須註冊帳號即可隨開即用。",

    qaTitle2: "如果計時到一半不小心按到「停止」，資料會遺失嗎？",
    qaBody2:
      "不用擔心！按下停止時，系統會自動彈出確認視窗，提供「儲存紀錄」與「捨棄計時」兩種選擇。且視窗具備防誤觸機制，不會因為點擊背景或按 Esc 鍵而意外關閉。",

    qaTitle3: "未滿 1 秒的計時也會被紀錄嗎？",
    qaBody3:
      "為了避免誤觸產生無效的垃圾資料，系統設定「計時未滿 1 秒」按下停止時會自動重置，不會跳出儲存視窗。",

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
      "匯出：點擊「下載 JSON 備份」，系統會自動產生帶有日期與版本號的備份檔。",
    qaBody73:
      "還原：點擊「選擇備份檔」，上傳先前匯出的 JSON 檔案即可完成還原（還原前請留意會覆蓋現有資料）。",

    qaTitle8: "清理瀏覽器歷史紀錄會導致資料消失嗎？",
    qaBody8:
      "如果清理瀏覽器時勾選了「網站資料與 Cookie」或「簡化網站儲存空間」，本地 IndexedDB 資料可能會被清除。強烈建議定期匯出 JSON 備份以保安全。",

    qaTitle9: "TaskTimer 支援哪些語系與主題？",
    qaBody9:
      "目前支援繁體中文、英文、日文。主題有淺色模式和深色模式，可以自行切換。",

    //系統資料
    backupData: "備份資料 (JSON)",
    resumeData: "還原資料 (JSON)",
    privacyAlertNotice: `<strong>隱私與資料安全提醒：</strong><br />
      本工具採用本地儲存技術，<strong>不會上傳或收集您的任何個人資料</strong>。資料均存放於您的瀏覽器中，若您清除瀏覽器快取、使用無痕模式或更換裝置，資料將會歸零。請務必<strong>不定期手動下載 JSON 備份檔</strong>以確保資料安全。`,
  },

  en: {
    // 0. SEO & Meta Tags
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

    // Timer
    currentTask: "Current Task",
    currentMainTaskName: "No main task selected",
    currentSubtaskName: "No subtask selected",

    startTimer: "Start Timer",
    pauseTimer: "Pause",
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

    qaTitle6:
      "Will my data still be available if I switch browsers or devices?",
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
  },

  ja: {
    // 0. SEO & Meta タグ
    seo: {
      title: "TaskTimer | 成長をサポートするローカルファーストタスクタイマー",
      description:
        "学習と成長に寄り添うタスクタイマー！アカウント登録不要ですぐに使え、すべてのデータは端末内に安全に保存されます。",
      keywords:
        "TaskTimer, タスクタイマー, 時間管理, 学習ツール, Local-First, IndexedDB",
      ogTitle: "TaskTimer | 集中力を高めるローカルファーストタイマー",
      ogDescription:
        "登録不要！学習記録をサポートし、データを100%自分で管理できる安心のタイマーツールです。",
      twitterDescription:
        "登録不要・ローカルデータ保存のタスクタイマー＆時間管理ツール。",
    },

    // Header & App Title
    appName: "TaskTimer",
    darkModeLabel: "ダークモード",

    //Nav
    navTimer: "タイマー",
    navTask: "タスク一覧",
    navQA: "よくある質問",
    navData: "システムデータ",

    // メインタスク・サブタスクを選択
    mainTask: "メインタスク",
    manageBtn: "管理",
    subTask: "サブタスク",
    addBtn: "追加",

    manageMainTaskModalTitle: "メインタスクを管理",
    addMainTaskTitle: "メインタスクを追加",
    mainTaskPlaceholder: "メインタスク名（例：レイアウト練習）",
    currentMainTask: "現在のメインタスク一覧",
    closeBtn: "閉じる",
    modalSubtaskParentBtn: "メインタスクを追加してください",

    addSubTaskModalTitle: "サブタスクを追加",
    addNewSubTask: "サブタスクを作成",
    belongTo: "メインタスク",
    subTaskName: "サブタスク名",
    subTaskPlaceholder: "例：コードを修正",
    cancel: "キャンセル",
    dropdownSubtaskBtn: "先にサブタスクを追加してください",

    // タイマー
    currentTask: "現在のタスク",
    currentMainTaskName: "メインタスクが選択されていません",
    currentSubtaskName: "サブタスクが選択されていません",

    startTimer: "タイマー開始",
    pauseTimer: "一時停止",
    stopTimer: "終了",

    note: "メモ",
    noteSample: "メモや振り返りを入力してください",
    noteInfo:
      "タイマーを終了すると、このメモは時間記録と一緒にタスク一覧に保存されます。",

    idleTimer: "アイドル通知",
    idle15: "15分",
    idle30: "30分",
    idle45: "45分",
    idle60: "60分",

    showSeconds: "秒数を表示",

    backupReminder:
      "データはブラウザにのみ保存されます。キャッシュを削除するとデータが失われる可能性があるため、定期的にシステムデータからバックアップをダウンロードしてください。",

    completeTimer: "タイマー完了！",
    sessionDuration: "セッション時間",
    noteTitle: "メモ（任意）",
    noteArea: "完了したことや思ったことを記録しましょう...",
    isCompleted: "このタスクを完了済みにする",

    discardRecord: "今回の記録を破棄",
    saveRecord: "記録を保存",

    //タスクリスト
    downloadCSV: "CSVファイルをダウンロード",
    statusNotStarted: "未着手",
    statusInProgress: "進行中",
    statusCompleted: "完了",
    unitDay: "日",
    unitHour: "時間",
    unitMinute: "分",
    viewRecords: "計時とメモの記録を確認",
    labelTotal: "合計",
    recordCountText: "全 {count} 件の記録",
    labelNote: "メモ",
    noNote: "メモなし",
    noRecords: "計測履歴はありません",
    editNoteTitle: "メモを編集",
    deleteRecordTitle: "履歴を削除",

    //QA
    qaTitle1: "TaskTimer の主な特徴は何ですか？",
    qaBody1:
      "TaskTimer は「シンプル・集中・Local-First（ローカルファースト）」を重視したタスクタイマーです。タスク一覧と時間の記録・集計を組み合わせており、アカウント登録なしですぐに利用できます。",

    qaTitle2:
      "タイマーの途中で誤って「終了」を押した場合、データは失われますか？",
    qaBody2:
      "ご安心ください。「終了」を押すと確認画面が表示され、「記録を保存」と「今回の記録を破棄」の2つの選択肢から選べます。また、誤操作を防ぐため、背景をクリックしたり Esc キーを押したりしても確認画面が誤って閉じることはありません。",

    qaTitle3: "1秒未満の計測も記録されますか？",
    qaBody3:
      "誤操作による不要なデータの作成を防ぐため、1秒未満の計測で「終了」を押した場合は自動的にリセットされ、保存確認画面は表示されません。",

    qaTitle4: "メモ欄は必須ですか？",
    qaBody4:
      "メモ欄は任意です。そのときの集中した作業内容や具体的な進捗、振り返りなどを記録できます。入力しなくても、計測時間は正常に記録されます。",

    qaTitle5: "タスクや計測データはサーバーにアップロードされますか？",
    qaBody5:
      "いいえ。TaskTimer は Local-First（ローカルファースト）アーキテクチャを採用しています。すべてのタスク、メモ、時間記録は IndexedDB を使用してお使いのブラウザにローカル保存されます。個人情報を収集することはありません。",

    qaTitle6: "ブラウザやデバイスを変更した場合、データは残りますか？",
    qaBody6:
      "データは1つのブラウザにローカル保存されるため、デバイスを変更したりブラウザのキャッシュを削除したりしても、自動的には同期されません。デバイス間でデータを移行する場合は、「システムデータ」ページの「JSONバックアップのエクスポート」機能を使用することをおすすめします。",

    qaTitle7: "データをバックアップ・復元するにはどうすればよいですか？",
    qaBody71: "「システムデータ」タブを開きます：",
    qaBody72:
      "エクスポート：「JSONバックアップをダウンロード」をクリックすると、日付とバージョン番号が付いたバックアップファイルが自動的に作成されます。",
    qaBody73:
      "復元：「バックアップファイルを選択」をクリックし、以前にエクスポートした JSON ファイルをアップロードすると復元できます。復元すると既存のデータが上書きされるため、ご注意ください。",

    qaTitle8: "ブラウザの履歴を削除するとデータも消えますか？",
    qaBody8:
      "ブラウザのデータを削除する際に「Webサイトのデータと Cookie」や「サイトのストレージを削除」などの項目を選択すると、ローカルに保存されている IndexedDB のデータも削除される可能性があります。データを安全に保管するため、定期的に JSON バックアップをエクスポートすることをおすすめします。",

    qaTitle9: "TaskTimer はどの言語とテーマに対応していますか？",
    qaBody9:
      "現在、繁体字中国語、英語、日本語に対応しています。テーマはライトモードとダークモードに対応しており、自由に切り替えることができます。",
    //データ
    backupData: "データをバックアップ（JSON）",
    resumeData: "データを復元（JSON）",
    privacyAlertNotice: `<strong>プライバシーとデータセキュリティに関するご注意：</strong><br/>
      本ツールはローカルストレージ技術を使用しており、<strong>個人データをアップロードまたは収集することはありません</strong>。データはすべてブラウザ内に保存されるため、キャッシュ消去、シークレットモードの使用、端末変更を行うとデータがリセットされます。データの安全を確保するため、定期的に<strong>JSONバックアップを手動でダウンロード</strong>してください。`,
  },
};

// ==========================================
// 預設語系（優先讀取 localStorage，若無則預設 zh-TW）
// ==========================================
let currentLang = localStorage.getItem("app_lang") || "zh-TW";

// 更新 <head> 中的 SEO 與 Meta 標籤
function updateMetaTags(lang) {
  const seo = translations[lang]?.seo;
  if (!seo) return;

  // 1. 更新 document.title
  document.title = seo.title;

  // 2. 更新 Meta 標籤
  setMetaContent('meta[name="description"]', seo.description);
  setMetaContent('meta[name="keywords"]', seo.keywords);

  // 3. 更新 Open Graph (OG) 社群標籤
  setMetaContent('meta[property="og:title"]', seo.ogTitle);
  setMetaContent('meta[property="og:description"]', seo.ogDescription);
  setMetaContent(
    'meta[property="og:locale"]',
    lang === "zh-TW" ? "zh_TW" : lang === "ja" ? "ja_JP" : "en_US",
  );

  // 4. 更新 Twitter Card 標籤
  setMetaContent('meta[name="twitter:title"]', seo.ogTitle);
  setMetaContent('meta[name="twitter:description"]', seo.twitterDescription);

  // 5. 同步更新 <html> 的 lang 屬性
  document.documentElement.lang = lang;
}

// ==========================================
// 輔助函式：設定 Meta Tag 的 content 屬性
// ==========================================
function setMetaContent(selector, value) {
  const element = document.querySelector(selector);
  if (element && value) {
    element.setAttribute("content", value);
  }
}

// ==========================================
// 切換語言主函式
// ==========================================
function changeLanguage(lang) {
  if (!translations[lang]) return;

  currentLang = lang;
  localStorage.setItem("app_lang", lang);

  // 1. 更新 <head> SEO / Meta 標籤
  updateMetaTags(lang);

  // 2. 更新有 data-i18n 屬性的靜態 HTML 文字 (textContent)
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });

  // 2-1. 更新有 data-i18n-placeholder 屬性的 input/textarea 提示文字
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.getAttribute("data-i18n-placeholder");
    if (translations[lang] && translations[lang][key]) {
      element.setAttribute("placeholder", translations[lang][key]);
    }
  });

  // 2-2 新增：更新包含 HTML 標籤的內容 (innerHTML)
  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    const key = element.getAttribute("data-i18n-html");
    if (translations[lang] && translations[lang][key]) {
      element.innerHTML = translations[lang][key];
    }
  });

  // 4 重新渲染任務清單（維持動態組件語系同步）
  if (typeof renderTaskAccordion === "function") {
    renderTaskAccordion();
  }

  // 5 確保下拉選單顯示目前選取的語系
  const langSelect = document.getElementById("languageSelect");
  if (langSelect) {
    langSelect.value = lang;
  }
}

// 頁面初次載入完畢後，執行初始化
document.addEventListener("DOMContentLoaded", () => {
  changeLanguage(currentLang);
});
