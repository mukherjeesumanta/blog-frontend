import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import toast from 'react-hot-toast';

import { auth } from "../../reducers/auth";


const LoginForm = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const onClickLogin = async (e) => {
      e.preventDefault();

      const result = await dispatch(auth({
        action: 'login',
        userData: {
          email,
          password
        }
      }))
      if(!!result.error){
        toast.error(result.error.message || 'Something went wrong!!')
      } else {
          props.hideModal()
      }
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

