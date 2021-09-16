import './App.css';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import InfiniteScroll from "react-infinite-scroll-component";
import PhotoCard from './components/PhotoCard';

const NASA_API_KEY = process.env.REACT_APP_NASA_API_KEY;
const NASA_APOD_URL = 'https://api.nasa.gov/planetary/apod';

function App() {
  const [photos, setPhotos] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const getPhotos = useCallback(() => {
    axios({
      method: 'get',
      url: `${NASA_APOD_URL}?api_key=${NASA_API_KEY}&count=5`
    }).then(res => {
      setPhotos(photos => [...photos, ...res.data]);
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    getPhotos();
  },[getPhotos]);

  return (
    <div className="App">
      <header className="App-header">
        <p>Spacestagram</p>
      </header>
      <p>Brought to you by NASA's Astronomy Photo of the Day (APOD) API</p>
      <InfiniteScroll
        dataLength={photos}
        next={() => {
          getPhotos(5)
        }}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        scrollThreshold={0.95}
      >
        {loaded ?
          photos.map((photo, index) => (
            <div key={index}>
              <PhotoCard photo={photo}/>
            </div>
          ))
          : ""
        }
      </InfiniteScroll>
    </div>
  );
}

export default App;
