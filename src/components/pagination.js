import React, { useEffect } from 'react'
import Pagination from "@mui/material/Pagination";

function PaginationComp(props) {
    
    // useEffect(() => {
    //     props.paginateBooks(1)
    // },[])
    const handleOnChange = (event, value) => {
        // console.log(value)
        if(value <= props.lastPage) {
            props.paginateBooks(value)
        }
    }
    console.log(props)
    return (
        <div style={{ width: "100vw", justifyContent: "center", display: "flex", margin: "25px 0" }}>
            <div style={{ width: "70%", display: "flex", justifyContent: "center" }}>
                <Pagination count={props.lastPage} shape="rounded" onChange={handleOnChange} />
            </div>
        </div>
    )
}

export default PaginationComp
