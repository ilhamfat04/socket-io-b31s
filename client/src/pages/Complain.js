import React, { useEffect } from 'react'

import Navbar from '../components/Navbar'

// import socket.io-client 
import {io} from 'socket.io-client'

// initial variable outside socket
let socket
export default function Complain() {

    const title = "Complain"
    document.title = 'DumbMerch | ' + title

    useEffect(() =>{
        socket = io('http://localhost:5000')

        return () => {
            socket.disconnect()
        }
    }, [])
    
    return (
        <>
            <Navbar title={title} />
        </>
    )
}
