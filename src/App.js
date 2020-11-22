import React, {useState, useRef} from 'react';
import Song from './components/Song'
import Player from './components/Player'
import './assets/styles/app.scss'
import data from './data';
import Library from './components/Library'

const App= ()=> {
  //State
const [songs, setSongs] = useState(data());
const [currentSong, setCurrentSong]= useState(songs[0]);
const [isPlaying, setIsPlaying] = useState(false);
const [songInfo, setSongInfo] = useState({
  currentTime: 0,
  duration: 0
})

let audioRef = useRef(null);

const timeUpdateHandler = (e) =>{
  const current = e.target.currentTime;
  const duration = e.target.duration;
  setSongInfo({...songInfo, currentTime: current, duration: duration})
}

  return (
    <div className="App">
      <Song currentSong={currentSong}/>
      <Player 
        currentSong={currentSong}
        isPlaying={isPlaying}
        audioRef={audioRef}
        songInfo= {songInfo}
        setSongInfo={setSongInfo}
        setIsPlaying={setIsPlaying}/>
      <Library 
        songs={songs} 
        currentSong={currentSong} 
        setCurrentSong={setCurrentSong}
        songInfo={songInfo}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongInfo={setSongInfo}/>
      <audio 
                onTimeUpdate={timeUpdateHandler} 
                onLoadedMetadata={timeUpdateHandler}
                ref={audioRef} 
                src={currentSong.audio}></audio>
    </div>
  );
}

export default App;