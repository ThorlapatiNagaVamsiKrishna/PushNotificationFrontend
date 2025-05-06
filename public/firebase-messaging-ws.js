importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAWG1zHs3AR6FgDNI4aOrIC4bdWGUQx1dY",
  authDomain: "cloudmessage-e6e50.firebaseapp.com",
  projectId: "cloudmessage-e6e50",
  storageBucket: "cloudmessage-e6e50.appspot.com",
  messagingSenderId: "1385117884",
  appId: "1:1385117884:web:758e7d3a193419d0d0f8b9",
  measurementId: "G-38FEX8DFG8"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-ws.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
    image: payload.notification.image
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
