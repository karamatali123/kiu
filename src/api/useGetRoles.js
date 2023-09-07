import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore"; // Import necessary Firebase Firestore functions
import { db } from "../firebase";

// Custom hook for fetching categories
const useGetRoles = () => {
  const [roles, setRoles] = useState([]);
  const getRoles = async () => {
    try {
      const ref = collection(db, "roles");
      let docData = [];
      const snapshot = await getDocs(ref);
      const documents = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRoles(documents);
    } catch (error) {
      console.log(error.message, "errrrrrr");
    }
  };
  useEffect(() => {
    getRoles();
  }, []);

  return roles;
};

export default useGetRoles;
