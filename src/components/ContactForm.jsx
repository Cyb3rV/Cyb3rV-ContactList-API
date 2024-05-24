import Link from "next/link";
import { useContext, useEffect, useRef } from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import ContactListContext from "./ContactListContext";
import { useRouter } from "next/router";

export default function ContactForm (){
    const {contactList, contactListActions} = useContext(ContactListContext);
    const router = useRouter();

    const nameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const addressRef = useRef();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            await contactListActions({type: "add", payload: {
                name: nameRef.current.value,
                address: addressRef.current.value,
                phone: phoneRef.current.value,
                email: emailRef.current.value
            }})
            router.push('/');
        }
        catch(error){
            console.error(error)
        }
        
    }


    return(
        <Container>
            <Row>
                <Col>
                    <h2 className="text-center">Add a new Contact</h2>
                </Col>
            </Row>
            <Row>
                <Form className="p-0" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control placeholder="Full Name" required ref={nameRef}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" required ref={emailRef}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control placeholder="Enter phone" required ref={phoneRef}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control placeholder="Enter address" required ref={addressRef}/>
                    </Form.Group>
                    <Button type="submit">Save</Button>
                </Form>
            </Row>
            <Row>
                <Link href="/" className="p-0">Or get back to contacts</Link>
            </Row>
        </Container>
    )
}