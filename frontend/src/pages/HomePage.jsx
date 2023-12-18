import React from 'react'
import { Link } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'

function HomePage() {
  return (
    <MainLayout>
        <div className='bg-light p-5 mt-4 rounded-3'>
            <h1>Welcome</h1>
            <p>Billing System</p>
            <div class="d-grid gap-2 d-md-block mb-2">
              <Link to={'/pos'} className='btn btn-primary '>Click here to Sell Products</Link>
            </div>
            {/* <div class="d-grid gap-2 d-md-block mb-2">
              <Link to={'/add'} className='btn btn-primary '>Add Products</Link>
            </div>
            <div class="d-grid gap-2 d-md-block">
              <Link to={'/list'} className='btn btn-primary '>Price List </Link>
            </div> */}
        </div>
    </MainLayout>
  )
}

export default HomePage
