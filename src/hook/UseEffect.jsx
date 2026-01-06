import React, { useEffect, useState } from "react"

const UseEffect = () => {

    let [count, setcount] = useState(0)
    let Inc = () => {

        setcount(count + 1)
    }
    useEffect (() => 
        {
        console.log('running...')
    }, []
    )

    return (
        <>
            count: {count}
            <button onClick={Inc}>inc</button>

        </>
    )
}

export default UseEffect
