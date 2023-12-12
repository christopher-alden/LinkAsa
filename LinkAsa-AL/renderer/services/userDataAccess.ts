import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { clientDb } from "../lib/firebase";

export const fetchAllUsers = async () => {
  try {
    const usersCol = collection(clientDb, "users");
    const userSnapshot = await getDocs(usersCol);
    const userList = userSnapshot.docs.map((doc) => ({
      uid: doc.id,
      ...doc.data(),
    }));
    return userList;
  } catch (error) {
    console.error("Error fetching users from Firestore:", error);
    throw new Error("Error fetching users");
  }
};

export const updateUser = async (uid, updatedUserData) => {
    if (typeof uid !== 'string') {
      console.error('Invalid userId:', uid);
      throw new Error('Invalid userId');
    }
  
    const userRef = doc(clientDb, "users", uid);
  
    try {
      await updateDoc(userRef, updatedUserData);
      return { success: true };
    } catch (error) {
      console.error("Error updating user:", error);
      return { success: false };
    }
  };