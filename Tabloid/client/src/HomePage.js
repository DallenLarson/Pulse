import React, { useState, useEffect } from 'react';
import { AddPost } from '../../modules/postManager';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { getAllCategories } from '../../modules/categoryManager';

const PostForm = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageLocation, setImageLocation] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getAllCategories(false).then(data => setCategories(data.categories));
    }, []);

    const submitPost = (e) => {
        e.preventDefault();
        const post = {
            title,
            content,
            imageLocation,
            categoryId
        };

        AddPost(post).then((postData) => {
            navigate(`/status/${postData.id}`);
        });
    };

    // Define the styles for the button
    const pulseButtonStyle = {
        backgroundColor: content ? 'red' : 'darkred',
        color: 'white',
        fontWeight: 'bold',
    };

    return (
        <>
            <h2>New Post</h2>
            <Form onSubmit={submitPost}>
                <FormGroup>
                    <Label htmlFor="title">Title</Label>
                    <Input
                        name="title"
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="content">Content</Label>
                    <Input
                        name="content"
                        type="textarea"
                        onChange={(e) => setContent(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        name="imageLocation"
                        type="text"
                        onChange={(e) => setImageLocation(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="categoryId" className="m-3">
                        Select A Category
                    </Label>
                    <select onChange={(e) => setCategoryId(e.target.value)}>
                        {categories.map((category) => (
                            <option
                                value={category.id}
                                key={`addpostcategory--${category.id}`}
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>
                </FormGroup>
                <Button id="post-save-btn" style={pulseButtonStyle}>
                    Pulse
                </Button>
            </Form>

      <h1 className="text-center" style={{ color: "white", fontSize: "1.5rem" }}>
        For You:
      </h1>
      <section>
        {posts.length === 0 ? (
          <p style={{ color: "gray", fontStyle: "italic", textAlign: "center" }}>
            No Pulses... :(
          </p>
        ) : (
          posts.map((p) => (
            <Post key={p.id} post={p} />
          ))
        )}
      </section>
        </>
    );
};

export default HomePage;
