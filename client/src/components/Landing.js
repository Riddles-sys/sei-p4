import { Link } from 'react-router-dom'
import mainImage from '../images/hobbit-home.gif'

const Landing = () => {
  return (
    <section className='landing-page'>
      <div className="container mx-auto bg-transparent rounded-xl shadow border p-10">
        <div>
          <div className='entry'>
            <h1 className="title-main text-3xl text-gray-700 font-bold mb-5">
              Welcome to Middle Earth Tours
            </h1>
          </div>
          <div className='enter'>
            <p> Where adventure awaits.</p>
          </div>
          
        </div>
        <div className='enter-button'>
          <img  src={mainImage} alt='opening door gif' />
          <button className='landing-btn btn btn-success'><Link to='/locations'>Explore</Link></button>
        </div>
      </div>
    </section>
  )
}
export default Landing

