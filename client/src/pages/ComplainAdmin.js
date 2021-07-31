// import hook
import React, { useEffect } from 'react'

import NavbarAdmin from '../components/NavbarAdmin'

// import components here

// import socket.io-client 
import {io} from 'socket.io-client'

// initial variable outside socket
let socket
export default function ComplainAdmin() {
    // code here

    const title = "Complain admin"
    document.title = 'DumbMerch | ' + title

    useEffect(() =>{
        socket = io('http://localhost:5000')
        // code here

        return () => {
            socket.disconnect()
        }
    }, [])

    // code here

    return (
        <>
            <NavbarAdmin title={title} />
            {/* code here */}
        </>
    )
}
