import React, { useEffect, useState } from "react";
import Post from "./Post";
import firebase from "firebase/app"; // Add this import
import { getUserPosts } from "../../modules/postManager";
import { getUserDetails } from "../../modules/authManager";
import { Link } from "react-router-dom";

export default function UserPosts() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null); // Add this state variable to store the user details

  useEffect(() => {
    // Fetch user posts
    getUserPosts().then(setPosts);

    // Fetch user details and store them in the state
    getUserDetails(firebase.auth().currentUser.uid).then(setUser);
  }, []);

  if (user && posts.length > 0) {
    return (
      <section>
        <p>Hi @{user.username}!</p>
        {posts.map((p) => (
          <Post key={p.id} post={p} />
        ))}
      </section>
    );
  } else if (user) {
    return (
      <>
        <p>You have no posts yet.</p>
        <p>
          Click <Link to="/addpost">here</Link> to make your first post!
        </p>
      </>
    );
  } else {
    // You may want to show a loading indicator here
    return <p>Loading...</p>;
  }
}
