import { Link } from 'react-router-dom'
import notFound from '../images/notfound-removebg-preview.png'

const NotFound = () => {
  return (
    <div className='notFound'>
      
      <Link to='/'><img src={notFound} alt='not found'/></Link>
    </div>
  )
}

export default NotFound

