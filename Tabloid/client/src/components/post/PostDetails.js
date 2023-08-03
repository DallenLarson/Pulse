import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { getPostDetails } from "../../modules/postManager";
import { deletePost } from "../../modules/postManager"; // Add the import for the delete function
import PostForm from "./PostForm"; // Add the import for the PostForm component
import { Spinner } from "reactstrap";

export default function PostDetails() {
  const { id } = useParams();
  const [p, setP] = useState({});
  const [isEditing, setIsEditing] = useState(false); // State to manage edit mode
  const firebaseId = "0IgY8lxGLfNVUI6SvBXpLTOAwZQ2"; // Replace this with the actual firebaseId of the current user

  useEffect(() => {
    getPostDetails(id).then(setP);
  }, [id]); // Add 'id' as a dependency to the useEffect hook to fetch data based on 'id' changes

  const navigate = useNavigate();

  const userProfileImageStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    overflow: 'hidden',
    marginRight: '10px',
    backgroundSize: 'cover',
    backgroundPosition: 'center', 
  };

  const formatDate = (dateString) => {
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  const handleDelete = () => {
    // Call the deletePost function with the post's 'id' to delete it
    deletePost(id)
      .then(() => {
        // Handle successful deletion (e.g., navigate back to the list of posts)
        navigate('/'); // For example, navigate back to the post list
      })
      .catch((error) => {
        // Handle errors, if any
        console.error("Error deleting post:", error);
      });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleUpdatePost = (updatedPost) => {
    // Here, you can implement the updatePost function to update the post content
    // It would be similar to the AddPost function in PostForm.js but with an additional postId parameter
    // After updating the post, you can navigate back to the post details view
    setIsEditing(false);
  };


  if (Object.keys(p).length === 0) {
    return <p>Loading...</p>;
  } else {
    return (
      <div className="m-4">
        <div style={userProfileImageStyle}>
          <img
            src={p.user.profilepicUrl}
            alt={`Profile of ${p.user.username}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <Link to={`/users/${p.user.username}`}>
          <p style={{ color: "#888" }}>@{p.user.username}</p>
        </Link>
        {isEditing ? (
          <PostForm
            content={p.content}
            onCancel={handleCancelEdit}
            onSubmit={handleUpdatePost}
            isEditing={true} // Pass isEditing prop as true when in edit mode
          />
        ) : (
          <p style={{ color: 'white', textAlign: 'left' }}>{p.content}</p>
        )}
        <div>
          <p style={{ color: '#888'}}>{formatDate(p.postedAt)}</p>
        </div>
        {p.user.firebaseId === firebaseId && (
          <>
            {isEditing ? (
              <>
                <button onClick={handleCancelEdit}>Stop</button>
                <button disabled>Edit</button>
              </>
            ) : (
              <button onClick={handleEdit}>Edit</button>
            )}
            <button onClick={handleDelete}>Delete</button>
          </>
        )}
      </div>
    );
  }
}
