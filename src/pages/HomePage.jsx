import React from 'react'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Testimonials from '../components/Testimonials'
import CTA from '../components/CTA'

function HomePage() {
  return (
    <div className='min-h-screen bg-white dark:bg-gray-950'>
      <Hero />
      <Features/>
      <Testimonials/>
      <CTA/>
    </div>
  )
}

export default HomePage
