// ==========================================
// 日文版語系字典：ja.js
// ==========================================

export default {
  // SEO & Meta タグ
  seo: {
    index: {
      title: "TaskTimer | 学習と成長に寄り添うタイマー",
      description:
        "TaskTimerは、登録不要で使えるタスクタイマー・時間管理ツールです。学習や仕事、プロジェクト管理に活用でき、データはお使いのデバイスにローカル保存されます。ブラウザですぐに利用できます。",
      keywords: "TaskTimer, タスクタイマー, 時間管理, 学習ツール",
      ogTitle: "TaskTimer | 学習と成長に寄り添うタイマー",
      ogDescription:
        "登録不要ですぐに使えるタスクタイマー。タスクを細かく分けて時間を記録し、すべてのデータをお使いのデバイスに保存できます。",
      twitterDescription:
        "登録不要で使えるタスクタイマー・時間管理ツール。学習や仕事、プロジェクト管理に活用できます。",
    },

    privacy: {
      title: "プライバシーポリシー｜TaskTimer",
      ogTitle: "プライバシーポリシー｜TaskTimer",
    },
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
  mainTaskPlaceholder: "メインタスク名（例：JavaScriptを学ぶ）",
  currentMainTask: "現在のメインタスク一覧",
  closeBtn: "閉じる",
  modalSubtaskParentBtn: "メインタスクを追加してください",

  addSubTaskModalTitle: "サブタスクを追加",
  addNewSubTask: "サブタスクを作成",
  belongTo: "メインタスク",
  subTaskName: "サブタスク名",
  subTaskPlaceholder: "例：if文の練習",
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
  toastDuplicateSubtaskSuffix: "」に同名のサブタスクが既に存在します",
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
    "」を削除してもよろしいですか？\n（含まれるすべての記録も削除されます。この操作は元に戻せません）",
  toastDeleteSubtaskPrefix: "サブタスク「",
  toastDeleteSubtaskSuffix: "」を削除しました",
  promptEditNote: "メモを編集：",
  toastUpdateNoteSuccess: "メモを更新しました！",
  confirmDeleteRecord:
    "この記録を削除してもよろしいですか？\n（この操作は元に戻せません）",
  toastDeleteRecordSuccess: "記録を削除しました",
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
  btnCancel: "キャンセル",
  btnConfirm: "確認",
  // モーダルタイトル
  modalEditTaskTitle: "メインタスク名の編集",
  modalEditSubtaskTitle: "サブタスク名の編集",

  // プロンプト＆トースト
  promptEditMainTask: "メインタスク名を変更：",
  promptEditSubtask: "サブタスク名を変更：",
  toastDuplicateTaskPrefix: "更新に失敗しました：「",
  toastDuplicateTaskSuffix: "」というメインタスクは既に使用されています",
  toastUpdateMainTaskSuccess: "メインタスク名を更新しました！",
  toastSubtaskTitleEmpty: "サブタスク名は空欄にできません！",
  toastDuplicateSubtaskEditPrefix: "更新に失敗しました：同じサブタスク「",
  toastDuplicateSubtaskEditSuffix: "」が既に存在します",
  toastUpdateSubtaskSuccess: "サブタスク名を更新しました！",

  // タイマー
  currentTask: "現在のタスク：",
  currentMainTaskName: "メインタスクが選択されていません",
  currentSubtaskName: "サブタスクが選択されていません",

  startTimer: "開始",
  pauseTimer: "一時停止",
  continueTimer: "再開",
  stopTimer: "終了",

  note: "メモ",
  noteSample: "メモや振り返りを入力してください",
  noteInfo:
    "タイマーを終了すると、このメモは時間記録と一緒にタスク一覧に保存されます。",

  idleTimer: "無操作警告",
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
  toastSaveSessionSuccess: "タイマー記録を保存しました！",
  confirmIdle: (minutes) =>
    ` ${minutes}分以上操作がありません。現在のタイマー記録を終了して保存しますか？`,
  toastOffline: "⚠️ 現在オフラインです。データはローカルに安全に保存されます。",
  toastOnline: "🟢 インターネット接続が復旧しました",
  toastDiscardSession: "今回のタイマー記録を破棄しました。",

  //タスクリスト
  downloadCSV: "CSVをダウンロード",
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
  noRecords: "履歴はありません",
  editNoteTitle: "メモを編集",
  deleteRecordTitle: "履歴を削除",

  //QA
  qaTitle1: "TaskTimer の主な特徴は何ですか？",
  qaBody1:
    "TaskTimerは、便利なタイマーとしてだけでなく、タスクを細かく分けるという考え方も取り入れています。大きな学習目標を小さなステップに分け、それぞれの学習時間や進捗状況を記録する練習にも役立ちます。また、学習進捗バーを通して、自分の成長を視覚的に確認できます。",

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

  qaTitle9:
    "利用した感想や意見を伝えたい場合、開発者にはどのように連絡できますか？",
  qaBody9:
    "ぜひフッターの「フィードバック」からお寄せください！機能へのご提案や利用した感想、困ったことなど、皆さんの声をお待ちしています。TaskTimerが、学習と成長の道のりに寄り添う頼れるツールになれば嬉しいです。",
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

  // footer
  footerFeedbackBtn: "フィードバック",
  footerPrivacyBtn: "プライバシーポリシー",

  // Privacy
  privacyTitle: "プライバシーポリシー｜TaskTimer",
  privacyLastUpdated: "最終更新日：2026年10月11日",
  privacySec1Title: "1. ローカルデータの保存",
  privacySec1Text:
    "TaskTimer のタスク、サブタスク、メモ、計測記録は現在のブラウザの IndexedDB に保存されます。言語、テーマ、秒数表示、無操作リマインダーなどの設定は LocalStorage に保存されます。TaskTimer がこれらのアプリデータを開発者のサーバーへ積極的にアップロードすることはありません。サイトデータの削除やブラウザ／端末の変更によりデータが失われる可能性があるため、システムデータ機能から定期的にバックアップをエクスポートしてください。",
  privacySec2Title: "2. アカウントと連絡先情報",
  privacySec2Text:
    "TaskTimer はアカウント登録を必要とせず、アプリ内でユーザープロフィールを作成しません。外部の連絡手段で開発者に連絡した場合、提供された連絡先情報とメッセージは問い合わせへの対応に使用します。不要な機密情報や個人情報は送信しないでください。",
  privacySec3Title: "3. Google Analytics、広告、Cookie",
  privacySec3Text:
    "本サイトは利用状況の測定に Google Analytics（Google tag）を、広告表示に Google AdSense を読み込みます。これらの第三者サービスは、Cookie、類似技術、または端末／ブラウザ情報を使って、アクセス状況や広告関連データを処理する場合があります。実際の取り扱いは Google のポリシーと設定に依存し、すべてのデータが完全に匿名である、または個人を識別できないことを保証するものではありません。",
  privacySec4Title: "4. サードパーティサービスと外部リソース",
  privacySec4Text:
    "本サイトは Bootstrap や Bootstrap Icons などの外部リソースを第三者 CDN から読み込みます。読み込み時にブラウザから各提供者へリクエストが送信され、IP アドレスやブラウザ情報などの技術情報が提供者に伝わる場合があります。データの取り扱いは各サービスのプライバシーポリシーに従います。",
  privacySec5Title: "5. データの安全性とユーザーの選択",
  privacySec5Text:
    "タスク内容と計測記録は主にブラウザ内に保存されます。端末を適切に管理し、定期的にバックアップをエクスポートしてください。ブラウザ設定からサイトデータの管理・削除や Cookie の管理ができます。第三者 Cookie を無効化または制限すると、一部の分析機能や広告機能に影響する場合があります。",
  privacySec6Title: "6. ポリシーの更新と連絡",
  privacySec6Text:
    "製品機能や適用される要件の変更に応じて、本ポリシーを更新する場合があります。最新版と更新日はこのページに掲載します。",
  confirmLeaveTimer:
    "終了していないタイマー記録があります。タイマーページを離れますか？記録は保存されません。",
};
