
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast, Flip } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import YoutubeEmbed from '../YoutubeEmbed'
import loaderImg from '../../images/loader.gif'

import { Carousel } from 'react-responsive-carousel'
import { getToken, userIsAuthenticated } from '../../auth/auth'

const CreatureSingle = () => {
  const navigate = useNavigate()
  const { cSingle } = useParams()


  const [ creature, setCreature ] = useState(null)
  const [ errors, setErrors ] = useState(false)

  const getData = async () => {
    try {
      const { data } = await axios.get(`/api/creatures/${cSingle}/`)
      console.log('single creature',data)
      setCreature(data)
      console.log('owner_-------->', data.reviews[0].owner)
      console.log('errors', data)

    } catch (error) {
      setErrors(error.message)

      console.log('errors -----------> ', error.message)
    }
  } 

  useEffect(() => {

    getData()
  }, [cSingle])


  return (
    <div className="location-single-wrapper text-center">
      <ToastContainer />
      { creature ?
        <>
          <Carousel className='w-full h-1/2' showArrows={true} >
            <div>
              <img className='caro-inhab' src={creature.image1} />
              {/* <p className="legend">{location.name}</p> */}
            </div>
            <div>
              <img className='caro-inhab' src={creature.image2} />
              {/* <p className="legend">{location.name}</p> */}
            </div>
            <div>
              <img className='caro-inhab' src={creature.image3} />
              {/* <p className="legend">{location.name}</p> */}
            </div>
          </Carousel>  
          <Container className='content-wrapper'>
            <Row className='content'>
              <h1>{creature.name}</h1>
              <h2>Origin</h2>
              <p>{creature.origin}</p>
              <h2>Description</h2>
              <p>{creature.about}</p>
              <h2>Languages Spoken</h2>
              <p>{creature.languages}</p>
              <hr />
              <h2>Height</h2>
              <p>{creature.height}</p>                  
              <hr />
              
            </Row>

            
          </Container>
        </>
        :
        <h2 className='text-center'>
          { errors ? <h2> Something went wrong.</h2> : <img src={loaderImg} /> }
        </h2> 
      }
    </div>
  )
}

export default CreatureSingle

