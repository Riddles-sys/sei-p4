import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getToken } from '../auth/auth'

  

  


// ! need to change this page
const EditReview = () => {
  const { locationId, reviewId } = useParams()
  const [ formData, setFormData ] = useState({
    text: '',
    location: parseInt(locationId),
  })
  const [ locations, setLocations ] = useState(null)
  const [ reviews, setReviews ] = useState([])
  const [ updatedReview, setUpdatedReview ] = useState('')
  const navigate = useNavigate()
  const [ errors, setErrors ] = useState(false)


  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/locations/${locationId}/`)
        setLocations(data)
        setReviews(data.review)
        setUpdatedReview(data)
      } catch (error) {
        setErrors(error.message)
        console.log(error.message)
      }
    } 
    getData()
  }, [locationId])


  const handleSubmitReview = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.put(`/api/reviews/${reviewId}/`, formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log('data ------>', data)
      setFormData({ text: '', location: '', owner: '' })
      setLocations(data)
      console.log(setReviews)
      navigate(`/locations/${locationId}`)
    } catch (error) {
      console.log(error)
      setErrors(error.message)
    }
  }


  const handleChange = async (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
    setErrors({ ...errors, [event.target.name]: '', message: '' })
  }

  return (
    <>
      <div className="flex mx-auto items-center justify-center shadow-lg mt-56 mx-8 mb-4 max-w-lg">
        <form className="w-full max-w-xl bg-white rounded-lg px-4 pt-2" onClick={handleSubmitReview}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">Edit Your Comment</h2>
            <div className="w-full md:w-full px-3 mb-2 mt-2">
              <textarea onChange={handleChange} name='text' value={updatedReview.text} 
                className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" placeholder='Type Your Updated Comment' required></textarea>
            </div>
            <div className="w-full md:w-full flex items-start md:w-full px-3">
              <div className="-mr-1">
                <input type='submit' className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100" value='Edit Comment' />
              </div>
            </div>
          </div>
        </form>
      </div>
      
    </>
  )
}


export default EditReview




