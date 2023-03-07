import { Card, Typography } from "@material-ui/core";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import ComplaintCard from "../../components/complaints/ComplaintCard";
import { db } from "../../firebase";

import { useAuth } from "../../provider/AuthProvider";

const MyComplaints = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);

  const getComplaints = async () => {
    console.log(complaints, "asd");
    try {
      const q = query(
        collection(db, "complaints"),
        where("authorId", "==", user.uid)
      );
      let docData = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.data(), "date");
        docData.push(doc.data());
        setComplaints(docData);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      getComplaints();
    }
  }, [user]);
  return (
    <>
      <Card
        style={{
          height: "calc(100vh - 150px)",
          padding: "2rem",
          overflowY: "scroll",
        }}
      >
        <Typography variant="h3">My Complaints</Typography>
        {complaints.map((complaint, index) => (
          <ComplaintCard complaint={complaint} key={index} />
        ))}
      </Card>
    </>
  );
};

export default MyComplaints;
