import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table, Spinner } from "reactstrap";
import { getUserDetails } from "../../modules/authManager";

const UserDetails = () => {
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      setLoading(true);
      getUserDetails(username)
        .then((userData) => {
          setUser(userData);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
          setUser(null);
          setLoading(false);
        });
    }, [username]);
  
    if (loading) {
      return <Spinner />;
    }
  
    console.log(user.username);
    if (!user) {
      return <p>User not found!</p>;
    }
  
    return (
      <>
        <div>
          <h2>@{user.username}</h2>
          <img
            alt="profile picture"
            src={user.profilepicUrl}
            style={{ width: "200px", height: "200px", borderRadius: "50%" }}
          />
        </div>
      </>
    );
  };
  
  export default UserDetails;
  