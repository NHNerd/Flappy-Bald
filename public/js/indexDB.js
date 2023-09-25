import { zeroscoreAlertDOM } from './DOM.js';
import { scoreDOM } from './DOM.js';

let db;
let isIndexDBOpened = false;
let topUsersIDB = [];

export function indexDB() {
  if (!window.indexedDB) {
    window.alert(`IndexDB: This Browser don't suppurt indexDB`);
    return;
  }

  const openOrCreateDB = window.indexedDB.open('flappy-bald', 1);

  openOrCreateDB.addEventListener('error', (error) => console.error('Error opening DB ' + error));

  openOrCreateDB.addEventListener('success', (e) => {
    console.log('IndexDB: Successfully opened DB');
    db = e.target.result;

    return (isIndexDBOpened = true);
  });

  openOrCreateDB.addEventListener('upgradeneeded', (e) => {
    console.log('IndexDB: DB is upgraded ');
    db = e.target.result;
    if (!db.objectStoreNames.contains('users')) {
      db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
    }
  });
}

export function indexDBAdd(name, score) {
  if (score === 0) {
    zeroscoreAlertDOM.style.animation = 'ZeroscoreAlertAlert 3.2s ease-out';
    scoreDOM.style.zIndex = 1;
    setTimeout(() => {
      // clear
      scoreDOM.style.zIndex = 2;
      zeroscoreAlertDOM.style.animation = '';
    }, 4500);
    return;
  }

  const user = {
    name: name,
    score: score,
  };

  const transaction = db.transaction(['users'], 'readwrite');
  const objectStore = transaction.objectStore('users');

  const request = objectStore.add(user);

  request.onsuccess = () => {
    console.log(`IndexDB: User is added: ${name}`);
  };

  request.onerror = (error) => {
    console.error('IndexDB: Error adding user:', error);
  };
}

export function getAllUsers(callback) {
  // chek per 0.3s -  is DB open?
  const intervalId = setInterval(() => {
    const transaction = db.transaction(['users'], 'readonly');
    const objectStore = transaction.objectStore('users');
    const request = objectStore.getAll();

    request.onsuccess = (e) => {
      topUsersIDB = e.target.result;
      topUsersIDB.sort((a, b) => b.score - a.score);

      callback(topUsersIDB);
    };

    request.onerror = (error) => {
      console.log('IndexDB: Unsuccess getig users :( : ' + error);
    };

    // ? stop interval if isIndexDBOpened === true
    if (isIndexDBOpened) {
      clearInterval(intervalId);
    }
  }, 300);
}

export { topUsersIDB };
