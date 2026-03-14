import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

const NEWS_COL = "news";

// Barcha yangiliklar — yangi birinchi
export async function getNews() {
  const q = query(collection(db, NEWS_COL), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Yangilik qo'shish
export async function addNewsToDb(item) {
  await addDoc(collection(db, NEWS_COL), {
    ...item,
    createdAt: serverTimestamp(),
  });
}

// Yangilik o'chirish
export async function deleteNewsFromDb(id) {
  await deleteDoc(doc(db, NEWS_COL, id));
}