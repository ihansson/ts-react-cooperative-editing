import env from "./env.json";
import { useState, useCallback, useRef, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

export const firebaseConfig = {
  apiKey: env.API_KEY,
  authDomain: env.AUTH_DOMAIN,
  databaseURL: env.DATABASE_URL,
  projectId: env.PROJECT_ID,
  storageBucket: env.STORAGE_BUCKET,
  messagingSenderId: env.MESSAGING_SENDER_ID,
  appId: env.APP_ID,
};

firebase.initializeApp(firebaseConfig);

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = useCallback((email, password) => {
    setSuccess(false);
    setError("");
    if (!email || !password) {
      setError("Please enter a valid email and password.");
    } else {
      const loginWithFirebase = async () => {
        setLoading(true);
        try {
          await firebase.auth().signInWithEmailAndPassword(email, password);
          setSuccess(true);
        } catch (e) {
          setError(e.message);
        }
        setLoading(false);
      };
      loginWithFirebase();
    }
  }, []);

  return [error, loading, success, handleLogin] as [
    string,
    boolean,
    boolean,
    (email: string, password: string) => void
  ];
}

interface FirebaseData {}

export function useData() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState({} as FirebaseData);

  const db = firebase.firestore();
  const collectionRef = useRef(db.collection("items"));

  useEffect(() => {
    const queryWithFirebase = async () => {
      setLoading(true);
      setSuccess(false);
      setError("");
      try {
        await collectionRef.current.onSnapshot((results) => {
          const _data = results.docs as Array<any>;
          setData(_data);
        });
        setSuccess(true);
      } catch (e) {
        setError(e.message);
      }
      setLoading(false);
    };
    queryWithFirebase();
  }, [collectionRef, setError, setLoading]);

  return [error, loading, success, data] as [
    string,
    boolean,
    boolean,
    FirebaseData
  ];
}
