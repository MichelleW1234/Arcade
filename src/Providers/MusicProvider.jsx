import { createContext, useRef, useEffect } from 'react';
import arcadeMusic from '../Music/ArcadeFull.mp3';

export const MusicContext = createContext();

export function MusicProvider({ children }) {

    const audioRef = useRef(new Audio(arcadeMusic));

    useEffect(() => {

        const audio = audioRef.current;
        audio.loop = true;
        audio.volume = 0.4;
        /*
        audio.play().catch((err) => {
            console.warn('Autoplay failed:', err);
        });
        */

        return () => {
            audio.pause(); // Stop the audio when the component is unmounted
        };

    }, []);

    return (
        <MusicContext.Provider value={audioRef}>
            {children}
        </MusicContext.Provider>
    );
}