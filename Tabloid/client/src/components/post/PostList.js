import React, { useEffect, useState } from "react";
import Post from "./Post";
import firebase from "firebase/app";
import { getAllPosts } from "../../modules/postManager";
import { Link } from "react-router-dom";
import { getUserDetails } from "../../modules/authManager";
import { Spinner } from "reactstrap";
import PostForm from "./PostForm"; // Add this import

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch all posts
    getAllPosts().then(setPosts);

    // Fetch user details and store them in the state
    getUserDetails(firebase.auth().currentUser.uid).then(setUser);
  }, []);

  if (user === null) {
    return <Spinner />;
  }

  return (
    <>
      <PostForm /> {/* Add this line to include the PostForm component */}
      <h1 className="text-center" style={{ color: "white", fontSize: "1.5rem" }}>
        For You:
      </h1>
      <section>
        {posts.length === 0 ? (
          <p style={{ color: "gray", fontStyle: "italic", textAlign: "center" }}>
            No Pulses... :(
          </p>
        ) : (
          posts
            .slice() // Create a shallow copy of the array before reversing
            .reverse() // Reverse the array to display newer posts first
            .map((p) => <Post key={p.id} post={p} />)
        )}
      </section>

      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          backgroundColor: "white",
          padding: "8px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Profile Picture */}
        <img
          src={user.profilepicUrl} // Use the profilepicUrl if available, otherwise, use the default picture
          alt="Profile"
          style={{ width: "30px", height: "30px", borderRadius: "50%", marginRight: "8px" }}
        />

        {/* Button Link */}
        <Link to={`/users/${user.username}`} style={{ color: "black", textDecoration: "none", fontSize: "16px" }}>
  @{user.username}
</Link>
      </div>
    </>
  );
}
