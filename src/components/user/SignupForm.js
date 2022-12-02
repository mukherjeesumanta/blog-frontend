import { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

import { auth } from "../../reducers/auth";


const SignupForm = (props) => {
    const nameRef = useRef();
    const roleRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = async (e) => {
      e.preventDefault();

      const name = nameRef.current.value;
      const role = roleRef.current.value;
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const passwordConfirm = passwordConfirmRef.current.value;

      if(!name || !role || !email || !password || !passwordConfirm) return;

      const result = await dispatch(auth({
        action: 'signup',
        userData: {
          name,
          role,
          email,
          password,
          passwordConfirm
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
        <Form.Group controlId="formBasicFirstName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            minLength="3"
            maxLength="50"
            type="text"
            placeholder="Enter Name"
            ref={nameRef}
          />
        </Form.Group>
        <Form.Group controlId="formBasicLastName">
          <Form.Label>Role</Form.Label>
          <Form.Control
            required
            minLength="3"
            maxLength="6"
            as="select"
            placeholder="Last Name"
            ref={roleRef}
          >
          <option value="">Select</option>
          <option value="user">User</option>
          <option value="author">Author</option>
          <option value="admin">Administrator</option>
        </Form.Control>
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            minLength="3"
            maxLength="50"
            type="email"
            pattern="^\w+@[a-zA-Z0-9]+?\.[a-zA-Z]{2,3}$"
            placeholder="Enter email"
            ref={emailRef}
          />
        </Form.Group>
  
        <Form.Group controlId="formBasicPassword">
          <Form.Label className="mt-2">Password</Form.Label>
          <Form.Control
            required
            minLength="3"
            maxLength="50"
            type="password"
            placeholder="Password"
            ref={passwordRef}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPasswordConf">
          <Form.Label className="mt-2">Confirm Password</Form.Label>
          <Form.Control
            required
            minLength="3"
            maxLength="50"
            type="password"
            placeholder="Conform Password"
            ref={passwordConfirmRef}
          />
        </Form.Group>
        <Button className="mt-2" type="submit">Signup</Button>
      </Form>
    );
  };

export default SignupForm;

