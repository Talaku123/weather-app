import { useState } from 'react'
import axios from 'axios';
import './App.css';
import { Button } from 'react-bootstrap';
import Header from './Header';


function App() {


  const [inputCity, setInputCity] = useState("")
  const [data, setData] = useState({});

  const apiKey = "c6ff7abc7bad6add7c9205ec1b5afbed"

  const getWeatherDetails = (cityName) => {

    if (!cityName) return
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey
    axios.get(apiURL).then((res) => {

      console.log("response", res.data);

      setData(res.data)

    }).catch((err) => {
      console.log("please try again", err);
    })
  }

  const handleChangeInput = (e) => {
    console.log("value", e.target.value);
    setInputCity(e.target.value)
  }
  const handleSearch = () => {
    getWeatherDetails(inputCity)
  }

  return (
    <div className="App">
      <Header/>
      <div className='next'>
        <div className='d-grid col-12 gap-3 mt-4' >
          <input className='form-control' type='text' placeholder='search your city' value={inputCity} onChange={handleChangeInput} />
          <Button className='btn btn-primary' type='button' onClick={handleSearch}>Search</Button>
        </div>
      </div>
      {Object.keys(data).length > 0 &&
        <>
          <div className='city-weather' >
            <h2>{data?.name}</h2>
          </div>
          <div className='city-temp'>{((data?.main?.temp) - 273.5).toPrecision(2)}°c</div>
        </>
      }
    </div>
  );
}

export default App;
