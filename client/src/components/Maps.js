import map from '../images/1-Map.jpg'

const Maps = () => {
 
  return (
    <div className='maps-page container '>
      <div className="container-map mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
        <h1 className="title text-3xl text-gray-700 font-bold mb-5">
        Welcome to Maps</h1>              
      </div>
      {/* <iframe src="https://lotrproject.com/map/#zoom=3&lat=-1315.5&lon=1500&layers=BTTTTT" title="LOTR Project" width="100%" height="500"></iframe> */}
      <img className='img-map' src={map} alt='muti map' />
    </div>
    
  )
}

export default Maps