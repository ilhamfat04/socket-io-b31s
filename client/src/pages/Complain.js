// import hook
import React, { useEffect } from 'react'

import Navbar from '../components/Navbar'

// import components here

// import socket.io-client 
import {io} from 'socket.io-client'

// initial variable outside component
let socket
export default function Complain() {
    // code here

    const title = "Complain"
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
            <Navbar title={title} />
            {/* code here */}
        </>
    )
}
