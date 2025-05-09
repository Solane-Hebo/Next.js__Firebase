import { initializeApp, getApp, getApps} from "firebase/app";
import { CACHE_SIZE_UNLIMITED, getFiresStore, initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage} from "firebase/storage"
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
  };

  const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

  // const db = getFiresStore(app)

  let db
  try {
    db = initializeFirestore(app, {
      localCache: persistentLocalCache({
        tabManager: persistentMultipleTabManager(),
        cacheSizeBytes: CACHE_SIZE_UNLIMITED
      })
    })

  } catch (error) {
    console.warn("indexedDB cache avaktiverad:", error.code)
    db = getFiresStore(app)
  }

  const auth = getAuth(app)
  const storage = getStorage(app)
  export {
    db,
    auth,
    storage

  }

  