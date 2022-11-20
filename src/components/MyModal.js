import { useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";


const MyModal = (props) => {
  
    return (
      <Modal show={props.modal} onHide={props.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>{props.label} Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {props.children}
          </Modal.Body>
         
      </Modal>
    );
  }

  export default MyModal;