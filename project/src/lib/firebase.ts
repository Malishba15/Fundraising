import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

if (!firebaseConfig.projectId) {
  throw new Error('Missing Firebase environment variables');
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export interface Donation {
  id: string;
  donor_name: string;
  donor_email: string;
  amount: number;
  transaction_reference: string;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
  updated_at: string;
}