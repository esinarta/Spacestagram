import './App.css';
import { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import InfiniteScroll from "react-infinite-scroll-component";
import PhotoCard from './components/PhotoCard';
import { 
  createTheme, 
  ThemeProvider, 
  CssBaseline, 
  IconButton,
  CircularProgress 
} from '@material-ui/core';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const NASA_API_KEY = process.env.REACT_APP_NASA_API_KEY;
const NASA_APOD_URL = 'https://api.nasa.gov/planetary/apod';

function App() {
  const [mode, setMode] = useState('light');
  
  const theme = useMemo(() => 
    createTheme({
      palette: {
        type: mode,
      }
    }), [mode]);

  const [photos, setPhotos] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const getPhotos = useCallback(() => {
    axios({
      method: 'get',
      url: `${NASA_APOD_URL}?api_key=${NASA_API_KEY}&count=10`
    }).then(res => {
      setPhotos(photos => [...photos, ...res.data]);
      setLoaded(true);
    }).catch(error => {
      console.log(error);
    })
  }, []);

  useEffect(() => {
    getPhotos();
  },[getPhotos]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <header className="app-header">
          <div className="app-title-row">
            <h1 id="title">Spacestagram</h1>
            <IconButton
              id="toggle-icon"
              sx={{ ml: 1 }} 
              onClick={
                () => setMode(mode === "light" ? "dark" : "light")
              } 
              color="inherit"
            >
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </div>
          
        </header>
        <body>
          <InfiniteScroll
            className="infinite-scroll"
            dataLength={photos}
            next={() => {
              getPhotos()
            }}
            hasMore={true}
            loader={<CircularProgress id="progress" />}
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
        </body>
      </div>
    </ThemeProvider>
  );
}

export default App;
