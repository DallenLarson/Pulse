import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { Card } from "reactstrap";

function timeSince(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  if (seconds < 60) {
    return `${seconds} S`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} M`;
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return `${hours} H`;
  } else {
    const options = { month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  }
}

export default function Post({ post }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [timeSincePosted, setTimeSincePosted] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSincePosted(timeSince(post.postedAt));
    }, 1000);
    return () => clearInterval(interval);
  }, [post.postedAt]);

  const handleTitleClick = (event) => {
    navigate(`/postDetails/${post.id}`);
  };

  const buttonContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10px', // Add some spacing between the buttons and the content
  };

  const likeButtonStyle = {
    borderRadius: '50%',
    padding: '5px',
    marginRight: '5px', // Add some spacing between the like and dislike buttons
  };

  const dislikeButtonStyle = {
    borderRadius: '50%',
    padding: '5px',
  };

  const handleLikeClick = () => {
    const pulseReaction = { PulseId: post.id, UserId: post.user.userId, ReactionId: 1 };

    fetch("/api/PulseReaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pulseReaction),
    })
    .then((response) => {
      if (response.ok) {
        console.log("Like added successfully!");
      } else {
        // Handle error, e.g., show an error message.
        console.error("Failed to add Like:", response.statusText);
      }
    })
    .catch((error) => {
      console.error("Error occurred while adding Like:", error);
    });
  };

  const handleDislikeClick = () => {
    const pulseReaction = { PulseId: post.id, UserId: post.user.userId, ReactionId: 2 };

    fetch("/api/PulseReaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pulseReaction),
    })
    .then((response) => {
      if (response.ok) {
        // Handle success, e.g., update the UI to show the Dislike reaction.
        console.log("Dislike added successfully!");
      } else {
        // Handle error, e.g., show an error message.
        console.error("Failed to add Dislike:", response.statusText);
      }
    })
    .catch((error) => {
      // Handle network or other errors.
      console.error("Error occurred while adding Dislike:", error);
    });
  };

  const usernameTimeStyle = {
    fontSize: '14px',
    color: 'gray',
    marginBottom: '10px',
    fontStyle: 'italic', // Adding italic style
    position: 'absolute', // Position at top-left corner
    top: 0,
    left: 62,
  };
  
  const contentStyle = {
    position: 'relative', // Use relative positioning
    marginTop: '-35px', // Adjust the top margin to separate from the usernameTimeStyle
    textAlign: 'left', // Align the content to the left
    marginRight: '90px', // Add some space between the image and the text
    left: 62,
  };

  const userProfileImageStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    overflow: 'hidden',
    marginRight: '10px',
    backgroundImage: `url(${post.user.profilepicUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center', 
  };
  
  return (
    <Card className="m-5 text-center" style={{ borderRadius: '20px', position: 'relative' }}>
      <button style={{ borderRadius: '20px' }} onClick={(clickEvent) => handleTitleClick(clickEvent)}>
        <div>
          <div style={userProfileImageStyle}></div>
  
          <div style={usernameTimeStyle}>
            <p>@{post.user.username} • {timeSincePosted}</p>
          </div>
        </div>
        <div style={contentStyle}>
          <p>{post.content}</p>
        </div>
      </button><div style={buttonContainerStyle}>
        <button onClick={handleLikeClick} style={likeButtonStyle}>
          <img src="https://cdn-icons-png.flaticon.com/512/81/81250.png" alt="Like" width="20" height="20" />
        </button>
        <button onClick={handleDislikeClick} style={dislikeButtonStyle}>
          <img src="https://static-00.iconduck.com/assets.00/hate-icon-2048x2048-zd4c5cra.png" alt="Dislike" width="20" height="20" />
        </button>
      </div>
    </Card>
  );
}
