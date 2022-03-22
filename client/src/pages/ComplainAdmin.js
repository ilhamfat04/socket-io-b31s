// import hook
import React, { useEffect } from 'react'

import NavbarAdmin from '../components/NavbarAdmin'

// import package here
import { io } from 'socket.io-client'

// init variable here
let socket

export default function ComplainAdmin() {

    const title = "Complain admin"
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
            <NavbarAdmin title={title} />
        </>
    )
}
