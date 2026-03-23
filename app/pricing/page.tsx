import { PricingTable } from '@clerk/nextjs'
import React from 'react'

function Pricing() {
  return (
    <div className='mt-20'>
        <h2 className='font-bold text-3xl my-5 text-center'> 🌌AI-Powered Trip Planning - Pick Your Plan</h2>
      <div style={{ maxWidth: '400px', margin: '0 auto', padding: '0 1rem' }}>
      <PricingTable />
      </div>
      {/* <p className="text-center mt-10">Pricing coming soon!</p> */}
    </div>
    
  )
}

export default Pricing
