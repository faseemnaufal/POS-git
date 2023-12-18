require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const ProductModel = require('./models/Products')
const Bill = require('./models/Bill')

const app = express()
app.use(cors())
app.use(express.json())

const mongoUrl = process.env.MONGO_URL;


mongoose
    .connect(mongoUrl, {
       
    })
    .then(() => {
        console.log("connected to db")
    })

//get products
app.get('/getProducts', (req, res) => {
    ProductModel.find()
    .then(products => res.json(products))
    .catch(err => res.json(err))
})

//add products
app.post('/addProduct', async(req, res) => {
    const Id = req.body.Id
    const Name = req.body.Name
    const Cost = req.body.Cost
    const Price = req.body.Price

    const formData = new ProductModel({
        id: Id,
        name: Name,
        cost: Cost,
        price: Price
    })
    try {
        await formData.save();
        res.send("inserted data..")
    } catch(err) {
        console.log(err)
    }
});

// delete product
app.delete('/deleteProduct/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    const result = await ProductModel.deleteOne({ _id: productId });
    const response = result.deletedCount === 1
      ? { message: 'Product deleted successfully' }
      : { error: 'Product not found' };
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// get a single record by id
app.route("/getProducts/:id").get(async (req, res) => {
  const productId = req.params.id;
  
  try {
    const product = await ProductModel.findById(productId);
  
    const response = product
      ? res.json(product)
      : res.status(404).json({ error: 'Product not found' });
  
    return response;
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// This section will help you update a record by id.
app.post('/update/:id', async (req, res) => {
  const productId = req.params.id;
  const { id, name, cost, price } = req.body;

  try {
    const result = await ProductModel.updateOne(
      { _id: productId },
      { $set: { id, name, cost, price } }
    );

    const response = result.nModified === 1
      ? { message: 'Product updated successfully' }
      : { error: 'Product not found or no changes made' };

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//add bills
app.post('/addBill', async (req, res) => {
  const billNumber = req.body.billNumber;
  const totalAmount = req.body.totalAmount;
  const subTotal = req.body.subTotal;
  const discount = req.body.discount;
  const date = req.body.date;

  console.log('Received Bill Data:', req.body);

  const formData = new Bill({
    billNumber: billNumber,
    totalAmount: totalAmount,
    subTotal: subTotal,
    discount: discount,
    date: date
  });

  try {
    await formData.save();
    // console.log('Data saved successfully.');
    res.send('Data saved successfully.');
  } catch (err) {
    // console.error('Error saving bill:', err);
    res.status(500).send('Internal Server Error');
  }
});


//get bills
app.get('/getBill', (req, res) => {
  Bill.find()
  .then(Bill => res.json(Bill))
  .catch(err => res.json(err))
})


// delete bill
app.delete('/deleteBill/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    const result = await Bill.deleteOne({ _id: productId });
    const response = result.deletedCount === 1
      ? { message: 'Product deleted successfully' }
      : { error: 'Product not found' };
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//View bill again
// app.get('/view/:id', async (req, res) => {
//   const billId = req.params.id;

//   try {
//     const bill = await Bill.findById(billId);
//     const response = bill
//       ? res.json(bill)
//       : res.status(404).json({ error: 'Bill not found' });

//     return response;
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// Route to get details of a specific bill by ID
app.get('/getBill/:id', async (req, res) => {
  const billId = req.params.id;
  try {
      // Find the bill in the database by ID
      const bill = await Bill.findById(billId);
      // Check if the bill exists
      if (bill) {
          res.json(bill); // Send the bill details as JSON response
      } else {
          res.status(404).json({ error: 'Bill not found' }); 
      }
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
  }
});



  
  

app.listen(3500, () => {
    console.log("Server is running")
})