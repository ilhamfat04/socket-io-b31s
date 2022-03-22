// import hook
import React, { useState, useEffect } from 'react'

import Navbar from '../components/Navbar'

// import components here
import Contact from '../components/complain/Contact'
import { Container, Row, Col } from 'react-bootstrap'

// import socket.io-client 
import { io } from 'socket.io-client'

// initial variable outside component
let socket
export default function Complain() {
    // code here
    const [contact, setContact] = useState(null) // data yang diklik
    const [contacts, setContacts] = useState([]) // data dari server

    const title = "Complain"
    document.title = 'DumbMerch | ' + title

    useEffect(() => {
        socket = io('http://localhost:5000')
        // code here
        loadContact()

        return () => {
            socket.disconnect()
        }
    }, [])

    // code here
    const loadContact = () => {
        // minta data kontak admin
        socket.emit("load admin contact")

        socket.on("admin contact", (data) => {
            const dataContact = {
                ...data,
                message: "Click here to start a message"
            }
            setContacts([dataContact])
        })
    }

    const onClickContact = (data) => {
        setContact(data)
    }

    return (
        <>
            <Navbar title={title} />
            {/* code here */}
            <Container fluid style={{ height: '90vh' }}>
                <Row>
                    <Col md={3} style={{ height: '90vh' }} className="px-3 border-end border-dark overflow-auto">
                        <Contact dataContact={contacts} clickContact={onClickContact} contact={contact} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}
