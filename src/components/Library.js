import React from 'react';
import LibrarySong from './LibrarySong'

const Library = ({songs, setCurrentSong, audioRef, isPlaying}) => {
    return (  
        <div className="library">
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map((song) => {
                return (
                    <LibrarySong 
                        song={song} 
                        setCurrentSong={setCurrentSong} 
                        songs={songs} 
                        id={song.id}
                        key={song.id}
                        isPlaying={isPlaying}
                        audioRef={audioRef}/>
                        
                )})}
            </div>
        </div>
    );
}
 
export default Library;
