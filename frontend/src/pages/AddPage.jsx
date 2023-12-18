import React, { useState } from 'react';
import Axios from 'axios';
import MainLayout from '../layouts/MainLayout'

function AddPage() {
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [cost, setCost] = useState("")
  const [price, setPrice] = useState("")

  const handleSubmit = (e) => {
      //e.preventDefault();

      Axios.post('http://localhost:3500/addProduct', {
          Id: id,
          Name: name,
          Cost: cost,
          Price: price
      })
  }

  return (
    <MainLayout>
    <div className="App">
      <header className="App-header">
      <h3>Add Products</h3> 
        <div className="row">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <p>Item ID</p>
                <input
                  className = "form-control" 
                  type="text"
                  placeholder="Eg: 001"
                  onChange={(e) => {setId(e.target.value)}}
                />
              </div>

              <div className="form-group">
                <p>Item Name</p>
                <input
                  className = "form-control" 
                  type="text"
                  placeholder="Eg: Chocolate"
                  onChange={(e) => {setName(e.target.value)}}
                />
              </div>

              <div className="form-group">
                <p> Cost</p>
                <input 
                  className = "form-control"
                  type="text"
                  placeholder = "Eg: 200" 
                  onChange={(e) => {setCost(e.target.value)}}
                />
              </div>

              <div className="form-group">
                <p> Price</p>
                <input 
                  className = "form-control"
                  type="text"
                  placeholder = "Eg: 250" 
                  onChange={(e) => {setPrice(e.target.value)}}
                />
              </div>

                <div>
                <button className='btn btn-primary mt-2' type="submit">Add</button>
                </div>
            </form>
        </div>
      </header>
    </div>
  </MainLayout>
  );
}

export default AddPage
