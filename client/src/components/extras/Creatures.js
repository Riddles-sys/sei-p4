import { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, Col, Row, Container } from 'react-bootstrap'
import loaderImg from '../../images/loader.gif'
import { Link, useParams } from 'react-router-dom'


const Creatures = () => {
  const { cSingle } = useParams()
  const [creatures, setCreatures] = useState([])
  const [errors, setErrors] = useState(false)


  const getData = async () => {
    try {
      const { data } = await axios.get('/api/creatures/')
      console.log('single creature',data)
      setCreatures(data)
      
    

    } catch (error) {
      setErrors(error.message)

      console.log(error.message)
    }
  } 

  useEffect(() => {

    getData()
  }, [])


  return (
    <Container as='main' className='creature-index'>
      <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
        <h2 className="text-3xl text-gray-700 font-bold mb-5">
          Creatures</h2>
      </div>
      <Row>
        {creatures.length > 0 ?
          <>
            {creatures.map(creature => {
              const { id } = creature
              return (
                <Col className="mb-4" md='3' key={id}>
                  <Link className="mb-4" to={`/creatures/${creature.id}`}>
                    <Card className='creatures-card hover:grid'>
                    
                      <Card.Img variant='top' className='w-100' src={creature.image1}></Card.Img>
                      <Card.Title className='overlay'>{creature.name}</Card.Title>
                    </Card>
                  </Link>
                </Col>
              )
            })}
          </>
          :
          <h1>
            {/* {error ? <img src={errorImg} /> : <img src={spinnerImg} />} */}
            {errors ? 'no comments' : <img src={loaderImg} />}
          </h1>
        }

      </Row>
    </Container >
  )
}
export default Creatures