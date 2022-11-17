import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { loginLogout } from "../../reducers/loginLogout";


const LoginForm = ({ onSubmit }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const onClickLogin = (e) => {
      e.preventDefault();

      dispatch(loginLogout({
        action: 'login',
        userData: {
          email,
          password
        }
      }))
    }
    return (
      <Form onSubmit={()=>{}}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
  
        <Form.Group controlId="formBasicPassword">
          <Form.Label className="mt-2">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button className="mt-2" type="button" onClick={onClickLogin} >
          Login
        </Button>
      </Form>
    );
  };

export default LoginForm;

