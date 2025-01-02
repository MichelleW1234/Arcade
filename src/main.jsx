import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LevelProvider } from './RPSgame/LevelProvider.jsx'; 
import { InputProvider } from './RPSgame/InputProvider.jsx'; 
import { ReferenceProvider } from './RPSgame/ReferenceProvider.jsx'; 
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LevelProvider> <InputProvider>  <ReferenceProvider>
        <App />
    </ReferenceProvider> </InputProvider> </LevelProvider>
  </StrictMode>,
)
