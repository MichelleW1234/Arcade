import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RPSLevelProvider } from './RPSgame/Providers/RPSLevelProvider.jsx'; 
import { RPSInputProvider } from './RPSgame/Providers/RPSInputProvider.jsx'; 
import { RPSReferenceProvider } from './RPSgame/Providers/RPSReferenceProvider.jsx'; 
import {StarterProvider} from './TTTgame/Providers/StarterProvider.jsx';
import {WinnerProvider} from './TTTgame/Providers/WinnerProvider.jsx';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WinnerProvider><StarterProvider><RPSLevelProvider> <RPSInputProvider>  <RPSReferenceProvider>
        <App />
    </RPSReferenceProvider> </RPSInputProvider> </RPSLevelProvider></StarterProvider></WinnerProvider>
  </StrictMode>,
)
