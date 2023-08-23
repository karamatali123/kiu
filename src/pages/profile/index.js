import { Card } from "@mui/material";
import React from "react";
import ProfieCard from "../../components/ProfieCard";

import { useAuth } from "../../provider/AuthProvider";

const Profile = () => {
  const { user } = useAuth();

  return (
    <>
      <Card
        style={{
          height: "calc(100vh - 150px)",
          padding: "2rem",
          overflowY: "scroll",
        }}
      >
        <ProfieCard user={user} />
      </Card>
    </>
  );
};

export default Profile;
