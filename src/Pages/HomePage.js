import React from 'react'
import Banner from '../Components/Banner/Banner'
import CoinsTable from '../Components/CoinsTable'
const HomePage = () => {
  return (
    <div style={{display:"flex", flexDirection:"column"}}> 
      <Banner></Banner>
      <CoinsTable></CoinsTable>
    </div>
  )
}

export default HomePage
