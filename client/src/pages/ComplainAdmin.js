// import hook
import React from 'react'

import NavbarAdmin from '../components/NavbarAdmin'

// import package here

// init variable here
export default function ComplainAdmin() {

    const title = "Complain admin"
    document.title = 'DumbMerch | ' + title

    // code here
    
    return (
        <>
            <NavbarAdmin title={title} />
        </>
    )
}
