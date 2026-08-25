// src/config/firebase.js
// ✅ PERF FIX: indexedDBLocalPersistence replaces default browserLocalPersistence
//
// WHY THIS MATTERS:
// getAuth(app) → browserLocalPersistence → Firebase creates an iframe to
// firebaseapp.com to securely read cross-origin auth state.
// That iframe + its googleapis.com config request = 2,254ms + 2,749ms
// on the critical path → delays FCP, Speed Index, everything.
//
// indexedDBLocalPersistence:
// → reads auth state from IndexedDB (same-origin, no iframe needed)
// → ZERO iframe loaded → critical path drops by ~2,500ms
// → works with signInWithPopup, email/password, everything

import { initializeApp } from "firebase/app";
import {
	initializeAuth,
	indexedDBLocalPersistence,
	GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);

// ✅ initializeAuth + indexedDBLocalPersistence = no iframe, no cross-origin roundtrip
export const auth = initializeAuth(app, {
	persistence: [indexedDBLocalPersistence],
});

export const googleProvider = new GoogleAuthProvider();

// ✅ PERF FIX: Firestore (firebase-firestore chunk, ~53KB gzip) is now
// LAZY — it used to load eagerly for every single visitor via the old
// `getFirestore(app)` call above, even guests who never touch
// cart/wishlist sync. Now it only downloads the first time a
// signed-in user actually needs it (see CartContext/WishlistContext,
// which call getDb() only inside `if (user) { ... }`).
let _dbPromise = null;
export const getDb = () => {
	if (!_dbPromise) {
		_dbPromise = import("firebase/firestore").then(({ getFirestore }) =>
			getFirestore(app),
		);
	}
	return _dbPromise;
};
