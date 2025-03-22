import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { ActiveGameProvider } from './Providers/ActiveGameProvider.jsx'; 
import { PlayerProvider } from './Providers/PlayerProvider.jsx'; 

import { RPSUserProvider } from './RPSgame/Providers/RPSUserProvider.jsx'; 
import {TTTUserProvider } from './TTTgame/Providers/TTTUserProvider.jsx'; 

import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PlayerProvider><ActiveGameProvider>
    <TTTUserProvider><RPSUserProvider>
        <App />
    </RPSUserProvider></TTTUserProvider>
    </ActiveGameProvider></PlayerProvider>
  </StrictMode>,
)
