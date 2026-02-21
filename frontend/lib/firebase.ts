import { initializeApp, getApps } from "firebase/app"
import { getAnalytics, isSupported } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyB5VvOgZzK8jiYlZVvwzIJKCmwWT6JH_xM",
  authDomain: "real-or-cake-f66e8.firebaseapp.com",
  projectId: "real-or-cake-f66e8",
  storageBucket: "real-or-cake-f66e8.firebasestorage.app",
  messagingSenderId: "246628359118",
  appId: "1:246628359118:web:ee1f7de421b37fa017a99f",
  measurementId: "G-ZKP04YDV4K",
}

// Prevent re-initializing on hot reloads in dev
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

// Analytics only runs in the browser
if (typeof window !== "undefined") {
  isSupported().then((yes) => {
    if (yes) getAnalytics(app)
  })
}

export { app }
