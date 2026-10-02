// ==========================================
// TaskTimer - IndexedDB 封裝模組 (db.js)
// ==========================================

const DB_NAME = "TaskTimerDB";
const DB_VERSION = 1;
const STORE_NAME = "tasks";

let dbInstance = null; // 暫存開啟後的資料庫連線，避免重複開啟

// ==========================================
// 1. 開啟資料庫 (Open Database)
// ==========================================
export function openDB() {
  return new Promise((resolve, reject) => {
    // 如果已經連線過，直接回傳連線，不用重複開啟
    if (dbInstance) {
      resolve(dbInstance);
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    // 首次建立資料庫或升級版本時觸發（用來建表）
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        // 建立名為 tasks 的資料表，並以 'id' 當作主鍵
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };

    // 成功開啟資料庫
    request.onsuccess = (event) => {
      dbInstance = event.target.result;
      resolve(dbInstance); // 代表成功完成，回傳 db 連線
    };

    // 開啟失敗
    request.onerror = (event) => {
      console.error("IndexedDB 開啟失敗：", event.target.error);
      reject(event.target.error);
    };
  });
}

// ==========================================
// 2. 讀取所有任務資料 (Read)
// ==========================================
export async function getAllTasksFromDB() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result || []);
    request.onerror = (e) => reject(e.target.error);
  });
}

// ==========================================
// 3. 儲存/更新所有任務資料 (Save / Update)
// 當畫面的 tasks 陣列有變動時，呼叫此函式將最新資料寫入瀏覽器
// ==========================================
export async function saveAllTasksToDB(tasksArray) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    // 先清空舊資料，再寫入最新的整包 tasks 陣列
    const clearRequest = store.clear();

    clearRequest.onsuccess = () => {
      tasksArray.forEach((task) => {
        store.put(task); // put 會自動新增或覆蓋
      });
    };

    // 整筆交易成功完成時觸發
    transaction.oncomplete = () => resolve(true);
    transaction.onerror = (e) => reject(e.target.error);
  });
}
