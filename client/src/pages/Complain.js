import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import Navbar from '../components/Navbar'
import Contact from '../components/complain/Contact'
import Chat from '../components/complain/Chat'

import { io } from 'socket.io-client'

let socket
export default function Complain() {
    const [contact, setContact] = useState(null)
    const [contacts, setContacts] = useState([])
    const [messages, setMessages] = useState([])

    const title = "Complain"
    document.title = 'DumbMerch | ' + title

    useEffect(() =>{
        socket = io('http://localhost:5000', {
            auth: {
                token: localStorage.getItem('token')
            },
            query: {
                idRecipient: 1
            }
        })
        loadContact();
        return () => {
            socket.disconnect();
        }
    }, [])

    const loadContact = () => {
        // emit event to load admin contact
        socket.emit("load admin contact")

        // listen event to get admin contact
        socket.on("admin contact", (data) => {
          const dataContact = {
            ...data, 
            message: messages.length > 0 ? messages[messages.length - 1].message : "Click here to start message"
          }
          setContacts([dataContact]);
        })
    }

    // used for active style when click contact
    const onClickContact = (data) => {
        setContact(data);
    }
    return (
        <>
            <Navbar title={title} />
            <Container fluid style={{height: '89.5vh'}}>
                <Row>
                    <Col md={3} style={{height: '89.5vh'}} className="px-3 border-end border-dark overflow-auto">
                        <Contact dataContact={contacts}  clickContact={onClickContact} contact={contact} />
                    </Col>
                    <Col md={9} style={{maxHeight: '89.5vh'}} className="px-0">
                        <Chat contact={contact} messages={messages} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}
