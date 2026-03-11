import React from 'react'
import BestSellingProducts from '../../components/BestSellingProducts/BestSellingProducts'
import Banner from '../../components/Banner/Banner'
import ProdutsHome from '../../components/ProductsHome/ProductsHome'
import OfferHome from '../../components/OfferHome/OfferHome'



const Home = () => {
  return (
    	<>
			<Banner />
			<OfferHome/>
			
			<ProdutsHome/>
			<BestSellingProducts />
		</>
  )
}

export default Home
