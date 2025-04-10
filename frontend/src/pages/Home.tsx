import React from 'react'
import Hero from '../components/Hero'
import Explore from '../components/Explore'
import Offer from '../components/Offer'
import Video from '../components/Video'
import Form from '../components/Form'
import Join from '../components/Join'
const Home = () => {
  return (
    <div className='bg-neutral-100'>

      <Hero/>
      <Explore/>
      <Offer/>
      <Video/>
      <Form/>
      <Join/>
    </div>
  )
}

export default Home
