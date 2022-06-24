import React, { useMemo, useState, useEffect } from "react"; 
import axios from 'axios';
import Table from "./Table"; 
function PostcodeDetails({ postcodeDeail }) {
    const columns = useMemo(
        () => [
            {
                // group - Details
                Header: "Postcode Details",
                // columns
                columns: [
                    {
                        Header: "Country",
                        accessor: "country"
                    },
                    {
                        Header: "Region",
                        accessor: "region"
                    },
                    {
                        Header: "Admin District",
                        accessor: "adminDistrict"
                    },
                    {
                        Header: "Parliamentary Constituency",
                        accessor: "parliamentaryConstituency"
                    },
                    {
                        Header: "Area",
                        accessor: "area"
                    }
                ]
            }
        ],
        []
    );
    return (
        <div className="App">
            <Table columns={columns} data={postcodeDeail} />
        </div>
    );

}
export default PostcodeDetails;