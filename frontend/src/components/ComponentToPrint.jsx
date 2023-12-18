import React from "react";

export const ComponentToPrint = React.forwardRef((props, ref) => {
  const { cart, totalAmount, subTotal, discount, billNumber, currentDateTime = new Date() } = props;

   // Combine date and time for the bill
  //  const combinedDateTime = currentDateTime?.toLocaleString()?.replace(/[\s,/:]/g, '') || '';


    return (
      <div ref={ref} className="p-5">
        <p class="text-center">THE SWEET</p>
        <p class="text-center">No.72, Colombo Road, Merawala, Chilaw</p>
        <p class="text-center">Tel: 076 627 9199 | Instagram: the_sweet.lk</p>
        <p className="text-center">{currentDateTime.toLocaleString()}</p>
        {/* <p className="text-center">Bill Number: {combinedDateTime}</p> */}
        <p className="text-center">Bill Number: {billNumber}</p>
          <table className='table'>
                  <thead>
                    <tr>
                      {/* <td>Id</td> */}
                      <td>Name</td>
                      <td>Price</td>
                      <td>Qty</td>
                      <td>Total</td>
                    </tr>
                  </thead>
                  <tbody>
                    { cart ? cart.map((cartProduct, key) => <tr key={key}>
                      {/* <td>{cartProduct.id}</td> */}
                      <td>{cartProduct.name}</td>
                      <td>{cartProduct.price}</td>
                      <td>{cartProduct.quantity}</td>
                      <td>{cartProduct.totalAmount}</td>
                    

                    </tr>)

                    : ''}
                  </tbody>
                </table>
                <h4 className='px-2'>Sub Total: Rs {subTotal}</h4>
                <p className='px-2'>Discount: Rs {discount}</p>
                <h2 className='px-2'>Total Amount: Rs {totalAmount}</h2>
      </div>
    );
});