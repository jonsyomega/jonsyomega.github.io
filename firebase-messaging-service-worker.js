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

// Обработка фоновых сообщений (когда приложение закрыто или свёрнуто)
messaging.onBackgroundMessage((payload) => {
  console.log('Фоновое сообщение:', payload);

  const notificationTitle = payload.notification?.title || 'Новое сообщение';
  const notificationOptions = {
    body: payload.notification?.body || 'У вас новое сообщение в чате',
    icon: '/icon-192.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
