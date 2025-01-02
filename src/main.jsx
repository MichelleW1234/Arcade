import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RPSLevelProvider } from './RPSgame/Providers/RPSLevelProvider.jsx'; 
import { RPSInputProvider } from './RPSgame/Providers/RPSInputProvider.jsx'; 
import { RPSReferenceProvider } from './RPSgame/Providers/RPSReferenceProvider.jsx'; 
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RPSLevelProvider> <RPSInputProvider>  <RPSReferenceProvider>
        <App />
    </RPSReferenceProvider> </RPSInputProvider> </RPSLevelProvider>
  </StrictMode>,
)
