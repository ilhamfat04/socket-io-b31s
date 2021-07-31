// import hook
import React, { useState, useEffect } from 'react'

import NavbarAdmin from '../components/NavbarAdmin'

import { Container, Row, Col } from 'react-bootstrap'
import Contact from '../components/complain/Contact'

// import here

// import socket.io-client 
import {io} from 'socket.io-client'

// initial variable outside socket
let socket
export default function ComplainAdmin() {
    const [contact, setContact] = useState(null)
    const [contacts, setContacts] = useState([])
    // code here

    const title = "Complain admin"
    document.title = 'DumbMerch | ' + title

    // code here

    useEffect(() =>{
        socket = io('http://localhost:5000', {
            auth: {
                token: localStorage.getItem('token')
            },
            // code here
        })

        // code here

        loadContacts()
        // code here

        return () => {
            socket.disconnect()
        }
    }, []) // code here

    const loadContacts = () => {
        socket.emit("load customer contacts")
        socket.on("customer contacts", (data) => {
            // filter just customers which have sent a message
            let dataContacts = // code here
            
            // manipulate customers to add message property with the newest message
            // code here
            setContacts(dataContacts)
        })
    }

    // used for active style when click contact
    const onClickContact = (data) => {
        setContact(data)
        // code here
    }

    // code here

    return (
        <>
            <NavbarAdmin title={title} />
            <Container fluid style={{height: '89.5vh'}}>
                <Row>
                    <Col md={3} style={{height: '89.5vh'}} className="px-3 border-end border-dark overflow-auto">
                        <Contact dataContact={contacts} clickContact={onClickContact} contact={contact}/>
                    </Col>
                    {/* code here */}
                </Row>
            </Container>
        </>
    )
}
