import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Dbshow = () => {

    let [data, setdata]= useState([])

    let FetchData=()=>{

        let api = 'http://localhost:3000/Hotels'
        axios.get(api).then((res) => {
            // console.log(res.data)
            setdata(res.data)
        }).catch((err) => {
            console.log(err);
            
        })
    }

    useEffect(() => {
        FetchData()
    }, [])

    let DeleteData =(id)=>{
        let api =  `http://localhost:3000/Hotels/${id}`
        axios.delete(api).then(()=>{
            alert('delete')
            FetchData()
        })

    }

    return (
        <>
        <div>dbshow</div>
        <table border={'1'}>
            <thead>
                <th>id</th>
                <th>name</th>
                <th>location</th>
                <th>rating</th>
                <th>amenities</th>
                <th>Delete</th>
            </thead>
            <tbody>
                {
                    data.map((e)=>(
                        <tr>
                            <td>{e.id}</td>
                            <td>{e.name}</td>
                            <td>{e.location}</td>
                            <td>{e.rating}</td>
                            <td>{e.amenities}</td>
                            <td onClick={()=>{DeleteData(e.id)}}>Delete</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        </>
    )
}

export default Dbshow