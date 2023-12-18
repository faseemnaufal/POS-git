import React, { useEffect, useState, useRef } from "react";
import MainLayout from "../layouts/MainLayout";
import axios from "axios"
import { useReactToPrint } from "react-to-print";
import ComponentToPrintAgain from "../components/ComponentToPrintAgain"


export default function BillReports() {
  const [records, setRecords] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null); // State for the selected bill
  const [printing, setPrinting] = useState(false);

  
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const componentRef = useRef();


  const Record = (props) => (
  <tr>
    <td>{props.record.billNumber}</td>
    <td>{props.record.totalAmount}</td>
    <td>{props.record.subTotal}</td>
    <td>{props.record.discount}</td>
    <td>{props.record.date}</td>
    <td>

      {/* <Link  className="btn btn-link" to={`/view/${props.record._id}`}>View</Link> | */}
      <button className="btn btn-link"
        onClick={() => {
          props.viewRecord(props.record._id);
        }}
      >
        View
      </button> |
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
    

  // This method will map out the records on the table
  function recordList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          viewRecord={() => viewRecord(record._id)}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }



    // This method will get a record and show in the page
    const fetchProducts = async () => {
      try {
        const result = await axios.get(`http://localhost:3500/getBill`);
        setRecords(result.data);
      } catch (error) {
        console.error("Error fetching bills:", error);
      }
    };

    useEffect(() => {
      fetchProducts();
    }, []);


    // This method will fetch a specific record for viewing console.log(result.data);
    const viewRecord = async (id) => {
      try {
        const result = await axios.get(`http://localhost:3500/getBill/${id}`);
        setSelectedBill(result.data);
        console.log(result.data);
        setPrinting(true);
      } catch (error) {
        console.error("Error fetching record:", error);
      }
    };
    
    //  const viewRecord = (bill) => {
    //   // Update the state with the selected bill
    //   setSelectedBill(bill);
    // };



  // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`http://localhost:3500/deleteBill/${id}`, {
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
      <h3>Product Bills</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Bill Number</th>
            <th>Total Amount</th>
            <th>Sub Total</th>
            <th>Discount</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
    </div>


    {/* {printing && (
        <div style={{ display: "none" }}>
          <ComponentToPrintAgain ref={componentRef} billData={selectedBill} />
        </div>
      )}

      {selectedBill && (
        <div>
          <button className="btn btn-primary" onClick={handlePrint}>
            Print Bill
          </button>
        </div>
      )} */}


    </MainLayout>
  );
}