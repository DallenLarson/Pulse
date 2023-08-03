import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { register } from "../../modules/authManager";

export default function Register() {
  const navigate = useNavigate();

  const [username, setFirstName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [error, setError] = useState(null);

  const registerClick = (e) => {
    e.preventDefault();
    setError(null);

    if (password && password !== confirmPassword) {
      alert("Passwords don't match!");
    } else {
      // Default Robohash pfp 
      const defaultImageURL = `https://robohash.org/${username}?set=set5&bgset=bg1`;

      const userProfile = {
        username,
        email,
        imageLocation: defaultImageURL,
        userTypeId: 1,
      };

      // Call the register function and handle errors
      register(userProfile, password)
        .then(() => navigate("/"))
        .catch((error) => {
          setError(error.message);
        });
    }
  };

  return (
    <Form onSubmit={registerClick}>
      <fieldset style={{ color: "white" }}>
        {error && <div className="alert alert-danger">{error}</div>}
        <FormGroup>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            id="email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Button>Register</Button>
        </FormGroup>
      </fieldset>
    </Form>
  );
}
