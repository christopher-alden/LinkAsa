import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  addDoc,
  Timestamp,
  onSnapshot,
} from "firebase/firestore";
import { clientDb } from "../lib/firebase";

export const fetchRoomChat = (roomID, setMessages) => {
  const messagesRef = collection(clientDb, "chats", roomID, "messages");
  const messagesQuery = query(messagesRef, orderBy("timestamp", "asc"));

  const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setMessages(messages);
  });

  return unsubscribe; 
};

export const sendMessage = async (roomID, sender, text, role) => {
  try {
    const messagesRef = collection(clientDb, "chats", roomID, "messages");
    await addDoc(messagesRef, {
      sender,
      text,
      role,
      timestamp: Timestamp.now(), 
    });
  } catch (error) {
    console.error("Error sending message:", error);
  }
};
