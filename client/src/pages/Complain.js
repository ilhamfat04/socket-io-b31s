// import hook
import React, { useEffect } from 'react'

import Navbar from '../components/Navbar'

// import package here
import { io } from 'socket.io-client'

// init variable here
let socket

export default function Complain() {

    const title = "Complain"
    document.title = 'DumbMerch | ' + title

    // code here
    useEffect(() => {
        socket = io('http://localhost:5000')

        // process unmount
        return () => {
            socket.disconnect()
        }
    }, [])// proses didmount

    return (
        <>
            <Navbar title={title} />
        </>
    )
}
