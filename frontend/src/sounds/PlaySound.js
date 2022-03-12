import { Button } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import sound from '../assets/sound.mp3'

const PlaySound = (props) => {
    const audio = new Audio(sound)
    const myRef = useRef();



    useEffect(() => {
        if (myRef.current) {
            var vid = myRef.current
            vid.volume = 0.2;
        }

    }, [])



    return <>
        <div className="draggable" id="draggable" style={{ width: '300px', position: 'absolute', zIndex: 11 }}>
            <div className="dragger" id="dragger" style={{ position: 'relative', top: 0, marginBottom: 0, cursor: 'grab' }}>
                <audio
                    style={{ marginTop: 20 }}
                    loop
                    id="audio"
                    controls
                    ref={myRef}
                    src={sound}
                />
            </div>
        </div>



    </>

};

export default PlaySound;