import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { clientAuth, clientDb} from "../lib/firebase";

export const useUser = () => {
  const [userData, setUserData] = useState<UserModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(clientAuth, async (user) => {
      if (user) {
        setLoading(true);
        try {
          const userRef = doc(clientDb, "users", user.uid);
          const userSnapshot = await getDoc(userRef);

          if (userSnapshot.exists()) {
            setUserData(userSnapshot.data() as UserModel);
          } else {
            console.log("No user found with this UID.");
            setUserData(null);
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
          setError(err as Error);
        } finally {
          setLoading(false);
        }
      } else {
        setUserData(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return { userData, loading, error };
};
