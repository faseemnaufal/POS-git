import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import axios from "axios"

const Record = (props) => (
 <tr>
   <td>{props.record.id}</td>
   <td>{props.record.name}</td>
   <td>{props.record.cost}</td>
   <td>{props.record.price}</td>
   <td>
     <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
     <button className="btn btn-link"
       onClick={() => {
         props.deleteRecord(props.record._id);
       }}
     >
       Delete
     </button>
   </td>
 </tr>
);

export default function Store() {
 const [records, setRecords] = useState([]);
  // This method fetches the records from the database.
//  useEffect(() => {
//    async function getRecords() {
//      const response = await axios.get(`http://localhost:3500/getProducts`);
//       if (!response.ok) {
//        const message = `An error occurred: ${response.statusText}`;
//        window.alert(message);
//        return;
//      }
//       const records = await response.json();
//      setRecords(records);
//    }
//     getRecords();
//     return;
//  }, [records.length]);

  
 
  const fetchProducts = async() => {
    // setIsLoading(true);
    const result = await axios.get('http://localhost:3500/getProducts');
    console.log(result.data)
    setRecords(await result.data);
    // setIsLoading(false);
  }

  useEffect(() => {
    fetchProducts();
  },[]);

// This method will map out the records on the table
  function recordList() {
   return records.map((record) => {
     return (
       <Record
         record={record}
         deleteRecord={() => deleteRecord(record._id)}
         key={record._id}
       />
     );
   });
 }

 // This method will delete a record
 async function deleteRecord(id) {
  await fetch(`http://localhost:3500/deleteProduct/${id}`, {
    method: "DELETE"
  });
   const newRecords = records.filter((el) => el._id !== id);
  setRecords(newRecords);
}
 // 
  // This following section will display the table with the records of individuals.
 return (
  <MainLayout>
   <div>
     <h3>Product List</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>ID</th>
           <th>Name</th>
           <th>Cost</th>
           <th>Price</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody>{recordList()}</tbody>
     </table>
   </div>
   </MainLayout>
 );
}