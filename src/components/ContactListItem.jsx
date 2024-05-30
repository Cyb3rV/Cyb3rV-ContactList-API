import { Col, Container, Row } from "react-bootstrap";
import { FaPencil } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import ContactListContext from "./ContactListContext";
import DeleteContactModal from "./DeleteContactModal";
import { useRouter } from "next/router";



export function ContactListItem({contact, index}){
    const {contactList, contactListActions} = useContext(ContactListContext);
    const [showModal, setShowModal] = useState(false);
    const {SetCurrentContact} = useContext(ContactListContext);
    const router = useRouter();



    const showModalCallback = (show) => {
        setShowModal(show);
    }

    const handleClickEdit = () => {
        router.push("/editcontact");
        SetCurrentContact(contactList[index]);

    }

    const handleClickDelete = () => {

        setShowModal(true);
    };

    useEffect(() => {
        console.log(contact);
    }, [])

    return(
        <Container className="d-flex flex-row px-4 border">
            <Container className="p-0">
                <img src="https://www.rudyvillarreal.com/wp-content/uploads/2022/08/5-day-challenge-final-profile-e1659570269598.png" className="rounded-circle" width="200" height="200"></img>
            </Container>
            <Container className="p-0">
                <Row>
                    <Col>
                        <h3>{contact.name}</h3>
                    </Col>
                    <Col xs={1} onClick={handleClickEdit}>
                        <FaPencil />
                    </Col>
                    <Col xs={1} onClick={handleClickDelete}>
                        <FaTrashAlt />
                    </Col>
                </Row>
                <Row>
                    <Col xs={1}>
                        <MdPlace />
                    </Col>
                    <Col>
                        <h5>{contact.address}</h5>
                    </Col>
                </Row>
                <Row>
                    <Col xs={1}>
                        <FaPhone />
                    </Col>
                    <Col>
                    <h5>{contact.phone}</h5>
                    </Col>
                </Row>
                <Row>
                    <Col xs={1}>
                        <IoMdMail />
                    </Col>
                    <Col>
                        <h5>{contact.email}</h5>
                    </Col>
                </Row>
                
                <DeleteContactModal show={showModal} showModalCallback={showModalCallback} index={contact.id}/>
            </Container>
        </Container>
    )
}