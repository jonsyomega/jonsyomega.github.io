portScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

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

messaging.onBackgroundMessage((payload) => {
  console.log('[service-worker.js] Фоновое сообщение:', payload);
 
  const title = payload.data?.title || 'Новое сообщение';
  const body = payload.data?.body || 'У вас новое сообщение в чате';
 
  // Получаем ID комнаты из данных пуша (мы добавим его в bright-task)
  const roomId = payload.data?.room_id || '';
  const senderId = payload.data?.sender_id || '';

  const notificationOptions = {
    body: body,
    icon: '/icon-192.png',
    data: {
      url: `/messenger.html?room=${roomId}&sender=${senderId}`
    }
  };

  self.registration.showNotification(title, notificationOptions);
});

// Обработка клика по уведомлению
self.addEventListener('notificationclick', (event) => {
  event.notification.close(); // Закрываем уведомление

  // Получаем ссылку из данных уведомления
  const urlToOpen = event.notification.data.url;

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      // Проверяем, открыто ли уже окно мессенджера
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url.includes('messenger.html') && 'focus' in client) {
          // Если открыто — фокусируемся на нем и меняем URL
          return client.focus().then(() => client.navigate(urlToOpen));
        }
      }
      // Если не открыто — открываем новое окно
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

const CACHE_NAME = 'messenger-v1';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(clients.claim()));
self.addEventListener('fetch', () => {});
