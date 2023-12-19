import React from "react";

const ComponentToPrintAgain = React.forwardRef(({ billData }, ref) => {
  return (
    <div ref={ref} className="p-5">


        <p class="text-center">THE SWEET</p>
        <p class="text-center">No.72, Colombo Road, Merawala, Chilaw</p>
        <p class="text-center">Tel: 076 627 9199 | Instagram: the_sweet.lk</p>
        <p className="text-center">Date: {billData.date.toLocaleString()}</p>
        <p className="text-center">Bill Number: {billData.billNumber}</p>
        

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {billData.cart.map((cartItem, index) => (
            <tr key={index}>
              <td>{cartItem.name}</td>
              <td>{cartItem.price}</td>
              <td>{cartItem.quantity}</td>
              <td>{cartItem.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>



      
      <h4>Sub Total: Rs {billData.subTotal}</h4>
      <p>Discount: Rs {billData.discount}</p>
      <h2>Total Amount: Rs {billData.totalAmount}</h2>
      {/* Add more details based on your bill data structure */}

    </div>
  );
});

export default ComponentToPrintAgain;
