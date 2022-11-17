import { useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import CloseButton from 'react-bootstrap/CloseButton';

import LoginForm from "./user/LoginForm";

const MyModal = (props) => {
   
    /* const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onLoginFormSubmit = (e) => {
      e.preventDefault();
      handleClose();
    }; */
  
    return (
      <Modal show={props.modal} onHide={props.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Login Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {props.children}
          </Modal.Body>
         
        </Modal>
    );
  }

  export default MyModal;