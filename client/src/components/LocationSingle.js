
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast, Flip } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import YoutubeEmbed from './YoutubeEmbed'
import loaderImg from '../images/loader.gif'

import { Carousel } from 'react-responsive-carousel'
import { getToken, userIsAuthenticated } from '../auth/auth'

const LocationSingle = () => {
  const navigate = useNavigate()
  const { locationId } = useParams()


  const [ location, setLocation ] = useState(null)
  const [ errors, setErrors ] = useState(false)
  const [ reviews, setReviews ] = useState([])
  const [ reviewId, setReviewID ] = useState('')
  // const [ username, setUsername ] = useState('')
  const [formData, setFormData] = useState({
    text: '',
    location: parseInt(locationId),
  })
  const [ currentUser, setCurrentUser ] = useState('')
  const [ owner, setOwner ] = useState([])
  // const [ update, setUpdate ] = useState(false)
  // const [ updateReview, setUpdateReview ] = useState({
  //   text: '',
  //   location: parseInt(locationId),
  // })

  const getData = async () => {
    try {
      const { data } = await axios.get(`/api/locations/${locationId}/`)
      // console.log('single location ----------------->',data)
      setLocation(data)
      setReviews(data.reviews)
      setReviewID(data.reviews.id)
      // console.log('owner_id -------->', data.reviews[0].id)
      // console.log('data.reviews =================>', data.reviews)
    } catch (error) {
      setErrors(error.message)

      console.log('errors -----------> ', error.message)
    }
  } 

  useEffect(() => {

    getData()
  }, [])

  // ! User info
  useEffect(() => {

    const getUser = async () => {
      try {
        const { data } = await axios.get('/api/auth/profile/', {
          headers: { Authorization: `Bearer ${getToken()}` },
        })
        setCurrentUser(data)
        setOwner(data.owner[0].id)
        // console.log('owner', data.owner[0].id)
        console.log('data from profile ---->', data)
        // console.log('check this', data.reviews[0].owner.id)
      } catch (error) {
        setErrors(error.message)
        // console.log('error', error.message)
      }
    }

    getUser()
  }, [])

  const headers = () => {
    const token = getToken().split(' ')[1]
    return {
      headers: { Authorization: `Bearer ${getToken()}` },

    }
  }
  // reviews[0].id
  // reviews[0].owner.id

  const handleAddComment = async (event) => {
    event.preventDefault()
    try {
      console.log(getToken())
      console.log('form data -->', formData)

      const { data } = await axios.post('/api/reviews/', formData, headers() )

      setLocation(data)
      setFormData({ ...formData, text: '' })
      console.log('res--------------------------->', data)
      toast.success(data.message, {
        position: 'top-right',
        autoClose: 1200,
        transition: Flip,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      window.location.reload()
    } catch (error) {
      console.log(error)
    }

  }

  const handleReview = async (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
    setErrors({ ...errors, [event.target.name]: '', message: '' })
    
  }



  // Delete comments
  const handleDelete = async (event) => {
    console.log('comment to delete -->', event.target.name)
    try {
      const { data } = await axios.delete(`/api/reviews/${event.target.name}/`,
        headers()
      )
      console.log('delete data ----->', data.message)
      
      getData()

    } catch (e) {
      setErrors(e)
      console.log('here ---------->', errors)
      toast.error(errors.message, {
        position: 'bottom-center',
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

  // const submitHandleEdit = (event) => {
  //   setUpdateReview(true)
    
  //   console.log('setUpdate')
  // }

  // useEffect(() => {
  //   console.log('location', location)
  // }, [location])


  return (
    <div className="location-single-wrapper text-center">
      <ToastContainer />
      { location ?
        <>
          <Carousel className='main-carousel' showArrows={true} >
            <div className='youtube'>
              <YoutubeEmbed embedId={location.youtube_id} />
              <h3 className="legend">{location.name}</h3>
            </div>
            <div>
              <img src={location.location_image_1} />
              <h3 className="legend">{location.name}</h3>
            </div>
            <div>
              <img src={location.location_image_2} />
              <h3 className="legend">{location.name}</h3>
            </div>
            <div>
              <img src={location.location_image_3} />
              <h3 className="legend">{location.name}</h3>
            </div>
          </Carousel>
          <Container className='content-wrapper'>
            <Row className='content'>
              <Col md='6'>
                <h2>History</h2>
                <p>{location.history}</p>
                <h2>Description</h2>
                <p>{location.trivia}</p>
                <hr />
                <p>Risk To Life: <span className={location.risk === 'High Risk' ? 'high' : 'not-high'}>{location.risk}</span></p>
                <hr />
                <h2>Inhabitants</h2>
                {location.inhabitants.length > 0 &&
                <>
                  <p>{location.inhabitants[0].name}</p>
                  <Carousel className='w-full h-1/2' showArrows={true} >
                    <div>
                      <img className='caro-inhab' src={location.inhabitants[0].image1} />
                      <p className="legend">{location.name}</p>
                    </div>
                    <div>
                      <img className='caro-inhab' src={location.inhabitants[0].image2} />
                      <p className="legend">{location.name}</p>
                    </div>
                    <div>
                      <img className='caro-inhab' src={location.inhabitants[0].image3} />
                      <p className="legend">{location.name}</p>
                    </div>
                  </Carousel>  
                </>  
                }
              
              </Col>
              <Col md='6'>
                <h2>Creatures</h2>
                {/* { location.creatures.length > 0 ? */}
                { location.creatures.length > 0 &&
                <>
                  <p>{location.creatures[0].name}</p>
                  <hr />
                  <Col>
                    <Carousel className='w-100 h-100' showArrows={true} >
                      <div>
                        <img className='caro-rehab' src={location.creatures[0].image1} />
                        <p className="legend">{location.name}</p>
                      </div>
                      <div>
                        <img className='caro-rehab' src={location.creatures[0].image2} />
                        <p className="legend">{location.name}</p>
                      </div>
                      <div>
                        <img className='caro-rehab' src={location.creatures[0].image3} />
                        <p className="legend">{location.name}</p>
                      </div>
                    </Carousel>
                  </Col>
                </>  
                }
              </Col>
            </Row>
            <Row className='review-wrapper d-flex flex-sm-row flex-column align-content-center justify-content-center'>
              <div className="container-review">
                { location.reviews.length > 0
                  &&
                  location.reviews.map(review => {
                    // console.log('review owner', )
                    return (                       
                      <div key={review.id} className="review-user row pt-5">
                        <div className="review-cards col-md-6 col-lg-4 pb-3">
                          <div className="card card-custom bg-white border-white border-0">
                            <div className="card-custom-img mt-3">
                            </div>
                            <div className='card-custom-avatar'>
                              <img className='review-owner-img' src={review.owner.profile_image}/> 
                            </div> 
                            <div className='card-body'>
                              <h4 className="card-title">{review.owner.username}</h4>
                              <p className="card-text">{review.text}</p>
                            </div>
                            <div className="card-footer">
                              <div className='review-buttons'>
                                {userIsAuthenticated() ? (
                                  <>
                                    <button className='btn btn-warning' name={review.id} onClick={handleDelete} > 
                                  Delete
                                    </button>
                                    <Link to={`/edit-review/${locationId}/${review.id}`} className='btn dark'>
                                      <button className='btn btn-warning'>
                                  Edit </button></Link>
                                  </>
                                ) : (
                                  <></>
                                )} 
                   

                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
            
                }
              </div>
            </Row>
          </Container>
        </>
        :
        <h2 className='text-center'>
          { errors ? <h2> Something went wrong.</h2> : <img src={loaderImg} /> }
        </h2> 
      }
      <div>
        <form className='add-review' onSubmit={handleAddComment}>
          <div className='mb-4 w-full h-1/2 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 pt-2'>
            <div className='py-2 px-4 bg-white rounded-t-lg dark:bg-gray-600'>
              <label htmlFor='comment' className='sr-only'>Your comment</label>
              <textarea id='comment' rows='4' className='px-0 w-full text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400' name='text' value={formData.text} maxLength='280' onChange={handleReview} placeholder='Write a comment...' required></textarea>
            </div>
            <div className='flex justify-between items-center py-2 px-3 border-t dark:border-gray-600 '>
              <button type="submit" value="Add Comment" name={locationId} required className=" btn btn-primary inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
              Post Review of the Destination
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LocationSingle


{/* <div class="wrapper bg-gray-400 antialiased text-gray-900">
<div>
    
    <img src="https://source.unsplash.com/random/350x350" alt=" random imgee" class="w-full object-cover object-center rounded-lg shadow-md">    
    
 <div class="relative px-4 -mt-16  ">
   <div class="bg-white p-6 rounded-lg shadow-lg">
    <div class="flex items-baseline">
      <span class="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
        New
      </span>
      <div class="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider">
    2 baths  &bull; 3 rooms
  </div>  
    </div>
    
    <h4 class="mt-1 text-xl font-semibold uppercase leading-tight truncate">A random Title</h4>
 
  <div class="mt-1">
    $1800
    <span class="text-gray-600 text-sm">   /wk</span>
  </div>
  <div class="mt-4">
    <span class="text-teal-600 text-md font-semibold">4/5 ratings </span>
    <span class="text-sm text-gray-600">(based on 234 ratings)</span>
  </div>  
  </div>
 </div>
  
</div>
  </div> */}







{/* <>
      <Container as='main'>
        
        <Row>
          { location ? 
            <>
              <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
                <h2 className="text-3xl text-gray-700 font-bold mb-5">
                  {location.name}</h2>
              </div>
              <div className='main-carousel'>
                <Col  md='6'>
                  <Carousel showArrows={true} >
                    {/* <div className='youtube'>
                      <YoutubeEmbed embedId={location.youtube_id} />
                    </div> */}
//                 <div>
//                   <img src={location.location_image_1} />
//                   <h3 className="legend">{location.name}</h3>
//                 </div>
//                 <div>
//                   <img src={location.location_image_2} />
//                   <h3 className="legend">{location.name}</h3>
//                 </div>
//                 <div>
//                   <img src={location.location_image_3} />
//                   <h3 className="legend">{location.name}</h3>
//                 </div>
//               </Carousel>
//             </Col>
//           </div>
//           <Col md='6'>
//             <h2 className='h2-class'>History</h2>
//             <p>{location.history}</p>
//             <h2>Description</h2>
//             <p>{location.trivia}</p>
//             <hr />
//             <h2>Risk Level</h2>
//             <p>{location.risk}</p>
//             <hr />
//             <h2>Inhabitants</h2>
//             { location.inhabitants.length > 0 &&
//             <>
//               <p>{location.inhabitants.name}</p>
//               <hr />
//               <Col>
//                 <Carousel className='w-100 h-100' showArrows={true} >
//                   <div>
//                     <img src={location.inhabitants[0].image1} />
//                     <p className="legend">{location.name}</p>
//                   </div>
//                   <div>
//                     <img src={location.inhabitants[0].image2} />
//                     <p className="legend">{location.name}</p>
//                   </div>
//                   <div>
//                     <img src={location.inhabitants[0].image3} />
//                     <p className="legend">{location.name}</p>
//                   </div>
//                 </Carousel>
//               </Col>
//             </>
//             }
//             <h3>Creatures</h3>
//             { location.creatures.length > 0 &&
//             <>
//               <p>{location.creatures.name}</p>
//               <hr />
//               <Col>
//                 <Carousel className='w-100 h-100' showArrows={true} >
//                   {/* <div className='youtube'>
//                     <YoutubeEmbed embedId={location.youtube_id} />
//                   </div> */}
//                   <div>
//                     <img src={location.creatures[0].image1} />
//                     <p className="legend">{location.name}</p>
//                   </div>
//                   <div>
//                     <img src={location.creatures[0].image2} />
//                     <p className="legend">{location.name}</p>
//                   </div>
//                   <div>
//                     <img src={location.creatures[0].image3} />
//                     <p className="legend">{location.name}</p>
//                   </div>
//                 </Carousel>
//               </Col>
//             </>
//             }
//             {location.youtube_id && 
//             <Col className='title-media mb-4 justify-content-center mt-4'>
//               <div className='youtube'>
//                 <YoutubeEmbed embedId={location.youtube_id} />
//               </div>
//             </Col>
//             }
//             <hr />
//             <button className='btn-back btn-dark'><Link to='/locations' >Back to all Locations</Link></button>
//           </Col>
//           {/* COMMENTS SECTION */}
//           <form onSubmit={submitHandleEdit} >
//             <div className='grid grid-cols-3'>
//               <div className='col-span-2'>

//                 <h3>Destination Reviews</h3>
//                 { location.reviews.length > 0
//                   &&
//                   location.reviews.map(review => {
//                     const { id, owner, text } = review
//                     return (                       
                    
                        
//                       <section key={id} >
//                         <h5 className='text-xl pt-2 pb-2 border-t dark:border-gray-600'> User: {review.owner.username} <img className='review-owner-img' src={review.owner.profile_image}/> </h5>
//                         <p>
//                           {review.text}
//                         </p>
//                         <button className='btn btn-warning' name={review.id} onClick={handleDelete} {...review.username === review.owner.username ? 'review-display hide' : 'review-display'}> 
//                           Delete
//                         </button>
//                         <Link to={`/edit-review/${locationId}/${review.id}`} className='btn dark'>
//                           <button className='btn btn-warning'>
//                           Edit </button></Link>
//                         <div className="buttons">
//                         </div>
//                       </section>
//                     )
//                   })
//                 }
//               </div>
//             </div>
//           </form>
//         </>
//         :
//         <h2 className='text-center'>
//           { errors ? <h2> Something went wrong.</h2> : <img src={loaderImg} /> }
//         </h2> 
//       }
//     </Row>
//     <form onSubmit={handleAddComment}>
//       <div className='mb-4 w-full h-1/2 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 pt-2'>
//         <div className='py-2 px-4 bg-white rounded-t-lg dark:bg-gray-600'>
//           <label htmlFor='comment' className='sr-only'>Your comment</label>
//           <textarea id='comment' rows='4' className='px-0 w-full text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400' name='text' value={formData.text} maxLength='280' onChange={handleReview} placeholder='Write a comment...' required></textarea>
//         </div>
//         <div className='flex justify-between items-center py-2 px-3 border-t dark:border-gray-600 '>
//           <button type="submit" value="Add Comment" name={locationId} required className=" btn btn-primary inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
//           Post Review of the Destination
//           </button>
//         </div>
//       </div>
//     </form>
//   </Container>
// </> */}