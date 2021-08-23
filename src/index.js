import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
ReactDOM.render(
  <Auth0Provider
    domain="dev-tnv4t733.us.auth0.com"
    clientId="4aXNdIKEKtkBvsNRHRe0EYH7MpnuvSOK"
    redirectUri={window.location.origin}
>
  <App />
</Auth0Provider>,
document.getElementById('root')
);