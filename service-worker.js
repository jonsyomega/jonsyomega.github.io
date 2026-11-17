// Подключаем Firebase для фоновых уведомлений
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

// Твой конфиг Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAk2qhmu4GJQozcU74_FNQWhzk4T7P-gPU",
  authDomain: "my-messenger-95eda.firebaseapp.com",
  projectId: "my-messenger-95eda",
  storageBucket: "my-messenger-95eda.firebasestorage.app",
  messagingSenderId: "327505492353",
  appId: "1:327505492353:web:3306144f22b8ac16eb9080"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Обработка уведомлений, когда приложение закрыто или свёрнуто
messaging.onBackgroundMessage((payload) => {
  console.log('[service-worker.js] Фоновое сообщение:', payload);
 
  // Берем данные из data (так как мы убрали notification в bright-task)
  const title = payload.data?.title || 'Новое сообщение';
  const body = payload.data?.body || 'У вас новое сообщение в чате';
 
  const notificationOptions = {
    body: body,
    icon: '/icon-192.png' // Убедись, что эта иконка есть в корне репозитория
  };

  self.registration.showNotification(title, notificationOptions);
});

// Базовый кэш для PWA (чтобы приложение работало и устанавливалось)
const CACHE_NAME = 'messenger-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Пропускаем все запросы в сеть как обычно
});
