import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import { useContext } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [loginError, setLoginError] = useState(null);
  const [action, setAction] = useState("Log In");
  const [successMessage, setSuccessMessage] = useState("");



  function login(e) {
    e.preventDefault();
    
    if (!username || !password) {
      return; // Do nothing if fields are empty
    }

    const storedUser = JSON.parse(localStorage.getItem(username));
    if (storedUser && storedUser.username === username && storedUser.password === password) {
      authContext.setToken("0000");
      navigate("/dashboard");
    } else {
      setLoginError("Incorrect username or password");

      setTimeout(() => {
        setLoginError(null);
      }, 2000);

      setUsername("");
      setPassword("");
      
    }
  }

  function signup(e) {
    e.preventDefault();
    if (!username || !password) {
      return; 
    }

    if (password === confirm) {
      const newUser = {
        username,
        password,
      };
  
      // Store the user data as a string in local storage
      localStorage.setItem(newUser.username, JSON.stringify(newUser));
  
      setSuccessMessage("Signup successful! You can now log in");
    } else {
      setLoginError("Password and confirm password do not match");
    }

    setTimeout(() => {
      setLoginError(null);
      setSuccessMessage(null);
    }, 2000);

    setUsername("");
    setPassword("");
    setConfirm("");

  }

  return (
    <Container className="d-flex justify-content-center vh-100">
      <Form onSubmit={action === "Log In" ? login : signup}>
        <h1 className="my-3 text-center">{action}</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>
            <i className="bi bi-envelope"></i>
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>
            <i className="bi bi-lock"></i>
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        {action === "Log In" ? (
          <Form.Group></Form.Group>
        ) : (
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirm}
              onChange={(e) => {
                setConfirm(e.target.value);
              }}
            />
          </Form.Group>
        )}
        {loginError && <p className="text-danger">{loginError}</p>}
        {successMessage && <p className="text-success">{successMessage}</p>}
        <Button
          className={action === "Log In" ? "gray" : "submit"}
          variant="dark"
          type="submit"
          onClick={() => {
            setAction("Log In");
          }}
          style={{ marginRight: '10px' }} 
        >
          Login
        </Button>

        <Button
          className={action === "Sign Up" ? "gray" : "submit"}
          variant="dark"
          type="submit"
          onClick={() => {
            setAction("Sign Up");
          }}
        >
          Sign Up
        </Button>
      </Form>
    </Container>
  );
}
