import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import {BrowserRouter} from 'react-router-dom';
import {GoogleOAuthProvider} from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
   <StrictMode>
      <GoogleOAuthProvider clientId="841338067183-t76tiribdkr60bv45rkkl5qb1ft0pib2.apps.googleusercontent.com">
         <BrowserRouter>
            <App />
         </BrowserRouter>
      </GoogleOAuthProvider>
   </StrictMode>
);
