// import hook
import React from 'react'

import Navbar from '../components/Navbar'

// import package here

// init variable here
export default function Complain() {

    const title = "Complain"
    document.title = 'DumbMerch | ' + title

    // code here
    
    return (
        <>
            <Navbar title={title} />
        </>
    )
}
