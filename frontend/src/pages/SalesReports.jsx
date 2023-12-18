import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import MainLayout from "../layouts/MainLayout";

const SalesReports = () => {
  return (
    <MainLayout>
    <div>
        <h3>Sales Reports</h3>
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
     </table>
    </div>
    </MainLayout>
  )
}

export default SalesReports
