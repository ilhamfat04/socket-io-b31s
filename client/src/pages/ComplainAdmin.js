import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import NavbarAdmin from '../components/NavbarAdmin'
import Contact from '../components/complain/Contact'
import Chat from '../components/complain/Chat'

// import socket.io-client 
import {io} from 'socket.io-client'

// initial variable outside socket
let socket
export default function ComplainAdmin() {
    const [contact, setContact] = useState(null)
    const [contacts, setContacts] = useState([])
    const [messages, setMessages] = useState([])

    const title = "Complain admin"
    document.title = 'DumbMerch | ' + title

    useEffect(() =>{
        socket = io('http://localhost:5000', {
            auth: {
                token: localStorage.getItem('token')
            }
        })
        loadContacts()
        return () => {
            socket.disconnect();
        }
    }, [])

    const loadContacts = () => {
        socket.emit("load customer contacts")
        socket.on("customer contacts", (data) => {
            // filter just customers that have message with admin
            let dataContacts = data.filter(item => (item.status !== "admin") && (item.recipientMessage.length > 0 || item.senderMessage.length > 0))
            
            // manipulate customers to ad latest message
            dataContacts = dataContacts.map((item) => ({
                ...item,
                message: messages.length > 0 ? messages[messages.length - 1].message : "Click here to start message"
            }))

            setContacts(dataContacts)
        })
    }

    // used for active style when click contact
    const onClickContact = (data) => {
        setContact(data)
    }

    return (
        <>
            <NavbarAdmin title={title} />
            <Container fluid style={{height: '89.5vh'}}>
                <Row>
                    <Col md={3} style={{height: '89.5vh'}} className="px-3 border-end border-dark overflow-auto">
                        <Contact dataContact={contacts} clickContact={onClickContact} contact={contact}/>
                    </Col>
                    <Col md={9} style={{maxHeight: '89.5vh'}} className="px-0">
                        <Chat contact={contact} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}
