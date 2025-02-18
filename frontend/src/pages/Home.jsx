import React from 'react'
import Header from '../components/Header'
import SpecialistMenu from '../components/SpecialistMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <div>
      <Header/>
      <SpecialistMenu/>
      <TopDoctors/>
      <Banner/>
    </div>
  )
}

export default Home
