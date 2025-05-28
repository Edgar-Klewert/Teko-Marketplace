import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const requiredEnvVars = [
	"NEXT_PUBLIC_FIREBASE_API_KEY",
	"NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
	"NEXT_PUBLIC_FIREBASE_PROJECT_ID",
	"NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
	"NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
	"NEXT_PUBLIC_FIREBASE_APP_ID",
];

for (const key of requiredEnvVars) {
	if (!process.env[key]) {
		throw new Error(`Variável de ambiente ausente: ${key}`);
	}
}

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
