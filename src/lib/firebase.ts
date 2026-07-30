import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import firebaseConfig from "../../firebase-applet-config.json";

const app = initializeApp(firebaseConfig);

// If firestoreDatabaseId is provided, use it (typically for named databases).
// Otherwise, use getFirestore() which defaults to the (default) database.
const dbId = (firebaseConfig as { firestoreDatabaseId?: string }).firestoreDatabaseId;

export const db = dbId 
  ? initializeFirestore(app, { experimentalForceLongPolling: true }, dbId)
  : getFirestore(app);

export const auth = getAuth(app);
