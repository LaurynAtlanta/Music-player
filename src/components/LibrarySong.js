import React from 'react';

const LibrarySong = ({song, songs, setSongs, setCurrentSong, id, audioRef, isPlaying}) => {
    const songSelectHandler=()=>{
        const selectedSong = song;
        setCurrentSong(selectedSong);
        //Add active state
        const newSongs = songs.map((eachSong)=> {
            if(eachSong.id === id){
                return{
                    ...eachSong,
                    active: true,
                }
            } else{
                return{
                    ...eachSong,
                    active: false,
                }
            }
        });
        setSongs(newSongs);

        // check if song is playing
        if(isPlaying){
            const playPromise = audioRef.current.play();
            if(playPromise !== undefined){
                playPromise.then((audio)=> {
                    audioRef.current.play()
                })
            }
        }

    }
    return (  
        <div className={`library-song ${song.active? 'selected' : ''}`} onClick={songSelectHandler}>
            <img src={song.cover} alt={song.name}/>
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    );
}
 
export default LibrarySong;