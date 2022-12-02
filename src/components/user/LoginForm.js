import { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

import { auth } from "../../reducers/auth";


const LoginForm = (props) => {
    const emailRef = useRef();
    const passRef = useRef();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const onSubmit = async (e) => {
      e.preventDefault();

      const email = emailRef.current.value;
      const password = passRef.current.value;

      if(!email || !password) return;

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
          navigate('/')
      }
    }
    return (
      <Form onSubmit={ onSubmit }>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            required="required"
            placeholder="Enter email"
            ref={emailRef}
          />
        </Form.Group>
  
        <Form.Group controlId="formBasicPassword">
          <Form.Label className="mt-2">Password</Form.Label>
          <Form.Control
            type="password"
            required="required"
            placeholder="Password"
            ref={passRef}
          />
        </Form.Group>
        <Button className="mt-2" type="submit">
          Login
        </Button>
      </Form>
    );
  };

export default LoginForm;

