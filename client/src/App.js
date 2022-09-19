import LocationIndex from './components/LocationIndex'
import Landing from './components/Landing'
import Register from './components/users/Register'
import LocationSingle from './components/LocationSingle'
import PageNavBar from './components/Navigation/PageNavBar'
import Login from './components/users/Login'
import UserProfile from './components/users/UserProfile'
import EditProfile from './components/users/EditProfile'
import EditReview from './components/EditReview'
import Maps from './components/Maps'
import NewLocation from './components/NewLocation'
import NotFound from './components/NotFound'
import Footer from './components/Footer'
import AboutMe from './components/users/AboutMe'
import Creatures from './components/extras/Creatures'
import Inhabitants from './components/extras/Inhabitants'
import InhabitantsSingle from './components/extras/InhabitantSingle'
import CreatureSingle from './components/extras/CreatureSingle'

import { useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/locations/')
      // console.log(data)
    }
    getData()
  })

  return (
    <BrowserRouter>
      <PageNavBar />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/register' element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path='/locations' element={<LocationIndex />} />
        <Route path='/locations/:locationId' element={<LocationSingle />} />
        <Route path='/profile' element={<UserProfile />} />
        <Route path='/editProfile/:userId' element={<EditProfile />} />
        <Route path='/edit-review/:locationId/:reviewId' element={<EditReview />} />
        <Route path='/maps' element={<Maps />} />
        <Route path='/new-location' element={<NewLocation />} />
        <Route path='/creatures' element={<Creatures />} />
        <Route path='/creatures/:cSingle' element={<CreatureSingle />} />
        <Route path='/inhabitants' element={<Inhabitants />} />
        <Route path='/inhabitants/:iSingle' element={<InhabitantsSingle />} />
        <Route path='/about-me' element={<AboutMe />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
