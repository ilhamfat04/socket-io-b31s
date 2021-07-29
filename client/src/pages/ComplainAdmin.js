import React, { useEffect } from 'react'

import NavbarAdmin from '../components/NavbarAdmin'

// import socket.io-client 
import {io} from 'socket.io-client'

// initial variable outside socket
let socket
export default function ComplainAdmin() {

    const title = "Complain admin"
    document.title = 'DumbMerch | ' + title

    useEffect(() =>{
        socket = io('http://localhost:5000')

        return () => {
            socket.disconnect()
        }
    }, [])
    
    return (
        <>
            <NavbarAdmin title={title} />
        </>
    )
}
