import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { ActiveGameProvider } from './Providers/ActiveGameProvider.jsx'; 
import { PlayerProvider } from './Providers/PlayerProvider.jsx'; 

import { RPSUserProvider } from './RPSgame/Providers/RPSUserProvider.jsx'; 
import {TTTUserProvider } from './TTTgame/Providers/TTTUserProvider.jsx'; 
import {SNKUserProvider } from './SNKgame/Providers/SNKUserProvider.jsx'; 

import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PlayerProvider><ActiveGameProvider>
    <SNKUserProvider><TTTUserProvider><RPSUserProvider>
        <App />
    </RPSUserProvider></TTTUserProvider></SNKUserProvider>
    </ActiveGameProvider></PlayerProvider>
  </StrictMode>,
)
