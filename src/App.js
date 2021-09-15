import './App.css';
import { useState, useEffect } from 'react';

const NASA_API_KEY = process.env.REACT_APP_NASA_API_KEY;
const NASA_APOD_URL = 'https://api.nasa.gov/planetary/apod';

function App() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const getPhotos = async () => {
      const res = await fetch(`${NASA_APOD_URL}?api_key=${NASA_API_KEY}&count=10`)
        .then(res => res.json())
        .then(data => {
          setPhotos(data);
        });
      return res;
    };
    getPhotos();
  },[]);

  return (
    <div className="App">
      <header className="App-header">
        <p>Spacestagram</p>
      </header>
      {photos && (
        <div className="photos">
          {photos.map((photo, index) => (
            <div key={index}>
              <img src={photo.hdurl} alt={photo.title} />
              {photo.copyright ? 
                <p>Copyright: {photo.copyright}</p>
                :
                <p>Copyright: None</p>
              }
              <p>Date: {photo.date}</p>
              <p>{photo.explanation}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
