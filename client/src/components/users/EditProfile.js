import axios from 'axios'
import { useEffect, useState } from 'react'
import { getToken } from '../../auth/auth'
import { Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import loaderImg from '../../images/loader.gif'
import { ToastContainer, toast, Flip } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'



const EditProfile = () => {
  const navigate = useNavigate()
  const [ profile, setProfile ] = useState([])
  const [ userProfile, setUserProfile ] = useState({
    email: '',
    username: '',
    profile_image: 'https://t3.ftcdn.net/jpg/02/09/37/00/360_F_209370065_JLXhrc5inEmGl52SyvSPeVB23hB6IjrR.jpg',
  })

  const [ errors, setErrors ] = useState(false)
  const [ imageSelect, setImageSelected ] = useState('')
  const [ updatedUserProfile, setUpdatedUserProfile ] = useState('')
  const [ newProfileImg, setNewProfileImg ] = useState('')

  const { userId } = useParams()

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await axios.get('/api/auth/profile/',  {
          headers:
          { Authorization: `Bearer ${getToken()}` },
        })
        console.log(data)
        setUserProfile(data)
        console.log('data loading user------->', data)
        setUpdatedUserProfile(data)
      } catch (error) {
        setErrors(errors.message)
        console.log('error edit prof', errors)
        toast.error(errors.message, {
          position: 'top-center',
          autoClose: 1200,
          transition: Flip,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
    }
    getProfile()
  }, [])
  

  const uploadImage = async (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('file', imageSelect)
    formData.append('upload_preset', 'yfkzazic') 
    const { data } = await axios.post('https://api.cloudinary.com/v1_1/riddles/image/upload', formData)
    setNewProfileImg(data.url)
    console.log('photo data', data)
    setUpdatedUserProfile({ ...updatedUserProfile, profile_image: data.url })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.put(`/api/auth/profile/${userId}/`, updatedUserProfile, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
    
      console.log(data)
      navigate('/profile')
    } catch (error) {
      setErrors(error.message)
      console.log(error.message)
    }
  }

  const handleChange = (event) => {
    setUpdatedUserProfile({ ...updatedUserProfile, [event.target.name]: event.target.value })
    setErrors({ ...errors, [event.target.name]: '', message: '' })
  }

  return (
    <div className="h-full">
      <ToastContainer />
      { userProfile.email ? 
        <>
          <Form onSubmit={handleSubmit} className='edit-user-form'>
            <div className="border-b-2 block md:flex">
              <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md">
                <div className="flex justify-between">
                  {/* <Form.Group>
                    <Form.Label className="text-xl font-semibold block">Username</Form.Label>
                    <Form.Control type='text' name='username' placeholder='Edit display name' value={updatedUserProfile.username} onChange={handleChange} />
                  </Form.Group> */}
                  
                  {/* {/* <span className="text-xl font-semibold block">Admin Profile</span> */}
                </div>

                <span className="text-gray-600">This information is secret so be careful</span>
                <div className="w-full p-8 mx-2 flex justify-center">
                  <Form.Group className='mb-3' >
                    { newProfileImg ?
                      <img className='w-100' src={newProfileImg} alt={'User Uploaded Profile'} />
                      :
                      <></>
                    }
                    <Form.Label><h2>Upload Image</h2></Form.Label>
                    <Form.Control type='file' id='image' className='input' onChange={(event) => {
                      setImageSelected(event.target.files[0])
                    }} />
                    <button className='btn btn-primary' onClick={uploadImage}>Upload image</button>
                  </Form.Group>
                  {/* <img id="showImage" className="max-w-xs w-32 items-center border" src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200" alt="" />                           */}
                </div>
                <button type='submit' className="-mt-2 text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800"> Confirm Edit</button>

              </div>
              <div className="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
                <div className="rounded  shadow p-6">
                  <Form.Group className="pb-6">
                    <Form.Label htmlFor="username" className="font-semibold text-gray-700 block pb-1">User Name</Form.Label>
                    <div className="flex">
                      <Form.Control required onChange={handleChange} name="username" className="border-1  rounded-r px-4 py-2 w-full" type="text" value={updatedUserProfile.username} />
                    </div>
                  </Form.Group>
                  <Form.Group className="pb-6">
                    <Form.Label htmlFor="first_name" className="font-semibold text-gray-700 block pb-1">First Name</Form.Label>
                    <div className="flex">
                      <Form.Control required onChange={handleChange} name="first_name" className="border-1  rounded-r px-4 py-2 w-full" type="text" value={updatedUserProfile.first_name} />
                    </div>
                  </Form.Group>
                  <Form.Group className="pb-6">
                    <Form.Label htmlFor="second_name" className="font-semibold text-gray-700 block pb-1">Second Name</Form.Label>
                    <div className="flex">
                      <Form.Control required onChange={handleChange} name="second_name" className="border-1  rounded-r px-4 py-2 w-full" type="text" value={updatedUserProfile.second_name} />
                    </div>
                  </Form.Group>
                  <Form.Group className="pb-6">
                    <Form.Label htmlFor="bio" className="font-semibold text-gray-700 block pb-1">Bio</Form.Label>
                    <div className="flex">
                      <Form.Control required onChange={handleChange} name="bio" className="border-1  rounded-r px-4 py-2 w-full" as="textarea" value={updatedUserProfile.bio} />
                    </div>
                  </Form.Group>
                  <Form.Group className="pb-4">
                    <Form.Label htmlFor="about" className="font-semibold text-gray-700 block pb-1">Email</Form.Label>
                    <Form.Control required onChange={handleChange} type='text' name="email" className="border-1  rounded-r px-4 py-2 w-full" value={updatedUserProfile.email} />
                    <span className="text-gray-600 pt-4 block opacity-70">Personal login information of your account</span>
                  </Form.Group>
                  <Form.Group className="pb-6">
                    <Form.Label htmlFor="password" className="font-semibold text-gray-700 block pb-1">Password</Form.Label>
                    <div className="flex">
                      <Form.Control required onChange={handleChange} name="password" className="border-1  rounded-r px-4 py-2 w-full" type="password" value={updatedUserProfile.password} />
                    </div>
                  </Form.Group>
                  <Form.Group className="pb-6">
                    <Form.Label htmlFor="password_confirmation" className="font-semibold text-gray-700 block pb-1">Password Confirmation</Form.Label>
                    <div className="flex">
                      <Form.Control required onChange={handleChange} name="password_confirmation" className="border-1  rounded-r px-4 py-2 w-full" type="password" value={updatedUserProfile.password_confirmation} />
                    </div>
                  </Form.Group>
                </div>
              </div>

            </div>
          </Form>
        </>
        :
        <h2 className='text-center'>
          { errors ? 'Something went wrong. Please try again later' : <img src={loaderImg} /> }
        </h2>
    
    
      }
      
    </div>
  )
}
export default EditProfile



{/* 
return (
    <Container className='editUserContainer'>
      { userProfile.email ?
        <>
          <Form onSubmit={handleSubmit} className='edit-user-form'>
            {/* <h1>User Email: { userProfile.email ? userProfile.email : userProfile.email}</h1> */}
{/* <h2>Profile</h2> */}
//         <Form.Group className='mb-3' >
//           <Form.Label>Username</Form.Label>
//           <Form.Control type='text' name='username' placeholder='Edit display name' value={updatedUserProfile.username} onChange={handleChange} />
//         </Form.Group>
//         {/* <Col>
//           <img className='w-100' src={userProfile.profile_image} alt={updatedUserProfile.username} />
//         </Col> */}
//         <hr />
//         <Form.Group className='mb-3' >
//           <Form.Label>First Name</Form.Label>
//           <Form.Control type='text' name='first_name' placeholder='Edit First Name' value={updatedUserProfile.first_name} onChange={handleChange} />
//         </Form.Group>
//         <hr />
//         <Form.Group className='mb-3' >
//           <Form.Label>Last Name</Form.Label>
//           <Form.Control type='text' name='last_name' placeholder='Edit Last Name' value={updatedUserProfile.last_name} onChange={handleChange} />
//         </Form.Group>
//         <hr />
//         <Form.Group className='mb-3' >
//           <Form.Label>Email</Form.Label>
//           <Form.Control type='text' name='email' placeholder='Edit Email' value={updatedUserProfile.email} onChange={handleChange} />
//         </Form.Group>
//         <hr />
//         <Form.Group className='mb-3' >
//           <Form.Label>Bio</Form.Label>
//           <Form.Control type='text' as='textarea' name='bio' placeholder='Edit Bio' value={updatedUserProfile.bio} onChange={handleChange} />
//         </Form.Group>
//         <hr />
//         <Form.Group className='mb-3' >
//           <Form.Label>Password</Form.Label>
//           <Form.Control onChange={handleChange} type='password' name='password' placeholder='Password' value={updatedUserProfile.password}  />
//         </Form.Group>
//         <Form.Group className='mb-3' >
//           <Form.Label>Confirm Password</Form.Label>
//           <Form.Control onChange={handleChange} type='password' name='password_confirmation' placeholder='Confirm Password' value={updatedUserProfile.password_confirmation} />
//         </Form.Group>
//         <hr />
//         <Form.Group className='mb-3' >
//           { newProfileImg ?
//             <img className='w-100' src={newProfileImg} alt={'User Uploaded Profile'} />
//             :
//             <></>
//           }
//           <Form.Label><h2>Upload Image</h2></Form.Label>
//           <Form.Control type='file' id='image' className='input' onChange={(event) => {
//             setImageSelected(event.target.files[0])
//           }} />
//           <button className='btn btn-primary' onClick={uploadImage}>Upload image</button>
//         </Form.Group>
//         <hr />
//         <button className='btn btn-primary' type='submit'>Submit</button>
//         <hr />
//       </Form>
//     </>
//     :
//     <h2 className='text-center'>
//       { errors ? 'Something went wrong. Please try again later' : <img src={loaderImg} /> }
//     </h2>
//   }
// </Container>
// )  */}