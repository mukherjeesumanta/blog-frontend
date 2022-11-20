import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import toast from 'react-hot-toast';

import { auth } from "../../reducers/auth";


const SignupForm = (props) => {
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const dispatch = useDispatch();

    const onClickSignup = async (e) => {
      e.preventDefault();

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
      }
    }
    return (
      <Form onSubmit={()=>{}}>
        <Form.Group controlId="formBasicFirstName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicLastName">
          <Form.Label>Role</Form.Label>
          <Form.Control
            required
            as="select"
            placeholder="Last Name"
            value={role}
            onChange={(e) => setRole(e.target.value)}
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
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
  
        <Form.Group controlId="formBasicPassword">
          <Form.Label className="mt-2">Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPasswordConf">
          <Form.Label className="mt-2">Confirm Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Conform Password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </Form.Group>
        <Button className="mt-2" type="submit" onClick={onClickSignup}>Signup</Button>
      </Form>
    );
  };

export default SignupForm;

