
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
  const { iSingle } = useParams()


  const [ inhabitant, setCreature ] = useState(null)
  const [ errors, setErrors ] = useState(false)

  const getData = async () => {
    try {
      const { data } = await axios.get(`/api/inhabitants/${iSingle}/`)
      console.log('single inhabitant',data)
      setCreature(data)
      console.log('owner_-------->', data.reviews[0].owner)
      console.log('errors', data)

    } catch (errors) {
      setErrors(errors.message)

      console.log('errors -----------> ', errors.message)
    }
  } 

  useEffect(() => {

    getData()
  }, [iSingle])

 
  return (
    <div className="location-single-wrapper text-center">
      <ToastContainer />
      { inhabitant ?
        <>
          <Carousel className='w-full h-1/2' showArrows={true} >
            <div>
              <img className='caro-inhab' src={inhabitant.image1} />
              {/* <p className="legend">{location.name}</p> */}
            </div>
            <div>
              <img className='caro-inhab' src={inhabitant.image2} />
              {/* <p className="legend">{location.name}</p> */}
            </div>
            <div>
              <img className='caro-inhab' src={inhabitant.image3} />
              {/* <p className="legend">{location.name}</p> */}
            </div>
          </Carousel>  
          <Container className='content-wrapper'>
            <Row className='content'>
              <h1>{inhabitant.name}</h1>
              <h2>Origin</h2>
              <p>{inhabitant.origin}</p>
              <h2>Description</h2>
              <p>{inhabitant.about}</p>
              <h2>Languages Spoken</h2>
              <p>{inhabitant.languages}</p>
              <hr />
              <h2>Height</h2>
              <p>{inhabitant.height}</p>                  <hr />
               
              
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


