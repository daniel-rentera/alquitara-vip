import Hero from '../components/sections/Hero'
import Experience from '../components/sections/Experience'
import Services from '../components/sections/Services'
import Schedule from '../components/sections/Schedule'
import Promos from '../components/sections/Promos'
import Gallery from '../components/sections/Gallery'
import Birthday from '../components/sections/Birthday'
import Location from '../components/sections/Location'

export default function Home() {
  return (
    <>
      <Hero />
      <Experience />
      <Services />
      <Schedule />
      <Promos />
      <Gallery />
      <Birthday />
      <Location />
    </>
  )
}
