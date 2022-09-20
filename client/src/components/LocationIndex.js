import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { Container, Row, Col, Card } from 'react-bootstrap'
import loaderImg from '../images/loader.gif'
import mainmap from '../images/mainmap.jpg'


const LocationIndex = () => {
  const [locations, setLocations] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/locations/')

        setLocations(data)
        console.log('error', data.error.message)
        // console.log(data)
      } catch (error) {
        setError(error.message)
        console.log(error)
      }
    }
    getData()
  }, [])
  
  return (
    <>
      <Container as='main' className='landing-index'>
        <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
          <p className="text-3xl text-gray-700 font-bold mb-5">
          Destinations
          </p>
          <div className='destinations text-gray-500 text-lg'>
            <ul className='destinations-ul'>
              <li className='location-list border shadow p-3 mb-5 bg-white rounded'><Link to={'/locations/1'}>The Shire</Link></li>
              <li className='border shadow p-3 mb-5 bg-white rounded'><Link to={'/locations/2'}>Bree</Link></li>
              <li className='border shadow p-3 mb-5 bg-white rounded'><Link to={'/locations/3'}>Mount Gundabad</Link></li>
              <li className='border shadow p-3 mb-5 bg-white rounded'><Link to={'/locations/4'}>Rivendell</Link></li>
              <li className='border shadow p-3 mb-5 bg-white rounded'><Link to={'/locations/5'}>Mirkwood</Link></li>
              <li className='border shadow p-3 mb-5 bg-white rounded'><Link to={'/locations/6'}>Erebor</Link></li>
              <li className='border shadow p-3 mb-5 bg-white rounded'><Link to={'/locations/7'}>Lake Town/Esgaroth</Link></li>
              <li className='border shadow p-3 mb-5 bg-white rounded'><Link to={'/locations/8'}>Moria</Link></li>
              <li className='border shadow p-3 mb-5 bg-white rounded'><Link to={'/locations/9'}>Isengard</Link></li>
              <li className='border shadow p-3 mb-5 bg-white rounded'><Link to={'/locations/10'}>Dol Guldur</Link></li>
              <li className='border shadow p-3 mb-5 bg-white rounded'><Link to={'/locations/11'}>Helms Deep</Link></li>
              <li className='border shadow p-3 mb-5 bg-white rounded'><Link to={'/locations/12'}>Minas Tirith</Link></li>
              <li className='border shadow p-3 mb-5 bg-white rounded'><Link to={'/locations/13'}>Mount Doom</Link></li>
              <li className='border shadow p-3 mb-5 bg-white rounded'><Link to={'/locations/14'}>Minas Morgul</Link></li>
            </ul>
          </div>
          <p>Click on the map below for your desired location</p>
        </div>
        <div >

          <img className='img-map' src={mainmap} useMap="#image-map"/>

          <map className="map-hover" name="image-map">
            <area target="" className="map-hover" alt="The Shire" title="The Shire" href="/locations/1" coords="361,293,474,283,501,416,398,434" shape="poly"/>
            <area target="" className="map-hover" alt="Bree" title="Bree" href="/locations/2" coords="480,283,594,278,610,424,510,425" shape="poly"/>
            <area target="" className="map-hover" alt="Mount Gundabad" title="Mount Gundabad" href="/locations/3" coords="736,117,852,102,850,189,744,192,726,114" shape="poly"/>
            <area target="" className="map-hover" alt="Rivendell" title="Rivendell" href="/locations/4" coords="721,284,809,283,833,342,713,347" shape="poly"/>
            <area target="" className="map-hover" alt="Mirkwood" title="Mirkwood" href="/locations/5" coords="991,329,1120,322,1117,509,1000,473" shape="poly"/>
            <area target="" className="map-hover" alt="Erebor" title="Erebor" href="/locations/6" coords="1013,154,1146,163,1144,233,1008,218" shape="poly"/>
            <area target="" className="map-hover" alt="Lake Town/Esgaroth" title="Lake Town/Esgaroth" href="/locations/7" coords="1017,226,1143,236,1143,295,1003,293" shape="poly"/>
            <area target="" className="map-hover" alt="Moria" title="Moria" href="/locations/8" coords="693,423,794,447,775,505,666,488" shape="poly"/>
            <area target="" className="map-hover" alt="Isengard" title="Isengard" href="/locations/9" coords="631,598,731,604,720,710,617,698" shape="poly"/>
            <area target="" className="map-hover" alt="Dol Guldur" title="Dol Guldur" href="/locations/10" coords="905,462,973,447,1033,534,888,540,881,472" shape="poly"/>
            <area target="" className="map-hover" alt="Helms Deep" title="Helms Deep" href="/locations/11" coords="740,690,826,700,798,770,698,746,748,686" shape="poly"/>
            <area target="" className="map-hover" alt="Minas Tirith" title="Minas Tirith" href="/locations/12" coords="932,773,1045,795,1035,864,934,854" shape="poly"/>
            <area target="" className="map-hover" alt="Mount Doom" title="Mount Doom" href="/locations/13" coords="1095,746,1191,752,1208,815,1107,818,1087,784" shape="poly"/>
            <area target="" className="map-hover" alt="Minas Morgul" title="Minas Morgul" href="/locations/14" coords="1048,796,1103,821,1122,848,1090,876,1042,869" shape="poly"/>
          </map>
        </div>
      </Container >
    </>
  )
}
export default LocationIndex

