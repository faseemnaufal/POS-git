import React, {useEffect, useRef, useState} from 'react'
import MainLayout from '../layouts/MainLayout'
import axios from "axios"
import { toast } from 'react-toastify';
import { ComponentToPrint } from '../components/ComponentToPrint';
import { useReactToPrint } from 'react-to-print';

function POSPage() {

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [discount, setDiscount] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  // const [paymentOption, setPaymentOption] = useState(null); // Track payment option
  const [billNumber, setBillNumber] = useState(null); // Track bill number
  const [currentDateTime, setCurrentDateTime] = useState(new Date());



  const toastOptions = {
    autoClose: 400,
    pauseOnHover: true,
  }

  const fetchProducts = async() => {
    setIsLoading(true);
    const result = await axios.get('http://localhost:3500/getProducts');
    console.log(result.data)
    setProducts(await result.data);
    setIsLoading(false);
  }

  const addProductToCart = async(product) =>{
    // check if the adding product exist
    let findProductInCart = await cart.find(i=>{
      return i.id === product.id
    });

    if(findProductInCart){
      let newCart = [];
      let newItem;

      cart.forEach(cartItem => {
        if(cartItem.id === product.id){
          newItem = {
            ...cartItem,
            quantity: cartItem.quantity + 1,
            totalAmount: cartItem.price * (cartItem.quantity + 1)
          }
          newCart.push(newItem);
        }else{
          newCart.push(cartItem);
        }
      });

      setCart(newCart);
      toast(`Added ${newItem.name} to cart`,toastOptions)

    }else{
      let addingProduct = {
        ...product,
        'quantity': 1,
        'totalAmount': product.price,
      }
      setCart([...cart, addingProduct]);
      toast(`Added ${product.name} to cart`, toastOptions)
    }

  }

  const removeProduct = async(product) =>{
    const newCart =cart.filter(cartItem => cartItem.id !== product.id);
    setCart(newCart);
  }

  const componentRef = useRef();

  const [shouldPrint, setShouldPrint] = useState(false);

  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Bill-${billNumber || 'Preview'}`,
    onAfterPrint: () => {
      // Reset shouldPrint after printing
      setShouldPrint(false);
    },
  });

  const handlePrint = () => {
    const formattedDateTime = currentDateTime ? currentDateTime.toISOString() : '';
    const generatedBillNumber = formattedDateTime?.toLocaleString?.().replace(/[\s,-/:]/g, '') || '';
    setBillNumber(generatedBillNumber);
    setShouldPrint(true);
  };

  useEffect(() => {
    const saveBillAndPrint = async () => {
      if (shouldPrint) {
        const formattedDateTime = currentDateTime ? currentDateTime.toISOString() : '';
        const billData = {
          billNumber,
          totalAmount,
          subTotal,
          discount,
          date: formattedDateTime,
          cart: cart,
        };

        try {
          await axios.post('http://localhost:3500/addBill', billData);
          handleReactToPrint();
        } catch (error) {
          console.error('Error saving bill:', error);
        }
      }
    };

    saveBillAndPrint();
  }, [billNumber, currentDateTime, totalAmount, subTotal, discount, shouldPrint, handleReactToPrint, cart]);



  useEffect(() => {
    fetchProducts();
  },[]);

 
  useEffect(() => {
    let calculatedSubTotal = 0;
    // Calculate the sub-total
    cart.forEach((cartItem) => {
      calculatedSubTotal += parseInt(cartItem.totalAmount);
    });
    // Update the subTotal state
    setSubTotal(calculatedSubTotal);

    // Calculate the total amount after applying the discount
    const totalAmount = calculatedSubTotal - discount;
    setTotalAmount(totalAmount);
  }, [cart, discount]);


//-----Increase and decrease qty
  const increaseQuantity = (product) => {
    const newCart = cart.map((cartItem) => {
      if (cartItem.id === product.id) {
        return {
          ...cartItem,
          quantity: cartItem.quantity + 1,
          totalAmount: cartItem.price * (cartItem.quantity + 1),
        };
      }
      return cartItem;
    });
    setCart(newCart);
  };
  
  const decreaseQuantity = (product) => {
    const newCart = cart.map((cartItem) => {
      if (cartItem.id === product.id) {
        return {
          ...cartItem,
          quantity: Math.max(cartItem.quantity - 1, 0),
          totalAmount: cartItem.price * Math.max(cartItem.quantity - 1, 0),
        };
      }
      return cartItem;
    });
    setCart(newCart);
  };
  
    // Filter products based on the search text
    const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );


  // const goToPay = () => {
  //   const generatedBillNumber = currentDateTime?.toLocaleString?.().replace(/[\s/:]/g, '') || '';
  //   setBillNumber(generatedBillNumber);
  //   console.log('Generated Bill Number:', generatedBillNumber);
  // };


  return (
    <MainLayout currentDateTime={currentDateTime} setCurrentDateTime={setCurrentDateTime}>
      <div className='row'>
        <div className='col-lg-8'>


        <div className="input-group mx-sm-1 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search products"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className="btn btn-primary" type="button" onClick={() => setSearchText('')}>
            Clear
          </button>
        </div>


          {isLoading ? 'Loading products' : <div className='row'>
          {filteredProducts.map((product, key) => (
            <div key={key} className='col-lg-4 mb-4'>
              <div className='pos-item px-3 text-center border rounded' style={{ backgroundColor: '#e9e8e8' }}>
              
                <p style={{ color: 'black' }}>{product.name}</p>
                <p style={{ color: 'black' }}>Cost: {product.cost}</p>
                <p style={{ color: 'black' }}>Rs: {product.price}</p>
                <div className="d-flex justify-content-center">
                  <button className='btn btn-primary btn-sm me-2' onClick={() => addProductToCart(product)}>
                    Add to Cart
                  </button>
                  {cart.find((item) => item.id === product.id) && (
                    <div className="d-flex align-items-center">
                      <button className='btn btn-outline-primary btn-sm me-2' onClick={() => increaseQuantity(product)}>
                        +
                      </button>
                      <button className='btn btn-outline-primary btn-sm' onClick={() => decreaseQuantity(product)}>
                        -
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

            </div>}
       
        </div>
        <div className='col-lg-4'>
              <div style={{display: "none"}}>
                <ComponentToPrint cart={cart} totalAmount={totalAmount} ref={componentRef} 
                subTotal={subTotal} discount={discount} currentDateTime={currentDateTime} billNumber={billNumber}/>
              </div>
              <div className='table-responsive bg-dark'>
                <table className='table table-responsive table-dark table-hover'>
                  <thead>
                    <tr>
                      {/* <td>#</td> */}
                      <td>Name</td>
                      <td>Price</td>
                      <td>Qty</td>
                      <td>Total</td>
                      <td>Action</td>
                    </tr>
                  </thead>
                  <tbody>
                    { cart ? cart.map((cartProduct, key) => <tr key={key}>
                      {/* <td>{cartProduct.id}</td> */}
                      <td>{cartProduct.name}</td>
                      <td>{cartProduct.price}</td>
                      <td>{cartProduct.quantity}</td>
                      <td>{cartProduct.totalAmount}</td>
                      <td>
                        <button className='btn btn-danger btn-sm' onClick={() => removeProduct(cartProduct)}>Remove</button>
                      </td>

                    </tr>)

                    : 'No Item in Cart'}
                  </tbody>
                </table>
                
                <h2 className='px-2 text-white'>Sub Total: Rs {subTotal}</h2>

                {/* Discount */}
                
                <p className='px-2 text-white'>Discount: Rs <input
                  className = "form-control"
                  style={{ backgroundColor: "black", color:'white' }}
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(parseInt(e.target.value))}
                />
                </p>
                <h2 className='px-2 text-white'>Total Amount: Rs {totalAmount}</h2>
              </div>

              <div className='mt-3'>
                { totalAmount !== 0 ? <div>
                  {/* <div>
                <div class="btn-group-toggle" data-toggle="buttons">
                  <label class={`btn btn-secondary ${paymentOption === 'cash' ? 'active' : ''}`}>
                    <input
                      type="checkbox"
                      checked={paymentOption === 'cash'}
                      
                      onChange={() => {
                        setPaymentOption('cash');
                        goToPay();
                      }}
                    />{' '}
                    Cash
                  </label>
                  <label class={`btn btn-secondary ${paymentOption === 'card' ? 'active' : ''}`}>
                    <input
                      type="checkbox"
                      checked={paymentOption === 'card'}
                      
                      onChange={() => {
                        setPaymentOption('card');
                        goToPay();
                      }}
                    />{' '}
                    Card
                  </label>
                </div>

                {paymentOption && (
                  <button className="btn btn-primary" onClick={handlePrint}>
                    Pay Now
                  </button>
                )}
              </div> */}
                  
                  <button className='btn btn-primary' onClick={handlePrint}>
                    Pay Now
                    {/* when i click PAy now the card data should be saved. then we can retriev in billreports */}
                  </button>

                </div> : 'Please add a product to the cart'

                }
              </div>

        </div>
      </div>
    </MainLayout>
  )
}

export default POSPage