import React,{useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay, faAngleLeft, faAngleRight, faPause} from '@fortawesome/free-solid-svg-icons';
import {playAudio} from '../util';

const Player = ({songs, currentSong, setSongs, setCurrentSong, isPlaying, setIsPlaying, audioRef, songInfo, setSongInfo}) => {

    useEffect(()=>{
        const newSongs = songs.map((eachSong)=> {
            if(eachSong.id === currentSong.id){
                return{
                    ...eachSong,
                    active: true,
                };
            } else{
                return{
                    ...eachSong,
                    active: false,
                } ;
            }
        });
        setSongs(newSongs);
    },[currentSong]);

    const playSongHandler=()=>{
        if(isPlaying){
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else{
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    }

    const getTime = (time) => {
        return(
            Math.floor(time / 60) + ':' + ('0'+ Math.floor(time % 60)).slice(-2)
        )
    }
    const dragHandler=(e)=>{
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo, currentTime: e.target.value} )
    }

    const skipTrackHandler=(direction)=>{
        let currentIndex= songs.findIndex((song)=> song.id === currentSong.id);
        if(direction === 'skip-forward'){
            setCurrentSong(songs[(currentIndex + 1)% songs.length])
        }
        if(direction=== 'skip-back'){
            if((currentIndex-1) % songs.length ===-1){
                setCurrentSong(songs[songs.length-1]);
                playAudio(isPlaying, audioRef);
                return; // need return otherwise the set current song below will run 
            }
            setCurrentSong(songs[(currentIndex - 1)% songs.length]) 
            //uses modules to check the remainder. Ex: current index -1 is 8 and songs length is 8 the remiainder is 0. songs[0]
        }
        playAudio(isPlaying, audioRef);
    }

    //Add styles
    const trackAnim = {
        transform: `translate(${songInfo.animationPercentage}%)`
    }


    return (  
        <div className='player'>
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div className="track" style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}}>
                    <input 
                        min={0}
                        max={songInfo.duration || 0}
                        value={songInfo.currentTime}
                        onChange={dragHandler}
                        type="range"/>
                        <div className="animate-track" style={trackAnim}></div>
                </div>
                <p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon 
                    onClick={()=> skipTrackHandler('skip-back')}
                    className='skip-back' 
                    size='2x' 
                    icon={faAngleLeft}/>   
                <FontAwesomeIcon 
                    onClick={playSongHandler} 
                    className='play'
                    size='2x' 
                    icon={isPlaying? faPause : faPlay}/>   
                <FontAwesomeIcon 
                    onClick={()=> skipTrackHandler('skip-forward')}
                    className='skip-forward' 
                    size='2x' 
                    icon={faAngleRight}/>   
            </div>
        </div>
    );
}
 
export default Player; 