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

// Обработка уведомлений, когда приложение закрыто
messaging.onBackgroundMessage((payload) => {
  console.log('Фоновое сообщение:', payload);
  self.registration.showNotification(payload.notification?.title || 'Новое сообщение', {
    body: payload.notification?.body || 'У вас новое сообщение в чате',
    icon: '/icon-192.png'
  });
});

// Базовый кэш для PWA (чтобы приложение работало)
const CACHE_NAME = 'messenger-v1';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(clients.claim()));
self.addEventListener('fetch', () => {
  // Пропускаем все запросы в сеть как обычно
});
