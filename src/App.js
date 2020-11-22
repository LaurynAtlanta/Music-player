import React, {useState, useRef} from 'react';
import Song from './components/Song'
import Player from './components/Player'
import './assets/styles/app.scss'
import data from './data';
import Library from './components/Library'
import Nav from './components/Nav'

const App= ()=> {
  //State
const [songs, setSongs] = useState(data());
const [currentSong, setCurrentSong]= useState(songs[0]);
const [libraryStatus, setLibraryStatus] = useState(false);
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
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
      <Song currentSong={currentSong}/>
      <Player 
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        songs={songs}
        audioRef={audioRef}
        songInfo= {songInfo}
        setSongInfo={setSongInfo}
        setIsPlaying={setIsPlaying}/>
      <Library 
        songs={songs} 
        setSongs={setSongs}
        currentSong={currentSong} 
        setCurrentSong={setCurrentSong}
        libraryStatus={libraryStatus}
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
