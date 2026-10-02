export default {
  // SEO & Meta タグ
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

  toastInitDBFailed:
    "ローカルデータの読み込みに失敗しました。一時モードで動作します。",
  toastDuplicateTaskPrefix: "失敗：「",
  toastDuplicateTaskSuffix: "」という名前のメインタスクは既に存在します",
  toastAddMainTaskSuccessPrefix: "メインタスク「",
  toastAddMainTaskSuccessSuffix: "」を追加しました",
  promptEditMainTask: "メインタスク名を編集：",
  toastUpdateMainTaskSuccess: "メインタスク名を更新しました！",
  confirmDeleteMainTaskPrefix: "メインタスク「",
  confirmDeleteMainTaskSuffix:
    "」を削除してもよろしいですか？\n（含まれるすべてのサブタスクと計測記録も削除されます。この操作は元に戻せません）",
  toastDeleteMainTaskPrefix: "メインタスク「",
  toastDeleteMainTaskSuffix: "」を削除しました",
  toastDuplicateSubtaskPrefix: "失敗：「",
  toastDuplicateSubtaskSuffix: "」配下に同名のサブタスクが既に存在します",
  toastAddSubtaskSuccessPrefix: "サブタスク「",
  toastAddSubtaskSuccessSuffix: "」を追加しました",
  promptEditSubtask: "サブタスク名を編集：",
  toastSubtaskTitleEmpty: "サブタスク名を入力してください！",
  toastDuplicateSubtaskEditPrefix: "失敗：同じ名前のサブタスク「",
  toastDuplicateSubtaskEditSuffix: "」が既に存在します",
  toastUpdateSubtaskSuccess: "サブタスク名を更新しました！",
  toastSubtaskStatusUpdatedPrefix: "「",
  toastSubtaskStatusUpdatedMid: "」のステータスを更新しました：",
  confirmDeleteSubtaskPrefix: "サブタスク「",
  confirmDeleteSubtaskSuffix:
    "」を削除してもよろしいですか？\n（含まれるすべての計測記録も削除されます。この操作は元に戻せません）",
  toastDeleteSubtaskPrefix: "サブタスク「",
  toastDeleteSubtaskSuffix: "」を削除しました",
  promptEditNote: "メモを編集：",
  toastUpdateNoteSuccess: "メモを更新しました！",
  confirmDeleteRecord:
    "この計測記録を削除してもよろしいですか？\n（この操作は元に戻せません）",
  toastDeleteRecordSuccess: "計測記録を削除しました",
  noMainTaskSelected: "メインタスク未選択",
  noSubtaskSelected: "サブタスク未選択",
  noMainTasksAvailable: "メインタスクがありません",
  pleaseAddMainTask: "メインタスクを追加してください",
  pleaseSelectMainTask: "メインタスクを選択してください",
  noMainTasksAvailable: "メインタスクなし",
  pleaseSelectMainTaskFirst: "最初にメインタスクを選択してください",
  pleaseAddSubtask: "サブタスクを追加してください",
  noSubtasksInMainTask: "このメインタスクにはサブタスクがありません",
  pleaseSelectSubtask: "サブタスクを選択してください",
  selectMainTask: "メインタスクを選択",
  noMainTaskAccordionEmpty:
    "メインタスクがありません。「メインタスク管理」をクリックして追加を開始しましょう！",

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
  toastNoDataToExport: "エクスポートするタスクデータがありません！",
  toastExportCSVSuccess: "CSVバックアップのダウンロードが完了しました！",
  csvHeaderMainTask: "メインタスク名",
  csvHeaderSubtask: "サブタスク名",
  csvHeaderStatus: "ステータス",
  csvHeaderTimeRange: "計測時間帯",
  csvHeaderDuration: "時間(分)",
  csvHeaderNote: "メモ",
  noSubtaskText: "サブタスクなし",
  csvExportFileNamePrefix: "TaskTimer_Backup",
  toastNoDataToBackup: "バックアップするタスクデータがありません！",
  toastExportJSONSuccess: "JSONバックアップのダウンロードが完了しました！",
  toastExportFailed: "エクスポートに失敗しました。再試行してください",
  jsonExportFileNamePrefix: "TaskTimer_Backup",
  toastInvalidBackupFormat:
    "無効なバックアップファイル形式です。正しいJSONファイルか確認してください！",
  confirmImportPrefix: "本当に",
  confirmImportSuffix:
    "件のメインタスクデータを復元しますか？\n⚠️ 注意：現在のシステムデータが上書きされます！",
  toastRestoreSuccess: "データが正常に復元されました！",
  toastParseJSONFailed:
    "ファイルを解析できませんでした。形式が正しいか確認してください！",
};
