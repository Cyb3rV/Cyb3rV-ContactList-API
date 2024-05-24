import { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import ContactListContext from "./ContactListContext";

export default function DeleteContactModal({show, showModalCallback, index}){
    const {contactListActions} = useContext(ContactListContext);

    const handleDeleteButton = () => {
        console.log("test")
        contactListActions({type: "remove", payload: index});
        showModalCallback(false)
    }


    return (
        <>
          <Modal show={show}>
            <Modal.Header>
              <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body className="">
                <p>If you delete this thing the entire universe will go down!</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => showModalCallback(false)}>
                Oh no!
              </Button>
              <Button variant="primary" onClick={handleDeleteButton}>
                Yes Baby!
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )
}