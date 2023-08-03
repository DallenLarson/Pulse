import React, { useState, useEffect } from 'react';
import { AddPost } from '../../modules/postManager';
import { Button, Form, FormGroup, Input, Label, Progress } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { getAllCategories } from '../../modules/categoryManager';

const PostForm = ({ isEditing }) => {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [imageLocation, setImageLocation] = useState('');
  const [categories, setCategories] = useState([]);
  const [characterCount, setCharacterCount] = useState(0);

  useEffect(() => {
    getAllCategories(false).then(data => setCategories(data.categories));
  }, []);

  const submitPost = (e) => {
    e.preventDefault();
    const post = {
      content,
      imageLocation,
      NaN
    };

    AddPost(post).then((postData) => {
      navigate(`/postDetails/${postData.id}`);
    });
  };

  const handleContentChange = (e) => {
    const inputValue = e.target.value.slice(0, 280);
    setContent(inputValue);
    setCharacterCount(inputValue.length);
  };

  // Define the styles for the button
  const pulseButtonStyle = {
    backgroundColor: content ? '#dc3545' : 'darkred',
    color: 'white',
    fontWeight: 'bold',
  };

  // Define the style for the progress bar
  const progressBarStyle = {
    backgroundColor: 'black',
  };

  return (
    <>
      <style>
        {`
          /* Target the progress bar and change its color to red */
          .progress-bar {
            background-color: #dc3545;
          }
        `}
      </style>
      <Form onSubmit={submitPost}>
        <FormGroup>
          <Input
            name="content"
            type="textarea"
            value={content}
            onChange={handleContentChange}
            placeholder="What are you listening to?"
          />
          <Progress value={(characterCount / 280) * 100} style={progressBarStyle} />
        </FormGroup>
        <Button id="post-save-btn" style={pulseButtonStyle}>
          {isEditing ? "Save Edit" : "Pulse"}
        </Button>
      </Form>
    </>
  );
};

export default PostForm;