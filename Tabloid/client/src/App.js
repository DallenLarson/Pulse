import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Spinner } from 'reactstrap';
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { onLoginStatusChange, getUserDetails } from "./modules/authManager";
import firebase from 'firebase/app'; // Import firebase app instead of the whole firebase library
import 'firebase/auth'; // Import firebase auth module separately

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState(null); // Initialize user as null

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      // Check if the current user is available before fetching user details
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        getUserDetails(currentUser.uid)
          .then(userObject => {
            setUser(userObject)
          })
          .catch(error => {
            console.error("Error fetching user details:", error);
            setUser(null);
          });
      } else {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [isLoggedIn])

  if (isLoggedIn === null) {
    return <Spinner className="app-spinner dark" />;
  }

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} user={user} />
      <ApplicationViews isLoggedIn={isLoggedIn} user={user} />
    </Router>
  );
}

export default App;
