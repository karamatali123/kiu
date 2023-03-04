import { Card, Typography } from "@material-ui/core";
import React from "react";
import ComplaintCard from "../../components/complaints/ComplaintCard";
import Header from "../../components/Header";
import ProfieCard from "../../components/ProfieCard";

import { useAuth } from "../../provider/AuthProvider";

const Profile = () => {
  const { uid, user } = useAuth();
  console.log(user, "ud");
  return (
    <>
      <Card
        style={{
          height: "calc(100vh - 150px)",
          padding: "2rem",
          overflowY: "scroll",
        }}
      >
        <ProfieCard />
      </Card>
    </>
  );
};

export default Profile;
