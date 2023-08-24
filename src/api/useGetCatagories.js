import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore"; // Import necessary Firebase Firestore functions
import { db } from "../firebase";

// Custom hook for fetching categories
const useGetCatagories = () => {
  const [catagories, setCatagories] = useState([]);
  const getCatagories = async () => {
    try {
      const ref = collection(db, "catagories");
      let docData = [];
      const snapshot = await getDocs(ref);
      const documents = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCatagories(documents);
    } catch (error) {
      console.log(error.message, "errrrrrr");
    }
  };
  useEffect(() => {
    getCatagories();
  }, []);

  return catagories;
};

export default useGetCatagories;
