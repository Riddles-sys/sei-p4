import { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, Col, Row, Container } from 'react-bootstrap'
import loaderImg from '../../images/loader.gif'
import { Link } from 'react-router-dom'


const Inhabitants = () => {
  const [inhabitants, setInhabitants] = useState([])
  const [errors, setErrors] = useState(false)


  const getData = async () => {
    try {
      const { data } = await axios.get('/api/inhabitants/')
      console.log('single inhabitant',data)
      setInhabitants(data)
      
    

    } catch (error) {
      setErrors(error.message)

      console.log(error.message)
    }
  } 

  useEffect(() => {

    getData()
  }, [])


  return (
    <Container as='main' className='inhabitants-index'>
      <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
        <h2 className="text-3xl text-gray-700 font-bold mb-5">
          Inhabitants</h2>
      </div>
      <Row>
        {inhabitants.length > 0 ?
          <>
            {inhabitants.map(inhabitant => {
              const { id } = inhabitant
              return (
                <Col className="mb-4" md='3' key={id}>
                  <Link className="mb-4" to={`/inhabitants/${id}`}>
                    <Card className='inhabitants-card hover:grid'>
                    
                      <Card.Img variant='top' className='w-100' src={inhabitant.image1}></Card.Img>
                      <Card.Title className='overlay'>{inhabitant.name}</Card.Title>
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
export default Inhabitants