import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getToken } from '../auth/auth'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


const NewLocation = () => {
  const navigate = useNavigate()
  const [ imageSelect, setImageSelected ] = useState('')
  const [ errors, setErrors ] = useState(false)
  const [ newLocation, setNewLocation ] = useState({})
  useEffect(() => {
  }, [])
  const handleChange = (event) => {
    setNewLocation({ ...newLocation, [event.target.name]: event.target.value })
    setErrors(true)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/locations/', newLocation, {
        headers: {
          Authorization: `Bearer ${getToken()}`,  
          
        },
      })
      console.log(data)
      navigate('/locations')
    } catch (error) {
      setErrors(error.message)
      console.log(error)
    }
  } 
  return (
    <main className="add-destinationForm">
      <div className="add-form-wrapper">
        <Form className='add-destination-form'  onSubmit={handleSubmit}>
          <h1>Add Destination</h1>    
          <Form.Group className="mb-3" >
            <Form.Label>Name</Form.Label>
            {/* name is done  */}
            <Form.Control type="text" name="name" placeholder="Name " value={newLocation.name} onChange={handleChange} /> 
          </Form.Group>
          <hr />
          <Form.Group className="mb-3" >
            <Form.Label>History</Form.Label>
            <Form.Control type="text" name="history" placeholder="History" value={newLocation.history} onChange={handleChange} />
            <hr />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Trivia</Form.Label>
            <Form.Control type="text" name="trivia" placeholder="Location" value={newLocation.trivia} onChange={handleChange} />
            <hr />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Image One</Form.Label>
            <Form.Control as="textarea" type="text" rows={4} name="location_image_1" placeholder="Image URL here" value={newLocation.location_image_1} onChange={handleChange} />        
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Image Two</Form.Label>
            <Form.Control as="textarea" type="text" rows={4} name="location_image_2" placeholder="Image URL here" value={newLocation.location_image_2} onChange={handleChange} />        
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Image Three</Form.Label>
            <Form.Control as="textarea" type="text" rows={4} name="location_image_3" placeholder="Image URL here" value={newLocation.location_image_3} onChange={handleChange} />        
          </Form.Group>
          <hr />
          <Form.Group className="mb-3" >
            <Form.Label>trailer</Form.Label>
            <Form.Control type="text" name="youtube_id" placeholder="insert youtube id" value={newLocation.youtube_id} onChange={handleChange} /> 
          </Form.Group>
          <Button className ="button-submit" type="submit">Submit</Button>
          { errors && <p className='text-danger'>{errors.message}</p>}
        </Form>
      </div>
    </main>
  )
}
export default NewLocation












