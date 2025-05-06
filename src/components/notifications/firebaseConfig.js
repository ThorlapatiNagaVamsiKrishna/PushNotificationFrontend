import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAWG1zHs3AR6FgDNI4aOrIC4bdWGUQx1dY",
  authDomain: "cloudmessage-e6e50.firebaseapp.com",
  projectId: "cloudmessage-e6e50",
  storageBucket: "cloudmessage-e6e50.firebasestorage.app",
  messagingSenderId: "1385117884",
  appId: "1:1385117884:web:758e7d3a193419d0d0f8b9",
  measurementId: "G-38FEX8DFG8"
};


const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const getAccessToken = async () => {
  const permission = await Notification.requestPermission()
  if (permission === 'granted') {
    const registration = await navigator.serviceWorker.register("/firebase-messaging-ws.js");
    const token = await getToken(messaging, {
      vapidKey: 'BBo9OfdDGuG_belE95pgOCGfjYsSPLwG9WWxKt-GXJEysD_nM0mq4OJ_6Im1_tULcZ7yRL8-GY9X9TCerXkabYE',
      serviceWorkerRegistration: registration
    })
    return token
  }
}


export { getAccessToken, messaging }