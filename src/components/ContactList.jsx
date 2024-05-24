import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { ContactListItem } from "./ContactListItem";
import { useContext, useEffect } from "react";
import ContactListContext from "./ContactListContext";
import Link from "next/link";

export function ContactList(){
    const {contactList, contactListActions} = useContext(ContactListContext)


    return(
        <Container className="p-3">
            <Row className="mb-3">
                <Col className="d-flex justify-content-end">
                    <Button><Link href="/addcontact" className="text-decoration-none text-white">Add new contact</Link></Button>
                </Col>
            </Row>
            <Card>
                {contactList.map((contact,index) => (
                        <ContactListItem key={index} index={index} contact={contact}/>
                ))}
            </Card>
            
        </Container>
    )
}