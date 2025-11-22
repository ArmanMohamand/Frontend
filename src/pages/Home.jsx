import React, { useState } from 'react'
import Header from '../components/Header'
import ExploreMenu from '../components/ExploreMenu'
import FoodDisplay from '../components/FoodDisplay';
import AppDownload from '../components/AppDownload';
import Maker from '../components/Maker';

const Home = () => {
  const [category, setcategory] = useState("All");
  return (
    <>
    <Header/>
    <ExploreMenu category={category} setcategory={setcategory} />
    <FoodDisplay category={category}/>
    <AppDownload/>
    <Maker/>
    </>
  )
}

export default Home