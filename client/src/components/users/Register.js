import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { ToastContainer, toast, Flip } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'



const Register = () => {
  const navigate = useNavigate()
  //! State
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    bio: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    profile_image: 'https://static.thenounproject.com/png/82766-200.png',
  })

  const [errors, setErrors] = useState({
    first_name: { message: '' },
    email: { message: '' },
    username: { message: '' },
    password: { message: '' },
    confirmPassword: { message: '' },
  })

  //! Functions
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
    setErrors({ ...errors, [event.target.name]: '' })
  }

  const setTokenToLocalStorage = (token) => {
    window.localStorage.setItem('token', token)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('wtf ------>')
    try {
      const { data } = await axios.post('/api/auth/register/', formData)
      setTokenToLocalStorage(data.token)
      console.log('endpoint reach ------>')
      setFormData(data.formData)
      navigate('/login')
      console.log(formData)
    } catch (errors) {
      setErrors(errors.message)
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
      console.log('error ->', errors.response.data.errors)
      if (errors.response.data.errors) setErrors(errors.response.data.errors)
    }
  }




  return (
    <section className="registration min-vh-80 bg-image">
      <ToastContainer />
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center ">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" >
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                  <form className='register' onSubmit={handleSubmit}>

                    <div className="form-outline mb-4">
                      <input type="text" name="first_name" onInput={handleChange} value={formData.first_name} className="form-control form-control-lg" />
                      <label className="form-label" htmlFor="first_name" required >Your Name</label>
                    </div>
                    <div className="form-outline mb-4">
                      <input type="text" name="last_name" onInput={handleChange} value={formData.last_name} className="form-control form-control-lg" />
                      <label className="form-label" htmlFor="last_name" required>Your Last Name</label>
                    </div>
                    <div className="form-outline mb-4">
                      <input type="text" name="username" onInput={handleChange} value={formData.username} className="form-control form-control-lg" />
                      <label className="form-label" htmlFor="username" required>Username</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input type="email" name="email" onInput={handleChange} value={formData.email} className="form-control form-control-lg" />
                      <label className="form-label" htmlFor="email" required >Your Email</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input type="text" name="bio" onInput={handleChange} value={formData.bio} className="form-control form-control-lg" />
                      <label className="form-label" htmlFor="bio">About You</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input type="password" className="form-control form-control-lg" name="password" value={formData.password} onInput={handleChange} />
                      <label className="form-label" htmlFor="password" required >Password</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input onInput={handleChange} type="password" name="password_confirmation" value={formData.password_confirmation} className="form-control form-control-lg" />
                      <label className="form-label" htmlFor="password_confirmation" required >Repeat your password</label>
                    </div>

                    <div className="d-flex justify-content-center">
                      <button type="submit" value="Register"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                    </div>

                    <p className="text-center mb-0 mt-3">Already signed in?</p>
                    <p className="text-center mb-0">
                      <Link to="/login">Login</Link>
                    </p>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>



  // <Container className="form-wrapper min-vh-100">
  //   <ToastContainer />
  //   {/* <Row> */}
  //   <form onSubmit={handleSubmit} className="justify-content-between">
  //     <h3 className="text-center">Register</h3>
  //     <Row>
  //       <label htmlFor="first_name">Name</label>
  //       <input
  //         onInput={handleChange}
  //         type="text"
  //         name="first_name"
  //         value={formData.first_name}
  //         placeholder="First Name"
  //         required
  //       />
  //     </Row>
  //     <Row>
  //       <label htmlFor="last_name">Name</label>
  //       <input
  //         onInput={handleChange}
  //         type="text"
  //         name="last_name"
  //         value={formData.last_name}
  //         placeholder="Last Name"
  //         required
  //       />
  //     </Row>
  //     {/* Email */}
  //     <Row>
  //       <label htmlFor="username">Username</label>
  //       <input
  //         onInput={handleChange}
  //         type="text"
  //         name="username"
  //         value={formData.username}
  //         placeholder="Username"
  //         required
  //       />
  //     </Row>

  //     {/* Email */}
  //     <Row>
  //       <label htmlFor="email">Email</label>
  //       <input
  //         onInput={handleChange}
  //         type="email"
  //         name="email"
  //         value={formData.email}
  //         placeholder="Email"
  //         required
  //       />
  //     </Row>
  //     <Row>
  //       <label htmlFor="bio">Bio</label>
  //       <input
  //         onInput={handleChange}
  //         type="text"
  //         name="bio"
  //         value={formData.bio}
  //         placeholder="Name"
  //         required
  //       />
  //     </Row>
  //     {/* Password */}
  //     <Row>
  //       <label htmlFor="password">Password</label>
  //       <input
  //         onInput={handleChange}
  //         type="password"
  //         name="password" value={formData.password}
  //         placeholder="Password"
  //         required
  //       />
  //     </Row>

  //     {/* Confirm Password */}
  //     <Row>
  //       <label htmlFor="password_confirmation">Confirm Password</label>
  //       <input
  //         onInput={handleChange} type="password" name="password_confirmation" value={formData.password_confirmation}
  //         placeholder="Confirm Password"
  //         required
  //       />
  //     </Row>
  //     {/* Error Message */}
  //     {/* <p className='text-danger my-2'>Error Message</p> */}

  //     {/* Submit */}
  //     <input type="submit" value="Register" className="btn dark" />
  //     <p className="text-center mb-0 mt-3">Already signed in?</p>
  //     <p className="text-center mb-0">
  //       <Link to="/login">Login</Link>
  //     </p>
  //   </form>
  //   {/* </Row> */}
  // </Container>
  )
}

export default Register

// <section className="vh-100 bg-image"
//   style="background-image: url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp');">
//   <div className="mask d-flex align-items-center h-100 gradient-custom-3">
//     <div className="container h-100">
//       <div className="row d-flex justify-content-center align-items-center h-100">
//         <div className="col-12 col-md-9 col-lg-7 col-xl-6">
//           <div className="card" style="border-radius: 15px;">
//             <div className="card-body p-5">
//               <h2 className="text-uppercase text-center mb-5">Create an account</h2>

//               <form onSubmit={handleSubmit}>

//                 <div className="form-outline mb-4">
//                   <input type="text" name="first_name" value={formData.first_name} className="form-control form-control-lg" />
//                   <label className="form-label" htmlFor="first_name" required >Your Name</label>
//                 </div>
//                 <div className="form-outline mb-4">
//                   <input type="text" name="last_name" value={formData.last_name} className="form-control form-control-lg" />
//                   <label className="form-label" htmlFor="last_name" required>Your Last Name</label>
//                 </div>
//                 <div className="form-outline mb-4">
//                   <input type="text" name="username" value={formData.username} className="form-control form-control-lg" />
//                   <label className="form-label" htmlFor="username" required>Username</label>
//                 </div>

//                 <div className="form-outline mb-4">
//                   <input type="email" name="email" value={formData.email} className="form-control form-control-lg" />
//                   <label className="form-label" htmlFor="email">Your Email</label>
//                 </div>

//                 <div className="form-outline mb-4">
//                   <input type="text" name="bio" onInput={handleChange} value={formData.bio} className="form-control form-control-lg" />
//                   <label className="form-label" htmlFor="bio">Your </label>
//                 </div>

//                 <div className="form-outline mb-4">
//                   <input type="password" className="form-control form-control-lg" name="password" value={formData.password} onInput={handleChange} />
//                   <label className="form-label" htmlFor="password">Password</label>
//                 </div>

//                 <div className="form-outline mb-4">
//                   <input onInput={handleChange} type="password" name="password_confirmation" value={formData.password_confirmation} className="form-control form-control-lg" />
//                   <label className="form-label" htmlFor="password_confirmation">Repeat your password</label>
//                 </div>

//                 <div className="d-flex justify-content-center">
//                   <button type="submit" value="Register"
//                     className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
//                 </div>

//                 <p className="text-center mb-0 mt-3">Already signed in?</p>
//                 <p className="text-center mb-0">
//                   <Link to="/login">Login</Link>
//                 </p>
//               </form>

//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </section>