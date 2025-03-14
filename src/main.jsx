import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { ActiveGameProvider } from './Providers/ActiveGameProvider.jsx'; 
import { PlayerProvider } from './Providers/PlayerProvider.jsx'; 


import { RPSLevelProvider } from './RPSgame/Providers/RPSLevelProvider.jsx'; 
import { RPSInputProvider } from './RPSgame/Providers/RPSInputProvider.jsx'; 
import { RPSReferenceProvider } from './RPSgame/Providers/RPSReferenceProvider.jsx';

import {TTTStarterProvider} from './TTTgame/Providers/TTTStarterProvider.jsx';
import {TTTWinnerProvider} from './TTTgame/Providers/TTTWinnerProvider.jsx';

import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PlayerProvider><ActiveGameProvider>

    <TTTWinnerProvider><TTTStarterProvider><RPSLevelProvider> <RPSInputProvider>  <RPSReferenceProvider>
        <App />
    </RPSReferenceProvider> </RPSInputProvider> </RPSLevelProvider></TTTStarterProvider></TTTWinnerProvider>

    </ActiveGameProvider></PlayerProvider>
  </StrictMode>,
)
