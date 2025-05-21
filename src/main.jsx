import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { ActiveGameProvider } from './Providers/ActiveGameProvider.jsx'; 
import { PlayerProvider } from './Providers/PlayerProvider.jsx'; 
import { PrizeProvider } from './Providers/PrizeProvider.jsx';
import { MusicProvider } from './Providers/MusicProvider.jsx'; 

import { RPSUserProvider } from './RPSgame/Providers/RPSUserProvider.jsx'; 
import {TTTUserProvider } from './TTTgame/Providers/TTTUserProvider.jsx'; 
import {SNKUserProvider } from './SNKgame/Providers/SNKUserProvider.jsx'; 
import {THRUserProvider } from './THRgame/Providers/THRUserProvider.jsx'; 

import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MusicProvider>
    <PrizeProvider>
    <PlayerProvider><ActiveGameProvider>
    <THRUserProvider><SNKUserProvider><TTTUserProvider><RPSUserProvider>
        <App />
    </RPSUserProvider></TTTUserProvider></SNKUserProvider></THRUserProvider>
    </ActiveGameProvider></PlayerProvider>
    </PrizeProvider>
    </MusicProvider>
  </StrictMode>,
)
