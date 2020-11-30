import env from "./env.json";
import { useState, useCallback, useRef, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { Editor, EditorList, ItemList, Item } from "./schema";

export const firebaseConfig = {
  apiKey: env.API_KEY,
  authDomain: env.AUTH_DOMAIN,
  databaseURL: env.DATABASE_URL,
  projectId: env.PROJECT_ID,
  storageBucket: env.STORAGE_BUCKET,
  messagingSenderId: env.MESSAGING_SENDER_ID,
  appId: env.APP_ID,
};

export function useLogin(docId: string) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [, , , updateEditors] = useUpdateEditors(docId);

  const handleLogin = useCallback(
    (email, password) => {
      setSuccess(false);
      setError("");
      if (!email || !password) {
        setError("Please enter a valid email and password.");
      } else {
        const loginWithFirebase = async () => {
          setLoading(true);
          try {
            await firebase.auth().signInWithEmailAndPassword(email, password);

            updateEditors(firebase.auth().currentUser?.uid as string, {
              active: true,
            });
            setSuccess(true);
          } catch (e) {
            setError(e.message);
          }
          setLoading(false);
        };
        loginWithFirebase();
      }
    },
    [updateEditors]
  );

  return [error, loading, success, handleLogin] as [
    string,
    boolean,
    boolean,
    (email: string, password: string) => void
  ];
}

interface FirebaseData {
  meta: any;
  editors: EditorList;
  items: ItemList;
}

export function useData(docId: string) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState({
    meta: {},
    editors: [],
    items: [],
  } as FirebaseData);

  const db = firebase.firestore();
  const collectionRef = useRef(db.collection("items"));

  useEffect(() => {
    const queryWithFirebase = async () => {
      setLoading(true);
      setSuccess(false);
      setError("");
      try {
        await collectionRef.current.doc(docId).onSnapshot((_data) => {
          setData((data) => ({ ...data, meta: _data.data() }));
        });
        await collectionRef.current
          .doc(docId)
          .collection("editors")
          .where("active", "==", true)
          .onSnapshot((_data) => {
            const _editors = _data.docs.map(
              (doc) =>
                ({
                  ...doc.data(),
                  id: doc.id,
                } as Editor)
            );
            setData((data) => ({ ...data, editors: _editors as EditorList }));
          });
        await collectionRef.current
          .doc(docId)
          .collection("items")
          .onSnapshot((_data) => {
            const _items = _data.docs.map(
              (doc) =>
                ({
                  ...doc.data(),
                  id: doc.id,
                } as Item)
            );
            setData((data) => ({ ...data, items: _items as ItemList }));
          });
        setSuccess(true);
      } catch (e) {
        setError(e.message);
      }
      setLoading(false);
    };
    queryWithFirebase();
  }, [collectionRef, setError, setLoading, docId]);

  return [error, loading, success, data] as [
    string,
    boolean,
    boolean,
    FirebaseData
  ];
}

export function useUpdateItem(docId: string) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const db = firebase.firestore();
  const collectionRef = useRef(db.collection("items"));

  const updateItem = useCallback(
    (itemId: string, data: {}) => {
      const queryWithFirebase = async () => {
        setLoading(true);
        setSuccess(false);
        setError("");
        try {
          await collectionRef.current
            .doc(docId)
            .collection("items")
            .doc(itemId)
            .update(data);
          setSuccess(true);
        } catch (e) {
          setError(e.message);
        }
        setLoading(false);
      };
      queryWithFirebase();
    },
    [docId, collectionRef, setError, setLoading]
  );

  return [error, loading, success, updateItem] as [
    string,
    boolean,
    boolean,
    (itemId: string, data: {}) => void
  ];
}

export function useCreateItem(docId: string) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const db = firebase.firestore();
  const collectionRef = useRef(db.collection("items"));

  const createItem = useCallback(
    (data: {}) => {
      const queryWithFirebase = async () => {
        setLoading(true);
        setSuccess(false);
        setError("");
        try {
          await collectionRef.current.doc(docId).collection("items").add(data);
          setSuccess(true);
        } catch (e) {
          setError(e.message);
        }
        setLoading(false);
      };
      queryWithFirebase();
    },
    [docId, collectionRef, setError, setLoading]
  );

  return [error, loading, success, createItem] as [
    string,
    boolean,
    boolean,
    (data: {}) => void
  ];
}

export function useUpdateEditors(docId: string) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const db = firebase.firestore();
  const collectionRef = useRef(db.collection("items"));

  const updateEditor = useCallback(
    (itemId: string, data: {}) => {
      const queryWithFirebase = async () => {
        setLoading(true);
        setSuccess(false);
        setError("");
        try {
          await collectionRef.current
            .doc(docId)
            .collection("editors")
            .doc(itemId)
            .update(data);
          setSuccess(true);
        } catch (e) {
          setError(e.message);
        }
        setLoading(false);
      };
      queryWithFirebase();
    },
    [docId, collectionRef, setError, setLoading]
  );

  return [error, loading, success, updateEditor] as [
    string,
    boolean,
    boolean,
    (itemId: string, data: {}) => void
  ];
}
