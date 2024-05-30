import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";

import { Container } from "react-bootstrap";
import { Jumbotron } from "@/components/Jumbotron";
import Link from "next/link";
import {ContactListProvider} from "@/components/ContactListContext";
import EditContactForm from "@/components/EditContactForm";
import { ContactList } from "@/components/ContactList";


export default function AddContact() {
  return (
    <Container>
        <EditContactForm/>
    </Container>
  );
}
