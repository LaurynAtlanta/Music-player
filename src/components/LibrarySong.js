import React from 'react';

const LibrarySong = ({song, songs, setCurrentSong, id, audioRef, isPlaying}) => {
    const songSelectHandler=()=>{
        const selectedSong = song;
        setCurrentSong(selectedSong);
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
        <div className='library-song' onClick={songSelectHandler}>
            <img src={song.cover} alt={song.name}/>
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    );
}
 
export default LibrarySong;