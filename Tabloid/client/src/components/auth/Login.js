import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useNavigate } from "react-router-dom"; // Removed Link import
import { login } from "../../modules/authManager";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then(() => navigate("/"))
      .catch(() => alert("Invalid email or password."));
  };

  const handleRegisterClick = () => {
    navigate("/register"); // Redirect to "/register" route when the button is clicked
  };

  return (
    <Form onSubmit={loginSubmit}>
      <fieldset>
        <FormGroup>
          <Label for="email" style={{ color: "white" }}>
            Email
          </Label>
          <Input
            id="email"
            type="text"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password" style={{ color: "white" }}>
            Password
          </Label>
          <Input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Button>Login</Button>
        </FormGroup>
        <em style={{ color: "white" }}>
          Not registered?{" "}
          <span onClick={handleRegisterClick} style={{ cursor: "pointer", color: "red" }}>
            Register Here!
          </span>
        </em>
      </fieldset>
    </Form>
  );
}
