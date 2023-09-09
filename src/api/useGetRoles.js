import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore"; // Import necessary Firebase Firestore functions
import { db } from "../firebase";
import { useAuth } from "../provider/AuthProvider";

// Custom hook for fetching categories
const useGetRoles = () => {
  const [roles, setRoles] = useState([]);
  const { user } = useAuth();
  const getRoles = async () => {
    try {
      const q = query(collection(db, "roles"), where("uid", "!=", user.uid));
      const querySnapshot = await getDocs(q);
      const docData = [];

      querySnapshot.forEach((doc) => {
        docData.push(doc.data());
      });

      // After collecting all the data, set the state once
      setRoles(docData);
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
